import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Falta la variable de entorno RESEND_API_KEY");
      return NextResponse.json({ error: "Falta configurar la API Key de Resend en el servidor" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, message, recaptchaToken } = await req.json();

    if (!recaptchaToken) {
      return NextResponse.json({ error: "Validación de seguridad requerida (reCAPTCHA)." }, { status: 400 });
    }

    const recaptchaRes = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/absolute-range-291201/assessments?key=${process.env.RECAPTCHA_SECRET_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: {
          token: recaptchaToken,
          expectedAction: "submit",
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        }
      }),
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaRes.ok || !recaptchaData.tokenProperties?.valid) {
      console.error("ReCAPTCHA falló:", recaptchaData);
      return NextResponse.json({ error: "No pudimos validar que eres humano. Intenta de nuevo." }, { status: 400 });
    }
    
    // Si la puntuación es muy baja (0.0 es bot seguro, 1.0 es humano seguro)
    if (recaptchaData.riskAnalysis && recaptchaData.riskAnalysis.score < 0.5) {
      console.error("ReCAPTCHA Score muy bajo:", recaptchaData.riskAnalysis.score);
      return NextResponse.json({ error: "No pudimos validar que eres humano. Intenta de nuevo." }, { status: 400 });
    }

    // 1. Correo para el administrador de Ventanas BR
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "Ventanas BR <contacto@ventanasbr.cl>", // IMPORTANTE: Requiere dominio verificado en Resend
      to: ["contacto@ventanasbr.cl"],
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px; background-color: #f9fafb;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://ventanasbr.cl/images/logo-br.webp" alt="Ventanas BR Logo" style="max-width: 200px; height: auto;" />
          </div>
          <h2 style="color: #1B1464; text-align: center; margin-bottom: 30px;">Nuevo mensaje de contacto desde la web</h2>
          <div style="background-color: white; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <p style="margin-bottom: 10px; color: #374151;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin-bottom: 10px; color: #374151;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px; color: #374151;"><strong>Teléfono:</strong> ${phone}</p>
            <p style="margin-bottom: 5px; color: #374151;"><strong>Mensaje:</strong></p>
            <p style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; color: #4b5563; line-height: 1.5; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="border-top: 2px solid #eaeaec; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin-bottom: 5px;"><strong>Ventanas BR</strong></p>
            <p style="margin-bottom: 0;">Pan de Azúcar, Coquimbo, Chile</p>
          </div>
        </div>
      `,
    });

    if (adminError) {
      console.error("Resend API Error (Admin Email):", adminError);
      return NextResponse.json({ error: adminError.message || "Error al enviar el email por Resend" }, { status: 500 });
    }

    // 2. Correo de respuesta automática para el cliente
    const { error: clientError } = await resend.emails.send({
      from: "Ventanas BR <contacto@ventanasbr.cl>", // IMPORTANTE: Requiere dominio verificado en Resend
      to: [email],
      subject: "Hemos recibido tu mensaje - Ventanas BR",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://ventanasbr.cl/images/logo-br.webp" alt="Ventanas BR Logo" style="max-width: 200px; height: auto;" />
          </div>
          <h2 style="color: #1B1464; text-align: center; margin-bottom: 20px;">¡Hola ${name}!</h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
            Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo a la brevedad posible.
          </p>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
            <h3 style="color: #1B1464; margin-top: 0; margin-bottom: 10px; font-size: 16px;">Resumen de tu mensaje:</h3>
            <p style="color: #4b5563; font-style: italic; margin: 0; line-height: 1.5;">"${message}"</p>
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
            <p style="margin-bottom: 0;">Ubicación: Pan de Azúcar, Coquimbo, Chile</p>
          </div>
        </div>
      `,
    });

    if (clientError) {
      console.error("Resend API Error (Client Auto-Reply):", clientError);
      // No retornamos error 500 aquí para no interrumpir la experiencia si el de admin funcionó,
      // pero se registrará en los logs si falla por el dominio no verificado.
    }

    return NextResponse.json({ success: true, data: adminData });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
