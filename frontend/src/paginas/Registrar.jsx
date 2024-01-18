import { useState } from "react";
import { Link } from "react-router-dom"

import Alerta from "../components/Alerta";
import TitleMain from "../components/TitleIndex"

function Registrar() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = e => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacíos', error: true })
            return; // Validación campos vacíos
        }

        if (password.length < 6) {
            setAlerta({ msg: 'La contraseña debe contener al menos 6 caracteres', error: true })
            return; // Validación Password corta
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: 'La contraseña no coincide', error: true })
            return; // Validación contraseñas diferentes
        }

        setAlerta({});

        console.log("Nice");
    }

    const { msg } = alerta;

    return (
        <>
            <TitleMain text="Registrate y Administra a tus" color={"emerald"} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input type="text" placeholder="Tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input type="email" placeholder="Tu Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input type="password" placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>
                        <input type="password" placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
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