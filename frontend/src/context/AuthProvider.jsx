import { useState, useEffect, createContext } from 'react';

import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // State Global
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            // Extraer el Token de localStorage
            const token = localStorage.getItem('token');

            // Si no hay token
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Petición GET con Config
                const { data } = await clienteAxios('veterinarios/perfil', config);

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

        }

        autenticarUsuario();
    }, [])

    return (
        <AuthContext.Provider
            // Disponer de manera Global
            value={{
                auth,
                setAuth
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