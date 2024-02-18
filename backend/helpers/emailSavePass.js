import nodemailer from "nodemailer";

const emailSavePass = async (datos) => {
    // Instancia de NodeMailer
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, name, token } = datos;

    // Enviar Email
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola: ${name}, has solicitado reestablecer tu password.</p>
               <p>Haz click en este enlace para establecer un nuevo password:
               <a href="${process.env.FRONTEND_URL}/change-pass/${token}">Reestablecer Password</a></p>
               <br>
               <i>Si tú no solicitaste este cambio, ignora el correo</i>`
    });

    console.log("Mensaje Enviado: %s", info.messageId);
}

export default emailSavePass;