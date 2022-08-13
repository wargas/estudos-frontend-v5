import { useQuery } from "react-query"
import { useLocation, useParams } from "react-router-dom"
import Api from "../../libs/Api"
import { useModal } from "../../providers/modal"
import PageLoading from "../page-loading"

export default function ListQUestoes() {

    const { caderno_id } = useParams()
    

    const queryCaderno = useQuery(['cadernos', caderno_id], async () => {
        const { data } = await Api.get(`cadernos/${caderno_id}`)

        return data;
    })

    const { data: dataQuestoes, isFetching: isLoadingQuestoes } = useQuery(['questoes', queryCaderno?.data?.aula_id], async ({ queryKey }) => {

        const { data } = await Api.get<any[]>(`aulas/${queryKey[1]}/questoes?withRespondidas=true`)

        return data;
    }, {
        enabled: !!queryCaderno?.data?.id
    })

    return <div>

        <PageLoading show={queryCaderno.isFetching || isLoadingQuestoes} />

        <div className="grid grid-cols-6 gap-3 p-4">
            {dataQuestoes && dataQuestoes.map((item, index) => (
                <Item key={item.id} questao={item} caderno_id={parseInt(caderno_id || '0')} index={index + 1} />
            ))}
        </div>

    </div>
}

type ItemProp = {
    questao: any, index: number, caderno_id: number
}

function Item({ questao, index, caderno_id }: ItemProp) {

    const {closeModal}  = useModal()

    const respondida = questao?.respondidas.find((r: any) => r.caderno_id === caderno_id)

    const bgClassName = respondida ? respondida.acertou ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-200'

    return <div onClick={() => closeModal(index)} className={`${bgClassName} rounded-lg cursor-pointer font-extrabold text-lg flex justify-center items-center text-white h-12`}>
        {index}
    </div>
}