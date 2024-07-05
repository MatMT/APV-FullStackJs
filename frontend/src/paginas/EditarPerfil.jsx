import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";
import { act } from "react";

const EditarPerfil = () => {

    // Context
    const { auth, actualizarPerfil } = useAuth();

    // State local
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    // Setear el perfil en el state local
    useEffect(() => {
        setPerfil(auth);
    }, [auth])

    // Función para enviar el formulario
    const handleSubmit = async e => {
        e.preventDefault();

        const { name, email } = perfil;

        if ([name, email].includes('')) {
            setAlerta({
                msg: 'Su Nombre y Email son requeridos',
                error: true
            });
            return;
        }

        const result = await actualizarPerfil(perfil);
        // Mostrar alerta 
        setAlerta(result);
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-rose-600 font-bold">Perfil</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">

                    {msg && <Alerta alerta={alerta} />}

                    <form className="my-3 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="name">Nombre</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="text"
                                name="name"
                                value={perfil.name || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="web">Web</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="text"
                                name="web"
                                value={perfil.web || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="telephone">Teléfono</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="text"
                                name="telephone"
                                value={perfil.telephone || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div>
                            <label className="uppercase font-bold text-gray-600" htmlFor="email">Email</label>
                            <input className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" type="text"
                                name="email"
                                value={perfil.email || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <input type="submit" value="Guardar Cambios" className="bg-rose-600 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil