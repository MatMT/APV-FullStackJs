import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
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
        subject: 'Confirma tu cuenta en APV',
        text: 'Confirma tu cuenta en APV',
        html: `<p>Hola¡! ${name}, confirma tu cuenta.</p>
               <p>Haz click en este enlace para confirmar:
               <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar</a></p>
               <br>
               <i>Si tú no creaste esta cuenta, ignora el correo</i>`
    });

    console.log("Mensaje Enviado: %s", info.messageId);
}

export default emailRegistro;