import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/components/layout";
import AulaPage from "@app/pages/aula";
import CadernoPage from "@app/pages/aula/caderno";
import CadernosPage from "@app/pages/aula/cadernos";
import ImportarPage from "@app/pages/aula/importar";
import ResumoPage from "@app/pages/aula/resumo";
import DashboardPage from "@app/pages/dashboard";
import Disciplina from "@app/pages/disciplina";
import DisciplinasPage from "@app/pages/disciplinas";
import LoginPage from "@app/pages/login";
import Testes from "@app/pages/testes";

export default function AppRoutes () {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/testes' element={<Testes />} />
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