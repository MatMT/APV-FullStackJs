import { Link } from "react-router-dom"
import TitleMain from "../components/TitleIndex"

function ChangePass() {
    return (
        <>
            <TitleMain text="Recupera tu Contraseña y Accede a tu" span="Cuenta" color={"yellow"} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <form action="" method="post" className="space-y-4">

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input type="email" placeholder="Tu Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <input type="submit" value="Enviar Instrucciones"
                        className="bg-yellow-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold !mt-8 hover:cursor-pointer hover:bg-yellow-700 xl:w-auto "
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/">¿Ya tienes una cuenta? Inicia sesión</Link>

                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/registrar">¿No tienes una cuenta? Regístrate</Link>
                </nav>

            </div>
        </>
    )
}

export default ChangePass