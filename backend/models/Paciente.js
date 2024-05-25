import mongoose from "mongoose";

const { Schema } = mongoose;
const { model } = mongoose;

const pacientesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fechaAlta: {
        type: Date,
        required: true,
        default: Date.now()
    },
    symptoms: {
        type: String,
        required: true
    },
    // Relación de ID a otro modelo
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    },
}, {
    timestamps: true
});

const Paciente = model("Paciente", pacientesSchema);

export default Paciente;