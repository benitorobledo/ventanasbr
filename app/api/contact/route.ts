import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+()\s-]+$/),
  message: z.string().trim().min(10).max(1500),
  recaptchaToken: z.string().min(10).max(5000),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character
  );
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > 10_000) {
      return NextResponse.json(
        { error: "La solicitud es demasiado grande." },
        { status: 413 }
      );
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta nuevamente más tarde." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Revisa los datos ingresados e intenta nuevamente." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.RECAPTCHA_SECRET_KEY) {
      console.error("Faltan variables de entorno para el formulario de contacto");
      return NextResponse.json(
        { error: "El formulario no está disponible en este momento." },
        { status: 500 }
      );
    }

    const { name, email, phone, message, recaptchaToken } = parsed.data;

    const recaptchaParams = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: recaptchaToken,
    });

    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: recaptchaParams.toString(),
        cache: "no-store",
      }
    );

    const recaptchaData = (await recaptchaRes.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
    };

    const invalidAction =
      recaptchaData.action !== undefined && recaptchaData.action !== "submit";
    const lowScore =
      typeof recaptchaData.score === "number" && recaptchaData.score < 0.5;

    if (!recaptchaData.success || invalidAction || lowScore) {
      console.error("Validación de reCAPTCHA fallida");
      return NextResponse.json(
        { error: "No pudimos validar que eres humano. Intenta de nuevo." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);
    const subjectName = sanitizeHeader(name);

    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "Ventanas BR <contacto@ventanasbr.cl>",
      to: ["contacto@ventanasbr.cl"],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${subjectName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px; background-color: #f9fafb;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.ventanasbr.cl/images/logo-br.webp" alt="Ventanas BR Logo" style="width: 140px; height: auto; object-fit: contain; margin: 0 auto;" />
          </div>
          <h2 style="color: #1B1464; text-align: center; margin-bottom: 30px;">Nuevo mensaje de contacto desde la web</h2>
          <div style="background-color: white; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <p style="margin-bottom: 10px; color: #374151;"><strong>Nombre:</strong> ${safeName}</p>
            <p style="margin-bottom: 10px; color: #374151;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin-bottom: 10px; color: #374151;"><strong>Teléfono:</strong> ${safePhone}</p>
            <p style="margin-bottom: 5px; color: #374151;"><strong>Mensaje:</strong></p>
            <p style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; color: #4b5563; line-height: 1.5; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <div style="border-top: 2px solid #eaeaec; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin-bottom: 5px;"><strong>Ventanas BR</strong></p>
            <p style="margin-bottom: 0;">Los Alerces 621, Pan de Azúcar, Coquimbo, Chile</p>
          </div>
        </div>
      `,
    });

    if (adminError) {
      console.error("Error de Resend al enviar el correo administrativo");
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intenta nuevamente." },
        { status: 502 }
      );
    }

    const { error: clientError } = await resend.emails.send({
      from: "Ventanas BR <contacto@ventanasbr.cl>",
      to: [email],
      subject: "Hemos recibido tu mensaje - Ventanas BR",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.ventanasbr.cl/images/logo-br.webp" alt="Ventanas BR Logo" style="width: 140px; height: auto; object-fit: contain; margin: 0 auto;" />
          </div>
          <h2 style="color: #1B1464; text-align: center; margin-bottom: 20px;">¡Hola ${safeName}!</h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
            Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo a la brevedad posible.
          </p>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
            <h3 style="color: #1B1464; margin-top: 0; margin-bottom: 10px; font-size: 16px;">Resumen de tu mensaje:</h3>
            <p style="color: #4b5563; font-style: italic; margin: 0; line-height: 1.5;">"${safeMessage}"</p>
          </div>
          <p style="color: #374151; font-size: 16px; text-align: center; margin-bottom: 30px;">
            Si necesitas atención más rápida, también puedes escribirnos a nuestro WhatsApp.
          </p>
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://wa.me/56977443314" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Contactar por WhatsApp</a>
          </div>
          <div style="border-top: 2px solid #eaeaec; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin-bottom: 5px;"><strong>Ventanas BR</strong></p>
            <p style="margin-bottom: 5px;">Teléfono: <a href="tel:+56977443314" style="color: #00AEEF; text-decoration: none;">+56 9 7744 3314</a></p>
            <p style="margin-bottom: 0;">Los Alerces 621, Pan de Azúcar, Coquimbo, Chile</p>
          </div>
        </div>
      `,
    });

    if (clientError) {
      console.error("Error de Resend al enviar la respuesta automática");
    }

    return NextResponse.json({ success: true, data: adminData });
  } catch (error) {
    console.error("Error interno en el formulario de contacto");
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
