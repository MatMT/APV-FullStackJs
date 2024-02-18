import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import clienteAxios from '../config/axios';
import TitleMain from '../components/TitleIndex';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAuth, auth } = useAuth();
    const [alerta, setAlerta] = useState({});

    // Redireccionar al usuario
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({ msg: 'Campos vacíos', error: true });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
            // Token de autenticación
            localStorage.setItem('token', data.token);
            // Redireccionar tras la autenticación
            navigate('/admin');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta;

    return (
        <>
            <TitleMain text="Inicia Sesión y Administra tus" color={"sky"} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}


                <form onSubmit={handleSubmit} method="post" className="space-y-4">

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

                    <input type="submit" value="Iniciar Sesión"
                        className="bg-sky-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold !mt-8 hover:cursor-pointer hover:bg-sky-700 xl:w-auto"
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 font-semibold text-gray-600'
                        to="/registrar">¿No tienes una cuenta? Regístrate</Link>
                    <Link
                        className='block text-center my-5 font-semibold text-gray-600'
                        to="/change-pass">Olvide mi Password</Link>
                </nav>

            </div>
        </>
    )
}

export default Login