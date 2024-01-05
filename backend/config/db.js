import moongose from 'mongoose';

const conectarDB = async () => {
    try {
        const db = await moongose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`DB conectado en: ${url}`);

    } catch (error) {
        console.log(`error: ${error.message}`);
        // Método para cerrar el código
        process.exit(1);
    }
}

export default conectarDB;