import { RouteObject } from "react-router-dom";
import FormDisciplina from "@app/modals/form-disciplina";
import FormEditQuestao from "@app/modals/form-edit-questao";
import ListQUestoes from "@app/components/list-questoes";
import QconcursosModal from "@app/pages/aula/importar/QconcursosModal";
import FormAula from "@app/modals/form-aula";
import { eachDayOfInterval } from "date-fns";
import FormImportQuestoes from "@app/modals/form-import-questoes";



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
    },
    {
      path: "/form-importar-questoes/:aula_id",
      element: <FormImportQuestoes />
    }
]

export default routes;