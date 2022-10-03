import { useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MdEdit, MdSearch } from "react-icons/md";
import PageTitle from "@app/components/page-title";
import Api from "@app/libs/Api";
import PageLoading from "@app/components/page-loading";
import qs from 'query-string'
import { DateTime, Duration } from "luxon";
import { Disciplina } from "@app/interfaces/Disciplina";
import Aula from "@app/interfaces/Aula";
import { useModal } from "@app/providers/modal";

export default function DisciplinaPage() {
  const params = useParams();
  const location = useLocation()
  const navigate = useNavigate();
  const [_, setSearch] = useSearchParams()

  const { openModal }  = useModal()


  const queryDisciplina = useQuery(["disciplina", params.id], async () => {
    const { data } = await Api.get<Disciplina>(`disciplinas/${params.id}`);

    return data;
  });

  const search = qs.parse(location.search)

  const queryAulas = useQuery(
    [`aulas`, params.id, search],
    async () => {
      const { data } = await Api.get<Aula[]>(
        `disciplinas/${params.id}/aulas?${qs.stringify(search)}`
      );

      return data
    },
    {
      enabled: !!queryDisciplina?.data?.id,
    }
  );

  function toggleSearch(col: string) {
    const { sort = 'ordem', ordem = 'asc' } = qs.parse(location.search);

    if (col === sort) {
      setSearch({ sort: col, ordem: ordem === 'asc' ? 'desc' : 'asc' })
    } else {
      setSearch({ sort: col, ordem: 'asc' })
    }
  }

  return (
    <div className="relative">
      <PageTitle
        isLoading={queryDisciplina.isLoading}
        backAction={() => navigate(`/disciplinas`)}
        title={queryDisciplina?.data?.name || ''}
        subtitle={
          `${queryDisciplina.data?.meta.count_aulas || 0} aulas`
        }
      >
        <div className="flex gap-2">
          <button onClick={() => openModal(`/form-aula/${queryDisciplina?.data?.id || ''}?type=side`, (res) => {
            if(res) {
              queryAulas.refetch()
            }
          })}>Adicionar</button>
        </div>
      </PageTitle>


      <div className="bg-white py-3 shadow relative flex flex-col divide-y divide-gray-100 rounded max-w-screen-laptop desktop:mx-auto m-5">
        <PageLoading show={queryAulas.isFetching || queryAulas.isLoading} />
        <table className="divide-y">
          <thead>
            <tr className="h-14 uppercase">
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('ordem')}>#</th>
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('name')}>Nome</th>
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('total_questoes')}>Questões</th>
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('total_registro')}>Tempo</th>
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('last_registro')}>Visto em</th>
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('last_nota')}>Nota</th>
              <th className="text-left cursor-pointer" onClick={() => toggleSearch('nome')}></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {queryAulas?.data?.map(aula => (
              <tr className="odd:bg-stone-50">
                <td className="px-4 py-3 text-lg font-extrabold">{aula.ordem.toString().padStart(2, '0')}</td>
                <td className="px-4 py-3">{aula.name}</td>
                <td className="px-4 py-3 text-gray-600 text-base">{aula.meta.total_questoes}</td>
                <td className="px-4 py-3 text-gray-600 text-base">{Duration.fromMillis(aula.meta.total_registro * 1000).toFormat("hh'h'mm")}</td>
                <td className="px-4 py-3 text-gray-600 text-base">{!aula.meta.last_registro ? '-' : DateTime.fromISO(aula.meta.last_registro).toFormat('dd/MM/yyyy')}</td>
                <td title={`Acertos: ${aula.meta.last_caderno_acertos}`} className="px-4 py-3 text-gray-600 text-base">{(aula.meta.last_nota * 100).toLocaleString('br', { minimumFractionDigits: 1 })}%</td>
                <td className="">
                  <div className="flex px-4 py-3 text-gray-600 text-base gap-4">

                    <button onClick={() => openModal(`/form-aula/${queryDisciplina?.data?.id || ''}/${aula.id}`, (res) => {
                      
                      if(res) {
                        queryAulas.refetch()
                      }
                    })}>
                      <MdEdit />
                    </button>

                    <Link
                      className="hover:text-gray-900 text-lg"
                      to={`/disciplinas/${params.id}/aula/${aula.id}`}
                    >
                      <MdSearch />
                    </Link>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

