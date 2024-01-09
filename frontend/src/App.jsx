import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ChangePass from "./paginas/ChangePass";
import ConfirmAcc from "./paginas/ConfirmAcc";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Main Page, Componente Padre Auth */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="change-pass" element={<ChangePass />} />
          <Route path="confirm/:id" element={<ConfirmAcc />} />
        </Route>

      </Routes>
    </BrowserRouter >
  )
}

export default App
