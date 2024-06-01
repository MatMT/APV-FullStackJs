import { useState } from "react";
import Form from "../components/Form";
import ListadoPacientes from "../components/ListadoPacientes";

function AdminPacientes() {

    const [showForm, setShowForm] = useState(false)

    return (
        <div className='flex flex-col md:flex-row items-center'>

            <button type="button"
                className="bg-rose-600 hover:bg-rose-700 p-3 mx-10 mb-8 text-white uppercase font-bold rounded-lg cursor-pointer transition-colors block md:hidden"
                onClick={() => setShowForm(!showForm)}
            >
                Mostrar Formulario
            </button>

            <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                <Form />
            </div>

            <div className='relative md:w-1/2 lg:w-3/5 max-h-[850px]'>
                <div className='overflow-y-auto max-h-[850px]'>
                    <ListadoPacientes />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

        </div>
    )
}

export default AdminPacientes