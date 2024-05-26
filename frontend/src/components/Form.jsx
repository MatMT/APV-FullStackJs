import { useState } from "react";

import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes"

const Form = () => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [fechaAlta, setfechaAlta] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const [alert, setAlert] = useState({});

    const { savePaciente } = usePacientes();

    const handleSubmit = e => {
        e.preventDefault();

        // Válidar el formulario
        if ([name, owner, email, fechaAlta, symptoms].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        savePaciente({ name, owner, email, fechaAlta, symptoms });
    }

    const { msg } = alert;

    return (
        <>

            <h2 className='font-black text-3xl text-center'>{''}
                Registro de Pacientes
            </h2>

            <p className='text-xl mt-5 mb-10 text-center'>Añade tus pacientes y {''}
                <span className='text-rose-600 font-bold'>Administralos</span>
            </p>

            {msg && <Alerta
                alerta={alert}
            />}

            <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >

                <div className="mb-5">
                    <label htmlFor="name"
                        className="text-gray-700 font-bold uppercase"
                    >Nombre Mascota</label>
                    <input type="text" name="name"
                        id="name" placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="owner"
                        className="text-gray-700 font-bold uppercase"
                    >Nombre Propietario</label>
                    <input type="text" name="owner"
                        id="owner" placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={owner}
                        onChange={e => setOwner(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email"
                        className="text-gray-700 font-bold uppercase"
                    >Email</label>
                    <input type="email" name="email"
                        id="email" placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="fechaAlta"
                        className="text-gray-700 font-bold uppercase"
                    >Fecha Alta</label>
                    <input type="date" name="fechaAlta"
                        id="fechaAlta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={fechaAlta}
                        onChange={e => setfechaAlta(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms"
                        className="text-gray-700 font-bold uppercase"
                    >Síntomas</label>
                    <textarea name="symptoms" placeholder="Describe los Síntomas del Paciente"
                        id="symptoms" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)}
                    />
                </div>

                <input type="submit" value="Agregar Paciente"
                    className="bg-rose-600 hover:bg-rose-700 w-full p-3 mt-5 text-white uppercase font-bold rounded-lg cursor-pointer transition-colors"
                />
            </form>
        </>
    )
}

export default Form