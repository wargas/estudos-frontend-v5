import { parse } from "query-string";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FaArrowUp } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useQuery } from "react-query";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PageLoading from "../../../components/page-loading";
import QuestaoItem from "../../../components/questao";
import Api from "../../../libs/Api";

export default function CadernoPage() {
  const params = useParams();
  const location = useLocation();
  const { page = "1", perpage = "1" } = parse(location.search);

  const [_, setSearch] = useSearchParams();

  const cadernoQuery = useQuery(
    ["caderno", params.caderno_id],
    async ({ queryKey }) => {
      const { data } = await Api.get(`cadernos/${queryKey[1]}`);

      return data;
    }
  );

  const questoesQuery = useQuery(
    ["questoes", params.aula_id, page, perpage],
    async ({ queryKey }) => {
      const [_, aula_id, page] = queryKey;

      const { data } = await Api.get(
        `aulas/${aula_id}/questoes?page=${page}&perPage=${perpage}&withRespondidas=true`
      );

      return data;
    },
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {

    function onListener(e: any) {
      if (e.key === 'ArrowRight') {
        next()
      }
      if (e.key === 'ArrowLeft') {
        prev()
      }
    }

    const event = document.addEventListener('keydown', onListener)

    return () => {
      document.removeEventListener('keydown', onListener)
    }

  }, [page])

  function next() {
    const currentPage = parseInt(page as string) + 1;

    setSearch({ page: currentPage.toString(), perpage: perpage as string })
  }

  function prev() {
    const currentPage = parseInt(page as string) - 1;

    setSearch({ page: currentPage.toString(), perpage: perpage as string })
  }

  return (
    <div className="mb-36">
      <button
        onClick={() => {
          const main = document?.getElementById("main");
          if (main) {
            main.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="fixed w-12 h-12 flex items-center justify-center rounded-full bottom-0 right-0 m-10 bg-white shadow"
      >
        <FaArrowUp />
      </button>
      <div className="flex justify-between items-center gap-5 bg-white rounded p-5">
        <div>
          {cadernoQuery.isLoading ? (
            <VscLoading className="animate-spin" />
          ) : (
            cadernoQuery?.data && (
              <div>
                {cadernoQuery.data.fim ? (
                  <span className="text-xl text-green-600">Finalizado</span>
                ) : cadernoQuery.data.inicio ? (
                  <span className="text-xl">Iniciado</span>
                ) : (
                  <span className="text-xl text-yellow-500">Não inciado</span>
                )}
                <div className="flex gap-1 font-light">
                  <span>{cadernoQuery.data.total | 0} total</span> &bull;
                  <span>{cadernoQuery.data.acertos | 0} acertos</span> &bull;
                  <span>{cadernoQuery.data.erros | 0} erros</span> &bull;
                  <span>
                    {(
                      (cadernoQuery.data.acertos /
                        (cadernoQuery.data.acertos + cadernoQuery.data.erros)) *
                      100 || 0
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-3">
            Por página:
            <select
              onChange={(e) =>
                setSearch({ page: "1", perpage: e.target.value })
              }
              className="bg-transparent"
              name=""
              id=""
            >
              {[1, 5, 10, 20].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button onClick={prev}>
            <MdChevronLeft />
          </button>

          <span>
            <select onChange={(ev) => setSearch({ perpage: perpage as string, page: ev.target.value })} value={page as string} className="bg-transparent appearance-none">
              {Array(parseInt(questoesQuery?.data?.meta?.last_page || 0))
                .fill("")
                .map((_, index: number) => (
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))}
            </select>
            / {` `}
            {questoesQuery?.data?.meta?.last_page}
          </span>
          <button onClick={next}>
            <MdChevronRight />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5 relative min-h-[96px]">

        <PageLoading show={questoesQuery.isFetching} />
        {questoesQuery?.data?.data.map((questao: any, index: number) => (
          <QuestaoItem
            isCurrent={index === 0}
            key={questao.id}
            caderno_id={params.caderno_id}
            questao={questao}
            index={
              (parseInt(page as string) - 1) * parseInt(perpage as string) +
              index +
              1
            }
          />
        ))}
      </div>
    </div>
  );
}
