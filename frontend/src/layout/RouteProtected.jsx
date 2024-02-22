import { Outlet, Navigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import useAuth from "../hooks/useAuth";

const RouteProtected = () => {

    const { auth, cargando } = useAuth();

    if (cargando) return 'cargando...';

    return (
        <>
            {/* Si auth es true muestra, sino redirige */}
            <Header />
            {auth.veterinario?._id ? <Outlet /> : <Navigate to="/" />}
            <Footer />
        </>
    )
}

export default RouteProtected