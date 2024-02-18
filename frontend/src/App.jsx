import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ChangePass from "./paginas/ChangePass";
import ConfirmAcc from "./paginas/ConfirmAcc";
import NuevoPassword from "./paginas/NuevoPassword";
import { AuthProvider } from "./context/AuthProvider";

function App() {

  return (

    <BrowserRouter>
      <AuthProvider>

        <Routes>
          {/* Main Page, Componente Padre Auth */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="change-pass" element={<ChangePass />} />
            <Route path="change-pass/:token" element={<NuevoPassword />} />
            <Route path="confirm/:id" element={<ConfirmAcc />} />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter >
  )
}

export default App
