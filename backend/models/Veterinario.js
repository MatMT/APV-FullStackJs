import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

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
            type: String,
            default: generarId()
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

// Función a ejecutar antes de guardar en la BD
veterinarioSchema.pre('save', async function (next) {
    // El campo contraseña no ha sido modificado, continuará al siguiente Middleware
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    // Módificar password antes de que se almacene
    this.password = await bcrypt.hash(this.password, salt);
});

// Funciones a ejecutar solamente en este modelo
veterinarioSchema.methods.comprobarPassword = async function (passwordForm) {
    // Retorna true o false
    return await bcrypt.compare(passwordForm, this.password);
}

// Declaración del modelo
const Veterinario = model("Veterinario", veterinarioSchema);

export default Veterinario;