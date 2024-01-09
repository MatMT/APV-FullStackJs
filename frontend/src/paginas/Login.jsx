
function Login() {
    return (
        <>
            <div>
                <h1 className="text-sky-600 font-black text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-0">Inicia Sesión y Administra tus <span className="text-gray-700">Pacientes</span></h1>
            </div>
            <div>
                <form action="" method="post" className="space-y-4">

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input type="text" placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input type="password" placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión"
                        className="bg-sky-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold !mt-8 hover:cursor-pointer hover:bg-sky-700 xl:w-auto "
                    />
                </form>
            </div>

        </>
    )
}

export default Login