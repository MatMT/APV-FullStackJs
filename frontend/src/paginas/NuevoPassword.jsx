import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';

import TitleMain from "../components/TitleIndex";
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const { token } = useParams();
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/change-password/${token}`);
                setAlerta({
                    msg: 'Ingresa tu Nuevo Password'
                })
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error en el enlace',
                    error: true
                })
            }
        }

        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: 'El Password debe tener al meneos 6 caracteres',
                error: true
            });
            return;
        }

        try {
            const url = `/veterinarios/change-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;

    return (
        <>
            <TitleMain text="Reestablece tu password y no Pierdas Acceso a" color={"teal"} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (
                    <>
                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor=""
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                    Nuevo Password
                                </label>
                                <input type="password" placeholder="Tu Password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="Guardar"
                                className="bg-teal-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold !mt-8 hover:cursor-pointer hover:bg-teal-700 xl:w-auto "
                            />
                        </form>

                        {passwordModificado && (
                            <nav className='mt-6 lg:flex lg:justify-center'>
                                <Link
                                    className='block text-center my-5  font-semibold text-gray-600'
                                    to="/">Inicia sesión
                                </Link>
                            </nav>
                        )}

                    </>
                )}
            </div>
        </>

    )
}

export default NuevoPassword
