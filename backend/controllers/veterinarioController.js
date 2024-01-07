import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    const { name, email, password } = req.body;

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

        res.json(saveVeterinario)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

const perfil = (req, res) => {
    res.json({ msg: 'Profile' })
};

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

        res.json({ usuarioConfirmar });
    } catch (error) {
        console.log(error);
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
        res.json({ error: "error" });
    }
}

// Exportación de funciones para el router
export {
    registrar, perfil, confirmar, autenticar
}