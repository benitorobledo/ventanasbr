import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, message } = await req.json();

    const data = await resend.emails.send({
      from: "Ventanas BR <onboarding@resend.dev>", // Usar el correo por defecto de resend o configurado
      to: ["contacto@ventanasrb.cl"], // El correo de la empresa al que llegan los mensajes
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
            <p style="margin-bottom: 5px;">Teléfono: <a href="tel:+56977443314" style="color: #00AEEF; text-decoration: none;">+56 9 7744 3314</a></p>
            <p style="margin-bottom: 5px;">Email: <a href="mailto:contacto@ventanasrb.cl" style="color: #00AEEF; text-decoration: none;">contacto@ventanasrb.cl</a></p>
            <p style="margin-bottom: 0;">Ubicación: Pan de Azúcar, Coquimbo, Chile</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 });
  }
}
