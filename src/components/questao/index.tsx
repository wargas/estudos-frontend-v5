import { useEffect, useState } from "react";
import { MdCheck, MdEdit } from "react-icons/md";
import { useMutation, useQueryClient, QueryObserver } from "react-query";
import { VscLoading } from "react-icons/vsc";
import { useHotkeys } from "react-hotkeys-hook";
import Button from '@app/components/button'
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
  aula_id,
  isCurrent = false,
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
        aula_id: aula_id,
        caderno_id,
        resposta: selectedLetra,
      });

      setRespondida(data);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["caderno"])
        queryClient.refetchQueries(["respondidas"])
      },
    }
  );

  const mutationDelete = useMutation(async () => {
    await Api.delete(`questoes/${questao.id}`);
  }, {
    onSuccess: () => {
      queryClient.refetchQueries(["caderno"])
      queryClient.refetchQueries(["respondidas"])
      queryClient.refetchQueries(["questoes"])
    }
  })

  function handlerCloseEdit(data: any) {

    if (data) {
      setQuestao((old: any) => ({ ...old, ...data }));
    }
  }

  function handlerRiscadas(_letra: string) {
    const letra = _letra.toUpperCase();
    if (riscadas.includes(letra)) {
      setRiscadas((old) => old.filter((l) => l !== letra));
    } else {
      setRiscadas((old) => [...old, letra]);
    }
  }

  function handlerSelect(_letra: string) {
    const letra = _letra.toUpperCase();
    if (letra === selectedLetra) {
      setSelectedLetra("");
    } else {
      setSelectedLetra(letra);
    }
  }

  useEffect(() => {
    const observer = new QueryObserver<any>(queryClient, {
      queryKey: ["respondidas", questao.id],
    });

    const unobserver = observer.subscribe(({ data }) => {
      setQuestao((questao: any) => ({ ...questao, respondidas: data }));
    });

    return unobserver;
  }, []);

  useHotkeys("shift+e,shift+a,shift+b,shift+c,shift+d", (e) => {
    handlerRiscadas(e.key.toUpperCase())
  }, {
    enabled: isCurrent
  }, [riscadas]);



  useHotkeys("a,b,c,d,e", e => {
    handlerSelect(e.key.toUpperCase())
  }, {
    enabled: isCurrent
  }, [selectedLetra])

  useHotkeys(
    "enter",
    (e) => {
      e.preventDefault()
      selectedLetra !== "" && !respondida && mutationResponder.mutate()
    },
    [questao, selectedLetra, respondida],

  );

  useEffect(() => {
    const _respondida = questao?.respondidas?.find(
      (r: any) => r.caderno_id === parseInt(caderno_id)
    );

    setRespondida(_respondida);
  }, [questao]);

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b gap-2 border-gray-100 flex items-center">
        <div>
          {questao?.banca?.image_url ? (
            <img className="w-8 h-8 grayscale" src={questao?.banca?.image_url} />
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
          )}
        </div>

        <span className="flex-1 font-bold">{questao.header}</span>

        <span className="font-bold">
          Questão {index.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="p-5  border-b border-gray-100">

        <div
          className="text-justify text-lg enunciado"
          dangerouslySetInnerHTML={{ __html: questao?.enunciadoHtml }}
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
              className="opacity-0 -mx-5 px-5  h-10 disabled:group-hover:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X />
            </button>

            <button
              disabled={!!respondida}
              onClick={() => handlerSelect(alternativa.letra)}
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
              onClick={() => handlerSelect(alternativa.letra)}
              className={`flex-1  ${riscadas.includes(alternativa.letra)
                ? "opacity-25 line-through"
                : "opacity-100"
                }`}
              dangerouslySetInnerHTML={{ __html: alternativa?.html }}
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
            className="bg-primary-500 disabled:opacity-30 flex items-center gap-2 h-10 rounded-lg px-5 text-white"
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
          <Button isLoading={mutationDelete.isLoading} onClick={() => mutationDelete.mutate()}>Excluir</Button>
          <button
            onClick={() =>
              openModal(`/form-questao/${questao.id}?type=drawer`, handlerCloseEdit)
            }
            className="flex items-center gap-2 border border-primary-600 text-primary-600 px-2 h-10 rounded-lg"
          >
            <MdEdit /> Editar
          </button>
        </div>
      </div>
      <TabsQuestao questao={questao} />
    </div>
  );
}
