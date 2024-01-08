import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extraer token del espacio y la palabra Bearer
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Se restan campos a obtener del modelo, y se almacenan en el servidor
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirm");

            // Lanza al siguiente middleware, no ejecuta las siguientes líneas
            return next();

        } catch (error) {
            const e = new Error('Token no válido');
            res.status(403).json({ msg: e.message });
        }
    }

    // Si no hay un token
    if (!token) {
        const error = new Error('Token no válido o inexistente');
        res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth;