import useAuth from "../hooks/useAuth";
import { useState } from "react";

import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";

const CambiarPass = () => {
    const { guardarPassword } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: '',
        pwd_confirm: ''
    });

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar que no haya campos vacíos 
        if (Object.values(password).some(value => value === '')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if (password.pwd_nuevo < 6) {
            setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true });
            return;
        }

        if (password.pwd_nuevo !== password.pwd_confirm) {
            setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
            return;
        }

        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);

    };

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-rose-600 font-bold">Password</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">

                    {msg && <Alerta alerta={alerta} />}

                    <form className="my-3 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="name">Password Actual</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="password"
                                name="pwd_actual" placeholder="Escribe tu contraseña actual"
                                onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <hr />

                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="name">Nueva Password</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="password"
                                name="pwd_nuevo" placeholder="Escribe tu nueva contraseña"
                                onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="name">Confirmar Password</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="password"
                                name="pwd_confirm" placeholder="Confirma tu nueva contraseña"
                                onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <input type="submit" value="Guardar Cambios" className="bg-rose-600 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPass