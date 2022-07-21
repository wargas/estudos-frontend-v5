import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import AulaPage from "./pages/aula";
import CadernoPage from "./pages/aula/caderno";
import CadernosPage from "./pages/aula/cadernos";
import ImportarPage from "./pages/aula/importar";
import ResumoPage from "./pages/aula/resumo";
import Disciplina from "./pages/disciplina";
import DisciplinasPage from "./pages/disciplinas";
import LoginPage from "./pages/login";

export default function AppRoutes () {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/dashboard' element="Dashboard" />
              <Route path='disciplinas' element={<DisciplinasPage />} />
              <Route path='disciplinas/:id' element={<Disciplina />} />
              <Route path='disciplinas/:disciplina_id/aula/:aula_id' element={<AulaPage />}>
                <Route path='' element={<ResumoPage />} />
                <Route path='cadernos' element={<CadernosPage />} />
                <Route path='importar' element={<ImportarPage />} />
                <Route path='cadernos/:caderno_id' element={<CadernoPage />} />
                <Route path='cadernos/:caderno_id/questoes' element="Questao Item" />
              </Route>
              <Route path='perfil' element="Perfil" />
              <Route path="/" element={<Navigate to={'/dashboard'} />}  />
              <Route path="*" element="Error 404" />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element="Error 404" />
        </Routes>
    )
}