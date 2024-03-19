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
import MPD from "./pages/MPD/MPD";
import OficioPresupuesto from "./pages/OficiosPresupuesto/OficioPresupuesto";

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
            <Route path="siregob" element={<SIREGOB tipo={"CONS"} />} />
            <Route path="ppi" element={<PPI tipo={"CONS"} />} />
            <Route path="pf" element={<PaqueteFiscal tipo={"CONS"} />} />
            <Route path="mpd" element={<MPD tipo={"CONS"} />} />
            <Route path="auditoria" element={<Auditoria tipo={"CONS"} />} />
            <Route
              path="presupuesto"
              element={<OficioPresupuesto tipo={"CONS"} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
