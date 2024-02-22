import { useState, useEffect, createContext } from 'react';

import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    // State Global
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            // Extraer el Token de localStorage
            const token = localStorage.getItem('token');

            // Si no hay token
            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Petición GET con Config
                const { data } = await clienteAxios('veterinarios/profile', config);

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }

        autenticarUsuario();
    }, [])

    return (
        <AuthContext.Provider
            // Disponer de manera Global
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;