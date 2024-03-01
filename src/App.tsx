import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/layout/Main";
import Auditoria from "./pages/Auditorias/Auditoria";
import Busqueda from "./pages/Busqueda/Busqueda";
import Home from "./pages/Home";
import Inap from "./pages/INAP/Inap";
import PaqueteFiscal from "./pages/PaqueteFiscal/PaqueteFiscal";
import PPI from "./pages/ProyectoInversion/PPI";
import SIREGOB from "./pages/SIREGOB/SIREGOB";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/home/*" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="bus" element={<Busqueda />} />
            <Route path="inap" element={<Inap />} />
            <Route path="siregob" element={<SIREGOB />} />
            <Route path="ppi" element={<PPI />} />
            <Route path="pf" element={<PaqueteFiscal />} />
            <Route path="auditoria" element={<Auditoria />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
