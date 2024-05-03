function Form() {
    return (
        <>
            <p className="text-lg text-center mb-10 font-semibold">
                Añade tus pacientes y {''}
                <span className="text-rose-600">Administralos</span>
            </p>

            <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
                <div className="mb-5">
                    <label htmlFor="mascota"
                        className="text-gray-700 font-bold uppercase"
                    >Nombre Mascota</label>
                    <input type="text" name="mascota"
                        id="mascota" placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario"
                        className="text-gray-700 font-bold uppercase"
                    >Nombre Propietario</label>
                    <input type="text" name="propietario"
                        id="propietario" placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email"
                        className="text-gray-700 font-bold uppercase"
                    >Email</label>
                    <input type="email" name="email"
                        id="email" placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha"
                        className="text-gray-700 font-bold uppercase"
                    >Fecha Alta</label>
                    <input type="date" name="fecha"
                        id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas"
                        className="text-gray-700 font-bold uppercase"
                    >Síntomas</label>
                    <textarea name="sintomas" placeholder="Describe los Síntomas del Paciente"
                        id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
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