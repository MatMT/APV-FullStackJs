import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailSavePass from "../helpers/emailSavePass.js";

const registrar = async (req, res) => {
    const { email, name, nombre } = req.body;

    // Prevenir usuarios duplicados
    const existUser = await Veterinario.findOne({ email });

    if (existUser) {
        // Se declara un error
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        // Método de Mongoose para guardar objeto en la DB
        const saveVeterinario = await veterinario.save();

        // Enviar el email, posteriormente a su registro en la DB
        emailRegistro({
            email,
            name,
            token: saveVeterinario.token
        });

        res.json(saveVeterinario)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

const perfil = (req, res) => {
    const { veterinario } = req;

    res.json({ veterinario })
};

// Válidar el email 
const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirm = true;

        await usuarioConfirmar.save();

        res.json({ msg: "Usuario confirmado Correctamente." })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobrar si el usuario existe
    const usuario = await Veterinario.findOne({ email });
    if (!usuario) {
        const error = new Error('El Usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirm) {
        const error = new Error('Tu Cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el password
    if (await usuario.comprobarPassword(password)) {
        // Autenticar al usuario
        res.json({ token: generarJWT(usuario.id) });
    } else {
        const error = new Error('El Password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }
}

const changePassword = async (req, res) => {
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({ email });
    // Validación existencia de usuario
    if (!existeVeterinario) {
        const error = new Error('El Usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();

        // Enviar Email con instrucciones
        emailSavePass({
            email,
            name: existeVeterinario.name,
            token: existeVeterinario.token
        })


        res.json({ msg: 'Confirma el email enviado a tu correo para restaurar tu contraseña' });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Lectura del token
const validateToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });

    if (tokenValido) {
        // El Token es válido, si existe
        res.json({ msg: "Token válido, el usuario si existe" });

    } else {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }


}

// Guardar nueva password
const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Validación de token
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Token de un solo uso
        veterinario.token = null;
        // Asignación de nueva contraseña
        veterinario.password = password;
        // Guardar cambios en la BD
        await veterinario.save();
        res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Exportación de funciones para el router
export {
    registrar, perfil, confirmar,
    autenticar, changePassword, validateToken,
    newPassword
}