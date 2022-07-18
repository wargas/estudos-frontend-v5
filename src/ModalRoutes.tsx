import { Route, Routes } from "react-router-dom";
import ModalComponent from "./components/modal";
import FormDisciplina from "./modals/form-disciplina";
import FormEditQuestao from "./modals/form-edit-questao";

export default function ModalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ModalComponent />}>
        <Route path="form-disciplina" element={<FormDisciplina />} />
        <Route path="form-disciplina/:id" element={<FormDisciplina />} />
        <Route path="form-questao/:id" element={<FormEditQuestao />} />
      </Route>
    </Routes>
  );
}
