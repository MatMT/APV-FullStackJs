import { Link } from "react-router-dom"


function Registrar() {
    return (
        <>
            <div>
                <h1 className="text-emerald-600 font-black text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-0">Crea tu Cuenta y Administra tus <span className="text-gray-700">Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <form action="" method="post" className="space-y-4">

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input type="text" placeholder="Tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input type="email" placeholder="Tu Email de Registro"
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

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>
                        <input type="password" placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión"
                        className="bg-emerald-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold !mt-8 hover:cursor-pointer hover:bg-emerald-700 xl:w-auto "
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/change-pass">Olvide mi Password</Link>
                </nav>

            </div>
        </>
    )
}

export default Registrar