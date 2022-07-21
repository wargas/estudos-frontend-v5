import { CheckCircle, Spinner, SpinnerGap } from "phosphor-react";
import React, { useState } from "react";
import { useMutation } from "react-query";
import Api from "../../../libs/Api";

type Props = {
  questoes: any[];
};

function Importar({ questoes }: Props) {
  const [loadingList, setLoadingList] = useState<number[]>([]);
  const [doneList, setDoneList] = useState<number[]>([]);

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
    setLoadingList((old) => [...old, questoes.indexOf(questao)]);
    try {
      const { data } = await Api.post(`aulas/${questao.aula_id}/questoes`, {
        enunciado: questao.enunciado,
        alternativas: questao.alternativas.map((alt: any) => alt.conteudo),
        gabarito: questao.gabarito,
        modalidade: questao.modalidade,
      });
    } catch (error) {}
    setDoneList(old => [...old, questoes.indexOf(questao)])
    setLoadingList([]);
  }

  return (
    <div>
      <div className="p-5 border-b flex justify-between">
        <div>{questoes.length} questões &bull; {(doneList.length / questoes.length * 100).toFixed(2)}% concluído</div>
        <div>
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
              <td>
                <div>
                  {loadingList.includes(index) && (
                    <SpinnerGap className="animate-spin" />
                  )}
                  {doneList.includes(index) && (
                    <CheckCircle className="text-green-600" />
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
