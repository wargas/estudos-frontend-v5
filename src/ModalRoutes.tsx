import { Route, Routes, useLocation } from "react-router-dom";
import qs from 'query-string';
import Drawer from "./components/drawer";
import ModalComponent from "./components/modal";
import FormDisciplina from "./modals/form-disciplina";
import FormEditQuestao from "./modals/form-edit-questao";
import ListQUestoes from "./components/list-questoes";
import QconcursosModal from "./pages/aula/importar/QconcursosModal";
import FormAula from "./modals/form-aula";

type Props = {
  
}

export default function ModalRoutes({}: Props) {

  const location = useLocation();

  const { type = "modal" } = qs.parse(location.search)

  return (
    <Routes>
      <Route path="/" element={type === "modal" ? <ModalComponent /> : <Drawer />}>
        <Route path="form-disciplina" element={<FormDisciplina />} />
        <Route path="form-disciplina/:id" element={<FormDisciplina />} />
        <Route path="form-questao/:id" element={<FormEditQuestao />} />
        <Route path="list-questoes/:aula_id/:caderno_id" element={<ListQUestoes />} />
        <Route path="qconcursos" element={<QconcursosModal />} />
        <Route path="form-aula/:disciplina_id/:aula_id" element={<FormAula />} />
        <Route path="form-aula/:disciplina_id" element={<FormAula />} />
      </Route>
    </Routes>
  );
}
