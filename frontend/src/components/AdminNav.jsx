import { Link } from "react-router-dom"

const AdminNav = () => {
    return (
        <nav className="flex gap-4 justify-center">
            <Link to="/admin/perfil" className='text-gray-400 text-xl font-bold uppercase'>Perfil</Link>
            <Link to="/admin/change-pass" className='text-gray-400 text-xl font-bold uppercase'>Cambiar Password</Link>
        </nav>
    )
}

export default AdminNav