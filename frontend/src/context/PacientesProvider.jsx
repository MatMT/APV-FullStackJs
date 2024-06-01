import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [edicionHTML, setEdicionHTML] = useState(false);

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
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`,
                    paciente,
                    config
                );

                // Se itera sobre el array de pacientes y se actualiza el paciente que se modificó
                const pacientesActualizado = pacientes.map(
                    pacienteState => pacienteState._id === data._id ? data : pacienteState
                );

                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { pacienteAlmacenado } = data;
                const { createdAt, updatedAt, __v, ...datosPaciente } = pacienteAlmacenado;

                setPacientes([datosPaciente, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    useEffect(() => {
        if (!edicionHTML) {
            setPaciente({});
        }
    }, [edicionHTML]);

    const eliminarPaciente = (id) => {
        const confirmar = confirm('¿Estás seguro de eliminar este paciente?');
        if (confirmar) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                clienteAxios.delete(`/pacientes/${id}`, config);
                const pacientesActualizado = pacientes.filter(
                    paciente => paciente._id !== id
                );

                setPacientes(pacientesActualizado);
                alert('Paciente eliminado correctamente');
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                savePaciente,
                loading,
                setEdicion,
                edicionHTML,
                setEdicionHTML,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;
