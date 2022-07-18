import { parse } from "query-string";
import { FaArrowUp } from "react-icons/fa";
import {
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdComment,
  MdEdit,
} from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import QuestaoItem from "../../../components/questao";
import Api from "../../../libs/Api";

export default function CadernoPage() {
  const params = useParams();
  const location = useLocation();
  const { page = "1" } = parse(location.search);

  const cadernoQuery = useQuery(
    ["caderno", params.caderno_id],
    async ({ queryKey }) => {
      const { data } = await Api.get(`cadernos/${queryKey[1]}`);

      return data;
    }
  );

  const questoesQuery = useQuery(
    ["questoes", params.aula_id, page],
    async ({ queryKey }) => {
      const [_, aula_id, page] = queryKey;

      const { data } = await Api.get(
        `aulas/${aula_id}/questoes?page=${page}&perPage=5&withRespondidas=true`
      );

      return data;
    },
    {
      keepPreviousData: true,
    }
  );

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
          <Link
            to={`${location.pathname}?page=${parseInt(page as string) - 1}`}
          >
            <MdChevronLeft />
          </Link>
          <span>
            {questoesQuery?.data?.meta?.current_page}/
            {questoesQuery?.data?.meta?.last_page}
          </span>
          <Link
            to={`${location.pathname}?page=${parseInt(page as string) + 1}`}
          >
            <MdChevronRight />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {questoesQuery?.data?.data.map((questao: any, index: number) => (
          <QuestaoItem
            key={questao.id}
            caderno_id={params.caderno_id}
            questao={questao}
            index={(parseInt(page as string) - 1) * 5 + index + 1}
          />
        ))}
      </div>
    </div>
  );
}
