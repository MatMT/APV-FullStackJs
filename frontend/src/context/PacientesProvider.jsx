import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const getPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

        getPacientes();
    }, []);

    const savePaciente = async (paciente) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/pacientes', paciente, config);
            const { pacienteAlmacenado } = data;

            const { createdAt, updatedAt, __v, ...datosPaciente } = pacienteAlmacenado;

            setPacientes([datosPaciente, ...pacientes]);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                savePaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;
