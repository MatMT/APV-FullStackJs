import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layout's
import AuthLayout from "./layout/AuthLayout";
import RouteProtected from "./layout/RouteProtected";

// Páginas
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ChangePass from "./paginas/ChangePass";
import ConfirmAcc from "./paginas/ConfirmAcc";
import NuevoPassword from "./paginas/NuevoPassword";
import AdminPacientes from "./paginas/AdminPacientes";
// 
import CambiarPass from "./paginas/CambiarPass";
import EditarPerfil from "./paginas/EditarPerfil";

// Context
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {

  return (

    <BrowserRouter>
      <AuthProvider>

        <PacientesProvider>
          <Routes>
            {/* Main Page, Componente Padre Auth */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="change-pass" element={<ChangePass />} />
              <Route path="change-pass/:token" element={<NuevoPassword />} />
              <Route path="confirm/:id" element={<ConfirmAcc />} />
            </Route>

            <Route path="/admin" element={<RouteProtected />}>
              <Route index element={<AdminPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="change-pass" element={<CambiarPass />} />
            </Route>

          </Routes>
        </PacientesProvider>

      </AuthProvider >
    </BrowserRouter >
  )
}

export default App
