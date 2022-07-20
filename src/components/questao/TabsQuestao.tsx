import { useState } from "react";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import Api from "../../libs/Api";
import ComentarioItem from "./ComentarioItem";
import FormComentario from "./FormComentario";

type Props = {
  id: number;
};

export default function TabsQuestao({ id }: Props) {
  const [aba, setAba] = useState("");

  const { data: comentarios } = useQuery(
    [`comentarios`, id],
    async () => {
      const { data } = await Api.get(`questoes/${id}/comentarios`);

      return data;
    },
    {
      enabled: aba === "comentarios",
    }
  );

  

  return (
    <div className="flex flex-col border-t border-gray-100">
      <div className="flex border-b border-gray-100">
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
      </div>
      <div>
        {aba === "comentarios" && (
          <div>
            <div className="flex flex-col divide-y divide-gray-50">
              {comentarios &&
                comentarios?.length > 0 &&
                comentarios?.map((comentario: any) => (
                  <ComentarioItem  comentario={comentario} />
                ))}
            </div>
            <FormComentario questao_id={id} />
          </div>
        )}
      </div>
    </div>
  );
}
