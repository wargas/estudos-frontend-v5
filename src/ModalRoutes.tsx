import { RouteObject } from "react-router-dom";
import FormDisciplina from "./modals/form-disciplina";
import FormEditQuestao from "./modals/form-edit-questao";
import ListQUestoes from "./components/list-questoes";
import QconcursosModal from "./pages/aula/importar/QconcursosModal";
import FormAula from "./modals/form-aula";


const routes: RouteObject[] = [
    {
      path: "/form-disciplina", 
      element: <FormDisciplina />
    },
    {
      path: "/form-disciplina/:id", 
      element: <FormDisciplina />
    },
    {
      path: "/form-questao/:id", 
      element: <FormEditQuestao />
    },
    {
      path: "/list-questoes/:aula_id/:caderno_id", 
      element: <ListQUestoes />
    },
    {
      path: "/qconcursos", 
      element: <QconcursosModal />
    },
    {
      path: "/form-aula/:disciplina_id/:aula_id", 
      element: <FormAula />
    },
    {
      path: "/form-aula/:disciplina_id", 
      element: <FormAula />
    }
]

export default routes;

// type Props = {
  
// }

// export default function ModalRoutes({}: Props) {

//   const location = useLocation();

//   const { type = "modal" } = qs.parse(location.search)

//   return (
//     <Routes>
//       <Route path="/" element={type === "modal" ? <ModalComponent /> : <Drawer />}>
//         <Route path="form-disciplina" element={<FormDisciplina />} />
//         <Route path="form-disciplina/:id" element={<FormDisciplina />} />
//         <Route path="form-questao/:id" element={<FormEditQuestao />} />
//         <Route path="list-questoes/:aula_id/:caderno_id" element={<ListQUestoes />} />
//         <Route path="qconcursos" element={<QconcursosModal />} />
//         <Route path="form-aula/:disciplina_id/:aula_id" element={<FormAula />} />
//         <Route path="form-aula/:disciplina_id" element={<FormAula />} />
//       </Route>
//     </Routes>
//   );
// }
