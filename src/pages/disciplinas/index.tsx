import PageTitle from "../../components/page-title";
import { MdMoreVert, MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import Api from "../../libs/Api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../providers/modal";
import PageLoading from "../../components/page-loading";
import { Disciplina } from "../../interfaces/Disciplina";
import { Duration } from "luxon";
import useDebounce from "../../libs/debounce";
import { FaEdit } from "react-icons/fa";

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

      <div className="m-5 relative py-2 divide-y max-w-screen-laptop desktop:mx-auto divide-gray-100 shadow-sm rounded bg-white">
        <PageLoading show={query.isLoading} />
        <table className="w-full divide-y divide-gray-100">
          <thead className="uppercase">
            <tr>
              <th className="cursor-pointer text-left px-3 h-12">Nome</th>
              <th className="cursor-pointer px-3 h-12 text-end">Aulas</th>
              <th className="cursor-pointer px-3 h-12 text-end">Questões</th>
              <th className="cursor-pointer px-3 h-12 text-end">Tempo</th>
              <th className="cursor-pointer text-left px-3 h-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {query?.data &&
              query.data.map((disciplina) => (
                <tr className="odd:bg-stone-50" key={disciplina.id}>
                  <td className="px-3 h-12">{disciplina.name}</td>
                  <td className="px-3 h-12 text-gray-700 text-end">{disciplina.meta.count_aulas}</td>
                  <td className="px-3 h-12 text-gray-700 text-end">{disciplina.meta.count_questoes}</td>
                  <td className="px-3 h-12 text-gray-700 text-end">{Duration.fromMillis(disciplina.meta.count_tempo * 1000).toFormat("hh'h'mm")}</td>
                  <td className="px-3 h-12 text-gray-700">
                    <div className="flex items-center justify-end">
                      <button onClick={() => openModal(`/form-disciplina/${disciplina.id}`)}>
                        <FaEdit />
                      </button>
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
      </div>
    </div>
  );
}
