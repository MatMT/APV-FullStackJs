import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

// Inicialización de la app del servidor
const app = express();
// Habilitación de parámetros mediante JSON
app.use(express.json());

// Función para leer archivo .ENV
dotenv.config();

// Declaración de Conexión a MongoDB 
conectarDB();

// Dominios permitidos
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        // Diferente a 1, encontrado en el arreglo
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El Origen del Request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

// Asignación de rutas de petición para VETERINARIO =====
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

// Declaración del puerto del servidor
const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(process.env.FRONTEND_URL);
});