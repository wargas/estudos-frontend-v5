import { useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";
import PageTitle from "../../components/page-title";
import Api from "../../libs/Api";
import PageLoading from "../../components/page-loading";
import qs from 'query-string'
import { DateTime } from "luxon";
import { SortAscending, SortDescending } from "phosphor-react";

export default function Disciplina() {
  const params = useParams();
  const location = useLocation()
  const navigate = useNavigate();
  const [_, setSearch] = useSearchParams()

  const { sort = 'ordem', ordem = 'asc' } = qs.parse(location.search)

  const queryDisciplina = useQuery(["disciplina", params.id], async () => {
    const { data } = await Api.get(`disciplinas/${params.id}`);

    return data;
  });

  const queryAulas = useQuery(
    [`aulas`, params.id],
    async () => {
      const { data } = await Api.get(
        `disciplinas/${params.id}/aulas?withCadernos=true&withMeta=true&withRegistros=true`
      );

      return data?.map((item: any) => {
        const last = item?.cadernos?.filter((it: any) => !!it.fim)
          ?.sort((a: any, b: any) => a.fim > b.fim ? 1 : -1)
          ?.at(-1);
        let nota = 0;
        let _data = "";
        if (last) {
          nota = (last.acertos / (last.erros + last.acertos)) * 100;
          _data = last.fim;
        }

        return { ...item, last, nota, data: _data };
      });
    },
    {
      enabled: !!queryDisciplina?.data?.id,
    }
  );

  return (
    <div className="relative">
      <PageTitle
        isLoading={queryDisciplina.isLoading || queryAulas.isLoading}
        backAction={() => navigate(`/disciplinas`)}
        title={queryDisciplina?.data?.name}
        subtitle={
          queryAulas?.data ? `${queryAulas.data.length} aulas` : "0 aulas"
        }
      >
        <div className="flex gap-2">
          <span>Ordenar por: </span>
          <div className="flex justify-around border rounded-full divide-x">
            <button onClick={() => setSearch({ sort: 'ordem', ordem: ordem === 'asc' ? 'desc' : 'asc' })} className={`text-sm flex items-center gap-1  flex-1 px-5 h-7`}>
              <span> Aula</span> {sort === 'ordem' && (
                ordem === 'asc' ? (<SortDescending />) : (<SortAscending />)
              )}
            </button>
            <button onClick={() => setSearch({ sort: 'nota', ordem: ordem === 'asc' ? 'desc' : 'asc' })} className={`text-sm flex items-center gap-1 flex-1 px-5 h-7`}>
              <span> Nota</span> {sort === 'nota' && (
                ordem === 'asc' ? (<SortDescending />) : (<SortAscending />)
              )}
            </button>
            <button onClick={() => setSearch({ sort: 'data', ordem: ordem === 'asc' ? 'desc' : 'asc' })} className={`text-sm flex items-center gap-1  flex-1 px-5 h-7`}>
              <span> Data</span> {sort === 'data' && (
                ordem === 'asc' ? (<SortDescending />) : (<SortAscending />)
              )}
            </button>
          </div>

        </div>
      </PageTitle>

      {queryAulas?.data && (
        <div className="bg-white py-5 shadow relative flex flex-col divide-y divide-gray-100 rounded max-w-screen-laptop desktop:mx-auto m-5">
          <PageLoading show={queryAulas.isLoading} />
          {queryAulas.data
            .sort(sortDisciplinas(sort as string, ordem as "asc"))
            .map((aula: any) => (
              <div
                key={aula.id}
                className="px-5 py-3 grid items-center grid-cols-[1fr_100px_30px] gap-3"
              >
                <div className="flex flex-col flex-1">
                  <span className="font-light">
                    Aula {aula.ordem.toString().padStart(2, "0")}
                  </span>
                  <Link
                    className="hover:text-gray-900 text-lg"
                    to={`/disciplinas/${params.id}/aula/${aula.id}`}
                  >
                    {aula.name}
                  </Link>
                  <span className="text-sm font-light">
                    {aula?.meta?.questoes_count || 0} questoes &bull;{" "}
                    {aula?.cadernos.length} cadernos
                  </span>
                </div>
                <div>
                  {aula?.last && (
                    <>
                      <p className="text-sm">
                        {DateTime.fromISO(aula?.last?.fim).toFormat("dd/MM")}
                      </p>
                      <span>{aula.nota.toFixed(1)}%</span>
                    </>
                  )}
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

function sortDisciplinas(
  tipo: string,
  ordem: "asc" | "desc"
) {
  return (a: any, b: any) => {
    const valueA = a[tipo] || 0;
    const valueB = b[tipo] || 0;

    if (valueA > valueB) {
      return ordem === "desc" ? -1 : 1;
    } else {
      return ordem === "desc" ? 1 : -1;
    }
  };
}
