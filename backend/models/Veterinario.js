import mongoose from "mongoose";
const { Schema } = mongoose;
const { model } = mongoose;

// Definición del esquema en Moongose
const veterinarioSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true

        },
        telephone: {
            type: String,
            default: null,
            trim: true
        },
        web: {
            type: String,
            default: null,
        },
        token: {
            type: String
        },
        confirm: {
            type: Boolean,
            default: false
        },
        genre: {
            type: Boolean,
            default: null
        }
    }
);

// Declaración del modelo
const Veterinario = model("Veterinario", veterinarioSchema);

export default Veterinario;