import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const getPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                setLoading(true);
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

            setLoading(false);
        }

        getPacientes();
    }, [auth]);

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

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                savePaciente,
                loading,
                setEdicion,
                paciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;
