import e from "express";
import Paciente from "../models/Paciente.js"

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    // Se asigna el Veterinario encargado a registrar el paciente
    paciente.vet = req.veterinario._id;

    try {
        const pacienteAlmacenado = await paciente.save();
        return res.json({ pacienteAlmacenado });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where('vet')
        .equals(req.veterinario);

    res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id.trim());

    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado' });
    }

    // Convertir a String para que no se evalue de manera diferente como ObjId
    if (paciente.vet._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Acción no válida" });
    }

    res.json(paciente);
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id.trim());

    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado' });
    }

    // Convertir a String para que no se evalue de manera diferente como ObjId
    if (paciente.vet._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Acción no válida" });
    }

    // Actualizar paciente
    paciente.name = req.body.name || paciente.name;
    paciente.owner = req.body.owner || paciente.owner;
    paciente.email = req.body.email || paciente.email;
    paciente.fechaAlta = req.body.fechaAlta || paciente.fechaAlta;
    paciente.symptoms = req.body.symptoms || paciente.symptoms;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id.trim());

    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado' });
    }

    // Convertir a String para que no se evalue de manera diferente como ObjId
    if (paciente.vet._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Acción no válida" });
    }

    try {
        await paciente.deleteOne();
        res.json({ msg: "Paciente Eliminado" });

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export {
    agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente
}