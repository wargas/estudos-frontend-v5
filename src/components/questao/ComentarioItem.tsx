import { FaTimes } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import Api from "../../libs/Api";

type Props = {
  comentario: any;
};

export default function ComentarioItem({ comentario }: Props) {

    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await Api.delete(`comentarios/${comentario.id}`)

        return data
    }, {
        onSuccess: () => {
            const queryKey = ['comentarios', comentario.questao_id]
            const data:any[]|undefined = queryClient.getQueryData(queryKey)

            queryClient.setQueryData(queryKey, () => {
                return data?.filter(item => item.id !== comentario.id)
            })
            
        }
    })

  return (
    <div key={comentario.id} className="group relative min-h-20">
      <div
        className="p-5 text-gray-700"
        dangerouslySetInnerHTML={{ __html: comentario.html }}
      ></div>
      <div>
      </div>
      <button onClick={() => mutate()} className="absolute opacity-0 group-hover:opacity-100 transition-all  text-gray-300 top-4 right-4 rounded-full w-8 h-8 flex items-center justify-center">
        {isLoading ? <VscLoading className="animate-spin" /> : <FaTimes />}
      </button>
    </div>
  );
}
