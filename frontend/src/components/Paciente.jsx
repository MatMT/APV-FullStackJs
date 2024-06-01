import usePacientes from '../hooks/usePacientes';

export const Paciente = ({ paciente }) => {

    const { setEdicion, eliminarPaciente } = usePacientes();
    const { _id, name, owner, email, fechaAlta, symptoms } = paciente;

    // console.log(fechaAlta);

    // const formatearFecha = (fecha) => {
    //     const nuevaFecha = new Date(fecha);
    //     return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha);
    // }

    const formatearFecha = (fecha) => {
        let nuevaFecha;

        if (fecha.includes('T00:00:00.000Z')) {
            nuevaFecha = new Date(fecha.split('T')[0].split('-'));
        } else {
            nuevaFecha = new Date(fecha);
        }

        const opciones = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        // return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha);
        return nuevaFecha.toLocaleDateString('es-ES', opciones);
    }

    return (
        <div className="mx-5 my-8 font-bold uppercase bg-white px-5 py-8 shadow-md rounded-xl space-y-2">
            <p className="font-bold uppercase text-rose-800">Nombre: {''}
                <span className="font-normal normal-case text-black">{name}</span>
            </p>

            <p className="font-bold uppercase text-rose-800">Propietario: {''}
                <span className="font-normal normal-case text-black">{owner}</span>
            </p>

            <p className="font-bold uppercase text-rose-800">Email Contacto: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>

            <p className="font-bold uppercase text-rose-800">Fecha de Alta: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fechaAlta)}</span>
            </p>

            <p className="font-bold uppercase text-rose-800">Síntomas: {''}
                <span className="font-normal normal-case text-black">{symptoms}</span>
            </p>

            <div className="flex justify-between pt-5 gap-4">
                <button type="button" className="py-2 px-10 bg-rose-500
                hover:bg-rose-600 text-white uppercase font-bold rounded-lg"
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>

                <button type="button" className="py-2 px-10 bg-red-700
                hover:bg-red-800 text-white uppercase font-bold rounded-lg"
                    onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}
