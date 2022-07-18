import { parse } from "query-string";
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
    <div className="mb-10">
      <div className="fixed bottom-10 right-10 border flex justify-between items-center gap-5 bg-white rounded p-5 shadow-lg">
        <div>
          {cadernoQuery.isLoading ? (
            <VscLoading className="animate-spin" />
          ) : (
            cadernoQuery?.data && (
              <div>
                {/* <p>{cadernoQuery.data?.inicio}</p> */}
                <div className="flex gap-1 font-light">
                  <span>{cadernoQuery.data.total | 0} total</span> &bull;
                  <span>{cadernoQuery.data.acertos | 0} acertos</span> &bull;
                  <span>{cadernoQuery.data.erros | 0} erros</span>
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
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
