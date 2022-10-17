import PageTitle from "@app/components/page-title";
import { MdMoreVert, MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import Api from "@app/libs/Api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "@app/providers/modal";
import PageLoading from "@app/components/page-loading";
import { Disciplina } from "@app/interfaces/Disciplina";
import { Duration } from "luxon";
import useDebounce from "@app/libs/debounce";
import { Dropdown } from "@app/components/dropdown";

export default function DisciplinasPage() {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const { openModal } = useModal()

  const debounceValue = useDebounce(search)

  const query = useQuery(["disciplinas", { search: debounceValue }], async () => {
    const { data } = await Api.get<Disciplina[]>(`disciplinas?search=${search}`);

    return data;
  });

  useEffect(() => {
    localStorage.setItem('search', search)
  }, [search])

  return (
    <div className="">
      <PageTitle backAction={() => { }} title="Disciplinas">
        <div className="flex w-full gap-5 items-center">
          <div className="flex px-3 border rounded h-10">
            <input
              onChange={(ev) => setSearch(ev.target.value)}
              value={search}
              className="bg-transparent focus:outline-none"
              type="text"
              placeholder="Pesquisar..."
            />
            <button>
              <MdSearch />
            </button>
          </div>
          <button
            onClick={() => openModal("/form-disciplina")}
            className="rounded h-10"
          >
            <MdMoreVert />
          </button>
        </div>
      </PageTitle>

      <div className="m-5 relative bg-white rounded-lg shadow divide-y max-w-screen-laptop desktop:mx-auto divide-gray-100">
        <PageLoading show={query.isLoading} />
        <table className="w-full divide-y divide-gray-100">
          <thead className="uppercase">
            <tr>
              <th className="cursor-pointer bg-white rounded-tl-lg text-left px-4 h-14">Nome</th>
              <th className="cursor-pointer bg-white px-4 h-12 text-end">Aulas</th>
              <th className="cursor-pointer bg-white px-4 h-12 text-end">Questões</th>
              <th className="cursor-pointer bg-white px-4 h-12 text-end">Tempo</th>
              <th className="cursor-pointer bg-white rounded-tr-lg text-left px-4 h-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {query?.data &&
              query.data.map((disciplina) => (
                <tr className="group hover:bg-gray-50 cursor-pointer" key={disciplina.id}>
                  <td className="px-4  group-last:rounded-bl h-12">
                    <Link to={`/disciplinas/${disciplina.id}`} className="text-left">{disciplina.name}</Link>
                  </td>
                  <td className="px-4  h-12 text-gray-700 text-end">{disciplina.meta.count_aulas}</td>
                  <td className="px-4  h-12 text-gray-700 text-end">{disciplina.meta.count_questoes}</td>
                  <td className="px-4  h-12 text-gray-700 text-end">{Duration.fromMillis(disciplina.meta.count_tempo * 1000).toFormat("hh'h'mm")}</td>
                  <td className="px-4  group-last:rounded-br h-12 text-gray-700">
                    <div className="flex items-center justify-end">
                      <Dropdown position="right" items={[
                        {
                          label: "Editar",
                          action: () => openModal(`/form-disciplina/${disciplina.id}`),
                          icon: ""
                        },
                        {
                          label: "Excluir",
                          action: () => {},
                          icon: ""
                        },
                        {
                          label: "Detalhes",
                          action: () => {},
                          icon: ""
                        }
                      ]}>
                        <MdMoreVert />
                      </Dropdown>

                      <Link
                        className=" px-4"
                        to={`/disciplinas/${disciplina.id}`}
                      >
                        <MdSearch />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="p-4 py-3 flex justify-between">
          <span className="text-gray-400">Pesquisando por: <i>"{search}"</i></span>
          <span className="text-gray-400">{query.data?.length || 0} disciplina(s) encontrada(s)</span>
        </div>
      </div>
    </div>
  );
}
