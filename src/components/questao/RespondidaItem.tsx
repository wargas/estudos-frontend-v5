import { Calendar, X, SpinnerGap } from 'phosphor-react'
import { useMutation, useQueryClient } from 'react-query';
import Api from '../../libs/Api';

type Props = {
  respondida: any;
};

export default function RespondidaItem({ respondida }: Props) {

    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await Api.delete(`questoes/${respondida.questao_id}/respondidas/${respondida.id}`)

        return data;
    }, {
        onSuccess: () => {
            queryClient.refetchQueries('respondidas')
        }
    })

  return (
    <div className="p-5 py-3 flex even:bg-gray-50">
      <div className='flex-1'>
        <p className='flex items-center gap-2'><Calendar />  {new Date(respondida.horario).toLocaleDateString()}</p>
        <p className="text-base">
        Gabarito: {respondida.resposta} &bull; Resposta: {respondida.resposta}
        </p>
      </div>
      <div>
        <button onClick={() => mutate()}>
           {isLoading ? <SpinnerGap className='animate-spin' /> : <X />}
        </button>
      </div>
    </div>
  );
}
