import { useState } from "react";
import { MdCheck, MdComment, MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { VscLoading } from 'react-icons/vsc'
import Api from "../../libs/Api";
import alternativaButtonClass from "../../utils/alternativaButtonClass";
import { useModal } from "../../providers/modal";

export default function QuestaoItem({ questao, index, caderno_id }: any) {
  const [selectedLetra, setSelectedLetra] = useState("");

  const {openModal} = useModal()

  const queryClient = useQueryClient()

  const [respondida, setRespondida] = useState(questao.respondidas.find(
    (questao: any) => questao.caderno_id === caderno_id
  ))

  const mutationResponder = useMutation(async () => {
    const { data } = await Api.post(`questoes/responder`, {
      questao_id: questao.id,
      caderno_id,
      resposta: selectedLetra
    })

    setRespondida(data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('caderno')
    }
  })



  return (
    <div className="bg-white rounded shadow-sm">
      <div className="p-5 border-b gap-2 border-gray-100 flex items-center">
        <div>
          <img className="w-8 h-8" src={questao?.banca?.image_url} />
        </div>
        <span className="flex-1 font-bold"> {questao.header}</span>
        <span>Questão {index}</span>
      </div>
      <div className="p-5 border-b border-gray-100">
        <div
          className="text-justify text-xl enunciado"
          dangerouslySetInnerHTML={{ __html: questao.enunciadoHtml }}
        />
      </div>
      <div className="divide-y divide-gray-50">
        {questao?.alternativas.map((alternativa: any) => (
          <div
            key={alternativa.letra}
            className={`px-5 py-3 cursor-pointer flex items-center gap-5`}
          >
            <button
              disabled={!!respondida}
              onClick={() =>
                setSelectedLetra(
                  alternativa.letra === selectedLetra ? "" : alternativa.letra
                )
              }
              className={`${alternativaButtonClass(
                alternativa.letra,
                selectedLetra,
                respondida?.gabarito,
                respondida?.resposta
              )} border-[3px] transition-all w-12 h-12 rounded-xl`}
            >
              {alternativa.letra}
            </button>
            <span
              className="flex-1"
              dangerouslySetInnerHTML={{ __html: alternativa.html }}
            />
          </div>
        ))}
      </div>
      <div className="p-5 border-t flex items-center border-gray-100 justify-between">
        <div className="">
          <button
            onClick={() => mutationResponder.mutate()}
            disabled={selectedLetra === "" || !!respondida || mutationResponder.isLoading}
            className="bg-stone-500 disabled:opacity-30 flex items-center gap-2 h-10 rounded px-5 text-white"
          >
           {mutationResponder.isLoading  ? <VscLoading className="animate-spin" /> : <MdCheck />}  <span>Responder</span>
          </button>
        </div>
        <div className="flex gap-5">
          <button onClick={() => openModal(`/form-questao/${questao.id}`)} className="flex items-center gap-2 bg-stone-600 text-white px-2 h-10 rounded">
            <MdEdit /> Editar
          </button>
          <button className="flex items-center gap-2 bg-stone-600 text-white px-2 h-10 rounded">
            <MdComment /> Comentários
          </button>
        </div>
      </div>
    </div>
  );
}
