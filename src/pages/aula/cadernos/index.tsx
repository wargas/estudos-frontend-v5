import { MdMoreVert, MdPlayArrow, MdPlusOne } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Api from "../../../libs/Api";
import { format } from "date-fns";
import { VscLoading } from "react-icons/vsc";

export default function CadernosPage() {
  const params = useParams();
  const cadernosQuery = useQuery(
    ["cadernos", params.aula_id],
    async ({ queryKey }) => {
      const [_, id] = queryKey;
      const { data } = await Api.get(`aulas/${id}/cadernos`);

      return data;
    }
  );

  const mutation = useMutation(async () => {
    const { data } = await Api.post(`aulas/${params.aula_id}/cadernos`);

    return data;
  }, {
    onSuccess: () => {
      cadernosQuery.refetch()
    }
  });

  return (
    <div className="bg-white rounded shadow-sm roudend divide-y">
      {cadernosQuery?.data && cadernosQuery.data.length === 0 && (
        <div className="p-5 flex flex-col items-center gap-3 justify-center">
          <p className="text-gray-400 text">nenhum caderno cadastrado</p>
          <button
            onClick={() => mutation.mutate()}
            className="bg-stone-700 rounded px-3 h-9 text-white flex items-center gap-2"
          >
            {mutation.isLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              <MdPlusOne />
            )}
            <span>Novo</span>
          </button>
        </div>
      )}
      {cadernosQuery.isLoading && (
        <div className="p-5 flex items-center justify-center">
          <VscLoading className="animate-spin" />
        </div>
      )}
      {cadernosQuery?.data?.map((caderno: any) => (
        <div key={caderno.id} className="flex p-5">
          <div className="flex-1">
            <p className="flex items-center gap-5">
              {" "}
              {caderno.inicio
                ? format(new Date(caderno.inicio), "dd/MM/Y")
                : "Não iniciado"}
              <div
                className={`${
                  caderno.encerrado ? "bg-green-500" : "bg-yellow-500"
                } w-3 h-3 rounded-full`}
              ></div>
            </p>
            <span className="font-light">
              {caderno.inicio
                ? (
                    (caderno.acertos / (caderno.erros + caderno.acertos)) *
                    100
                  ).toFixed(2)
                : "0.00"}
              % &bull; {caderno.acertos || 0} acertos &bull;{" "}
              {caderno.erros || 0} erros
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <Link className="flex items-center" to={caderno.id.toString()}>
              iniciar
            </Link>
            <button>
              <MdMoreVert />
            </button>
          </div>
        </div>
      ))}
      {cadernosQuery?.data?.length > 0 && (
        <div className="p-5 flex justify-end">
          <button
            onClick={() => mutation.mutate()}
            className="bg-stone-700 rounded px-3 h-9 text-white flex items-center gap-2"
          >
            {mutation.isLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              <MdPlusOne />
            )}
            <span>Novo</span>
          </button>
        </div>
      )}
    </div>
  );
}
