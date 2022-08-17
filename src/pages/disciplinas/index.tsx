import PageTitle from "../../components/page-title";
import { MdMoreVert, MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import Api from "../../libs/Api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../providers/modal";
import PageLoading from "../../components/page-loading";
import { Disciplina } from "../../interfaces/Disciplina";

export default function DisciplinasPage() {
  const [search, setSearch] = useState(localStorage.getItem('search')||'');
  const { openModal } = useModal()

  const query = useQuery(["disciplinas", {search}], async () => {
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
        {query?.data &&
          query.data.map((disciplina) => (
              <div
                key={disciplina.id}
                className=" "
              >
                <div className="px-5 py-3 flex justify-between">
                  <div className="flex-1">
                    <Link
                      className="block"
                      to={`/disciplinas/${disciplina.id}`}
                    >
                      {disciplina.name}
                    </Link>
                    <span className="text-sm font-light">
                      {disciplina?.meta?.dia} &bull;{" "}
                      {disciplina?.meta?.count_aulas} aulas &bull;{" "}
                      {disciplina?.meta?.count_questoes || 0} questões
                    </span>
                  </div>
                  <div>
                    <button onClick={() => openModal(`/form-disciplina/${disciplina.id}`)}>
                      <MdMoreVert />
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
