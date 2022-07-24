import { useEffect, useState } from "react";
import { MdCheck, MdClose, MdComment, MdEdit } from "react-icons/md";
import { useMutation, useQueryClient, QueryObserver } from "react-query";
import { VscLoading } from "react-icons/vsc";
import Api from "../../libs/Api";
import alternativaButtonClass from "../../utils/alternativaButtonClass";
import { useModal } from "../../providers/modal";
import TabsQuestao from "./TabsQuestao";
import { X } from "phosphor-react";
import Stats from "./Stats";

export default function QuestaoItem({
  questao: initQuestao,
  index,
  caderno_id,
}: any) {
  const [selectedLetra, setSelectedLetra] = useState("");
  const [riscadas, setRiscadas] = useState<string[]>([]);
  const [questao, setQuestao] = useState(initQuestao);

  const { openModal } = useModal();

  const queryClient = useQueryClient();

  const [respondida, setRespondida] = useState<any>();

  const mutationResponder = useMutation(
    async () => {
      const { data } = await Api.post(`questoes/responder`, {
        questao_id: questao.id,
        caderno_id,
        resposta: selectedLetra,
      });

      setRespondida(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("caderno");
        queryClient.invalidateQueries("respondidas");
      },
    }
  );

  function handlerCloseEdit(data: any) {
    if (data) {
      setQuestao((old: any) => ({ ...old, ...data }));
    }
  }

  function handlerRiscadas(letra: string) {
    if (riscadas.includes(letra)) {
      setRiscadas((old) => old.filter((l) => l !== letra));
    } else {
      setRiscadas((old) => [...old, letra]);
    }
  }

  useEffect(() => {
    const observer = new QueryObserver<any>(queryClient, {
      queryKey: ["respondidas", questao.id],
    });

    const unobserver = observer.subscribe(({ data }) => {
      setQuestao({ ...questao, respondidas: data });
    });

    return unobserver;
  }, []);

  useEffect(() => {
    const _respondida = questao?.respondidas?.find(
      (r: any) => r.caderno_id === parseInt(caderno_id)
    );

    setRespondida(_respondida);
  }, [questao]);

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="p-5 border-b gap-2 border-gray-100 flex items-center">
        <div>
          <img className="w-8 h-8" src={questao?.banca?.image_url} />
        </div>

        <span className="flex-1 font-bold">{questao.header}</span>
        {<Stats respondidas={questao?.respondidas || []} />}
      </div>
      <div className="p-5  border-b border-gray-100">
        <div className="flex justify-end pb-3">
          <span className="font-bold">
            Questão {index.toString().padStart(2, "0")}
          </span>
        </div>
        <div
          className="text-justify text-xl enunciado"
          dangerouslySetInnerHTML={{ __html: questao.enunciadoHtml }}
        />
      </div>
      <div className="divide-y divide-gray-50">
        {questao?.alternativas.map((alternativa: any) => (
          <div
            key={alternativa.letra}
            className={`px-5 py-3 cursor-pointer flex items-center gap-5 group`}
          >
            <button
              disabled={respondida}
              onClick={() => handlerRiscadas(alternativa.letra)}
              className="opacity-0 disabled:group-hover:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X />
            </button>

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
              onClick={() =>
                setSelectedLetra(
                  alternativa.letra === selectedLetra ? "" : alternativa.letra
                )
              }
              className={`flex-1 opacity-25  ${
                riscadas.includes(alternativa.letra)
                  ? "opacity-25 line-through"
                  : "opacity-100"
              }`}
              dangerouslySetInnerHTML={{ __html: alternativa.html }}
            />
          </div>
        ))}
      </div>
      <div className="border-t flex border-gray-100 justify-between">
        <div className="p-5">
          <button
            onClick={() => mutationResponder.mutate()}
            disabled={
              selectedLetra === "" ||
              !!respondida ||
              mutationResponder.isLoading
            }
            className="bg-stone-500 disabled:opacity-30 flex items-center gap-2 h-10 rounded-lg px-5 text-white"
          >
            {mutationResponder.isLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              <MdCheck />
            )}{" "}
            <span>Responder</span>
          </button>
        </div>
        <div className="flex gap-5 p-5">
          <button
            onClick={() =>
              openModal(`/form-questao/${questao.id}`, handlerCloseEdit)
            }
            className="flex items-center gap-2 border border-stone-600 text-stone-600 px-2 h-10 rounded-lg"
          >
            <MdEdit /> Editar
          </button>
        </div>
      </div>
      <TabsQuestao id={questao.id} />
    </div>
  );
}
