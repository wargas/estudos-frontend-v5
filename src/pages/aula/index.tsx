import PageTitle from "../../components/page-title";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Api from "../../libs/Api";
import { Relogio } from "../../components/relogio";

export default function AulaPage() {
  const params = useParams();
  const location = useLocation()
  const navigate = useNavigate();

  const queryAula = useQuery(["aula", params?.aula_id], async () => {
    const { data } = await Api.get(
      `disciplinas/${params.disciplina_id}/aulas/${params.aula_id}?withDisciplina=true&withMeta=true`
    );

    return data;
  });

  return (
    <div>
      <PageTitle
        isLoading={queryAula.isLoading}
        backAction={() => navigate(`/disciplinas/${params.disciplina_id}`)}
        title={`${String(queryAula?.data?.ordem).padStart(2, "0")} - ${queryAula?.data?.name
          }`}
        subtitle={queryAula?.data?.disciplina?.name}
      >
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center gap-5">

            <Link to={"cadernos"}>Cadernos</Link>
            <Link to={location.pathname.split('/cadernos')[0]}>Questões</Link>

          </div>
          {queryAula?.data && <Relogio aula={queryAula?.data} />}
        </div>
      </PageTitle>

      <div className="desktop:mx-auto mx-5 mt-5 max-w-screen-laptop">
        <Outlet context={{ aula: queryAula.data }} />
      </div>
    </div>
  );
}
