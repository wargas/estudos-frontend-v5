import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdMoreVert } from 'react-icons/md'
import PageTitle from "../../components/page-title";
import Api from "../../libs/Api";

export default function Disciplina() {
  const params = useParams();
  const navigate = useNavigate();
  const queryDisciplina = useQuery(["disciplina", params.id], async () => {
    const { data } = await Api.get(`disciplinas/${params.id}`);

    return data;
  });

  const queryAulas = useQuery(
    [`aulas`, params.id],
    async () => {
      const { data } = await Api.get(`disciplinas/${params.id}/aulas?withCadernos=true&withMeta=true&withRegistros=true`);

      return data;
    },
    {
      enabled: !!queryDisciplina?.data?.id,
    }
  );

  return (
    <div>
      {queryDisciplina?.data?.id && (
        <PageTitle
          backAction={() => navigate(`/disciplinas`)}
          title={queryDisciplina.data.name}
          subtitle={queryAulas?.data ? `${queryAulas.data.length} aulas` : undefined}
        ></PageTitle>
      )}
      {queryAulas?.data && (
        <div className="bg-white py-5 shadow flex flex-col divide-y divide-gray-100 rounded max-w-screen-laptop desktop:mx-auto m-5">
          {queryAulas.data.map((aula: any) => (
            <div key={aula.id} className="px-5 py-3 flex gap-3">
              <div className="flex flex-col flex-1">
                <span className="font-light">Aula {aula.ordem.toString().padStart(2, '0')}</span>
                <Link className="hover:text-gray-900 text-lg" to={`/disciplinas/${params.id}/aula/${aula.id}`}>
                  {aula.name}
                </Link>
                <span className="text-sm font-light">
                    {aula?.meta?.questoes_count||0} questoes &bull; {aula?.cadernos.length} cadernos
                    </span>
              </div>
              <div>
                <button>
                    <MdMoreVert /> 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
