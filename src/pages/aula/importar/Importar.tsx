import { CheckCircle, Spinner, SpinnerGap, WarningCircle } from "phosphor-react";
import React, { useState } from "react";
import { useMutation } from "react-query";
import Api from "../../../libs/Api";

type Props = {
  questoes: any[];
  onClear: () => void
};

function Importar({ questoes, onClear }: Props) {
  const [loadingList, setLoadingList] = useState<number[]>([]);
  const [doneList, setDoneList] = useState<number[]>([]);
  const [errorList, setErrorList] = useState<number[]>([]);

  async function sendAll() {
    setDoneList([])
    for await (let questao of questoes) {
      await mutation.mutateAsync(questao);
    }
  }

  const mutation = useMutation(async (questao) => {
    await insertQuestao(questao);
  });

  async function insertQuestao(questao: any) {
    const index = questoes.indexOf(questao)
    setLoadingList((old) => [...old, index]);
    try {

      const url = questao?.id ? `aulas/${questao.aula_id}/questoes/${questao?.id}` : `aulas/${questao.aula_id}/questoes`
      const method = questao?.id ? 'put' : 'post'
      
      const { data, status } = await Api[method](url, {
        enunciado: questao.enunciado,
        alternativas: questao.alternativas.map((alt: any) => alt.conteudo),
        gabarito: questao.gabarito,
        modalidade: questao.modalidade,
        comentario: questao.comentario,
        resolucao: questao.resolucao
      });

      if(status === 200) {
        setDoneList(old => [...old, index])
      } else {
        setErrorList(old => [...old, index])
      }
    } catch(error) {}
    setLoadingList([]);
  }

  return (
    <div>
      <div className="p-5 border-b flex justify-between">
        <div>{questoes.length} questões &bull; {(doneList.length / questoes.length * 100).toFixed(2)}% concluído</div>
        <div className="flex gap-4">
          <button onClick={onClear} className="font-bold text-stone-600 uppercase">
            Limpar
          </button>
          <button
            onClick={sendAll}
            className="font-bold text-primary-600 uppercase"
          >
            Enviar todas
          </button>
        </div>
      </div>
      <table className="w-full max-w-full">
        <thead className="">
          <tr className="border-b h-10">
            <th className="text-left uppercase">Header</th>
            <th className="text-left uppercase">Enunciado</th>
            <th className="text-left uppercase">Alternativas</th>
            <th className="text-left uppercase">Gabarito</th>
            <th className="text-left uppercase">Resolucao</th>
            <th className="text-left uppercase"></th>
          </tr>
        </thead>
        <tbody className="">
          {questoes.map((questao: any, index: number) => (
            <tr className="odd:bg-gray-50 text-base h-10" key={index}>
              <td className="px-3 max-w-[96]">
                <p className="truncate text-ellipsis overflow-hidden">
                  {String(questao.header).substring(0, 30)}
                </p>
              </td>
              <td className="px-3">
                <p className="truncate text-ellipsis overflow-hidden">
                  {String(questao.texto).substring(0, 50)}
                </p>
              </td>
              <td className="px-3">{questao.alternativas.length}</td>
              <td className="px-3">{questao.gabarito}</td>
              <td className="px-3">{String(questao.resolucao).substring(0, 50)}</td>
              <td>
                <div>
                  {loadingList.includes(index) && (
                    <SpinnerGap className="animate-spin" />
                  )}
                  {doneList.includes(index) && (
                    <CheckCircle className="text-green-600" />
                  )}
                  {errorList.includes(index) && (
                    <WarningCircle className="text-red-600" />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Importar;
