import { mongo } from "mongoose";
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

// Exportación de funciones para el router
export {
    registrar, perfil
}