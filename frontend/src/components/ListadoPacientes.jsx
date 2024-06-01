import usePacientes from '../hooks/usePacientes';
import { Paciente } from './Paciente';

function ListadoPacientes() {
    const { pacientes, loading } = usePacientes();

    if (loading) return <p className='text-rose-600 text-2xl text-center'>Cargando...</p>

    return (
        <>
            {pacientes.length ? (
                <>
                    <h2 className='font-black text-3xl text-center'>{''}
                        Listado de Pacientes
                    </h2>
                    <p className='text-xl mt-5 mb-10 text-center'>Administra tus {''}
                        <span className='text-rose-600 font-bold'>Pacientes y Citas</span>
                    </p>
                    {
                        pacientes.map(paciente =>
                            <Paciente
                                key={paciente._id}
                                paciente={paciente}
                            />
                        )
                    }
                </>
            ) :
                (
                    <>
                        <h2 className='font-black text-3xl text-center'>{''}
                            No hay pacientes registrados
                        </h2>
                        <p className='text-xl mt-5 mb-10 text-center'>Comienza registrando Pacientes {''}
                            <span className='text-rose-600 font-bold'>y se listarán en este lugar</span>
                        </p>
                    </>
                )}
        </>
    )
}

export default ListadoPacientes