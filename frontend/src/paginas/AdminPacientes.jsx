import { useState } from "react";
import Form from "../components/Form";
import ListadoPacientes from "../components/ListadoPacientes";

function AdminPacientes() {

    const [showForm, setShowForm] = useState(false)

    return (
        <div className='flex flex-col md:flex-row'>

            <button type="button"
                className="bg-rose-600 hover:bg-rose-700 p-3 mx-10 mt-5 text-white uppercase font-bold rounded-lg cursor-pointer transition-colors block md:hidden"
                onClick={() => setShowForm(!showForm)}
            >
                Mostrar Formulario
            </button>

            <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                <Form />
            </div>

            <div className='md:w-1/2 lg:w-3/5'>
                <ListadoPacientes />
            </div>
        </div>
    )
}

export default AdminPacientes