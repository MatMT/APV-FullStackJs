import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Alerta from "../components/Alerta";
import TitleMain from '../components/TitleIndex';
import clienteAxios from '../config/axios';

function ConfirmAcc() {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams()
    const { id } = params;

    useEffect(() => {
        const confirmAcc = async () => {
            try {
                const url = `/veterinarios/confirm/${id}`;
                const { data } = await clienteAxios(url);
                setCuentaConfirmada(true);
                setAlerta({ msg: data.msg });

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }

            // Se espera a que finalice de obtener la respuesta del servidor
            setCargando(false);
        }

        confirmAcc();
    }, []);


    return (
        <>
            <TitleMain text="Confirma tu Cuenta y Comienza a Administrar tus" color={"pink"} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando && <Alerta alerta={alerta} />}

                {cuentaConfirmada &&
                    <Link
                        className='block text-center my-5 font-semibold text-gray-600'
                        to="/">Inicia sesión</Link>
                }
            </div>

        </>
    )
}

export default ConfirmAcc