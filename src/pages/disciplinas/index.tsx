import PageTitle from "../../components/page-title";
import { MdPlusOne, MdMoreVert, MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import Api from "../../libs/Api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useModal } from "../../providers/modal";

export default function DisciplinasPage() {
  const [search, setSearch] = useState("");
  const { openModal } = useModal()

  const query = useQuery(["disciplinas"], async () => {
    const { data } = await Api.get(
      "disciplinas?countAulas=true&countQuestoes=true"
    );

    return data;
  });

  return (
    <div className="">
      <PageTitle backAction={() => {}} title="Disciplinas">
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

      <div className="m-5 py-2 divide-y max-w-screen-laptop desktop:mx-auto divide-gray-100 shadow-sm rounded bg-white">
        {query?.data &&
          query.data
            .filter((disciplina: any) =>
              JSON.stringify(disciplina)
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
            .map((disciplina: any) => (
              <div
                key={disciplina.id}
                className=" text-gray-500 hover:text-gray-700"
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
                      {disciplina?.meta?.aulas_count || 0} aulas &bull;{" "}
                      {disciplina?.meta?.questoes_count || 0} questões
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
