const generarId = () => {
    // Generar un Id de manera random
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;