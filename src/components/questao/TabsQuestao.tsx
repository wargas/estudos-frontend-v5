import { useState } from "react";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import { Questao } from "../../interfaces/Questao";
import Api from "../../libs/Api";
import PageLoading from "../page-loading";
import ComentarioItem from "./ComentarioItem";
import FormComentario from "./FormComentario";
import RespondidaItem from "./RespondidaItem";
import Stats from "./Stats";

type Props = {
  questao?: Questao
};

export default function TabsQuestao({ questao }: Props) {
  const [aba, setAba] = useState<"comentarios" | "respondidas" | "resolucao" | "">("");

  const { data: comentarios } = useQuery(
    [`comentarios`, questao?.id],
    async () => {
      const { data } = await Api.get(`questoes/${questao?.id}/comentarios`);

      return data;
    },
    {
      enabled: aba === "comentarios",
    }
  );

  const { data: respondidas, isLoading: isLoadingRespondidas } = useQuery(
    [`respondidas`, questao?.id],
    async () => {
      const { data } = await Api.get(`questoes/${questao?.id}/respondidas`);

      return data;
    },
    {
      enabled: aba === "respondidas",
    }
  );

  return (
    <div className="flex flex-col border-t border-gray-100">
      <div className="flex items-center border-b border-gray-100">
        <button
          onClick={() => setAba("resolucao")}
          className={`${aba === "resolucao" ? "border-b-2" : ""}  h-10 px-5`}
        >
          Resolução
        </button>
        <button
          onClick={() => setAba("respondidas")}
          className={`${aba === "respondidas" ? "border-b-2" : ""}  h-10 px-5`}
        >
          Respondidas
        </button>
        <button
          onClick={() => setAba("comentarios")}
          className={`${aba === "comentarios" ? "border-b-2" : ""} h-10 px-5`}
        >
          Comentários
        </button>

        <div className="ml-auto mr-4">
          <Stats respondidas={questao?.respondidas || []} />
        </div>
      </div>
      <div>
        {aba === 'resolucao' && (
          <div className="p-5 resolucao">
            <div dangerouslySetInnerHTML={{ __html: questao?.resolucaoHtml || '' }}></div>
          </div>
        )}
        {aba === "comentarios" && (
          <div>
            <div className="flex flex-col divide-y divide-gray-50">
              {comentarios &&
                comentarios?.length > 0 &&
                comentarios?.map((comentario: any) => (
                  <ComentarioItem key={comentario.id} comentario={comentario} />
                ))}
            </div>
            <FormComentario questao_id={questao?.id as number} />
          </div>
        )}
        {aba === "respondidas" && (
          <div className="flex flex-col divide-y divide-gray-50">
            <PageLoading show={isLoadingRespondidas} />
            {respondidas &&
              respondidas?.length > 0 &&
              respondidas?.map((respondida: any) => (
                <RespondidaItem key={respondida.id} respondida={respondida} />
              ))}
            {respondidas?.length === 0 && (
              <div className="flex p-5 justify-center">
                <span className="text-gray-400 text-base">Nunca respondida</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
