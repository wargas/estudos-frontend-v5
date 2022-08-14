import { Menu } from "@headlessui/react"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { MdArrowDownward, MdArrowDropDown, MdMoreVert } from "react-icons/md"
import { useQuery } from "react-query"
import { useLocation, useParams } from "react-router-dom"
import Api from "../../libs/Api"
import { useModal } from "../../providers/modal"
import PageLoading from "../page-loading"


export default function ListQUestoes() {

    const { caderno_id: _initalCaderno, aula_id } = useParams()

    const [listCadernos, setListCardernos] = useState(false)
    const [caderno_id, setCadernoId] = useState(_initalCaderno)
    const [currentCaderno, setCurrentCaderno] = useState<any>()

    const { data: dataCadernos, isRefetching: isRefetchingCadernos, refetch: refetchCadernos } = useQuery(['cadernos', { aula_id }], async () => {

        const { data } = await Api.get<any[]>(`aulas/${aula_id}/cadernos`);

        setCurrentCaderno(data.find(c => c.id.toString() === caderno_id))

        return data;
    })

    const { data: dataQuestoes, isFetching: isLoadingQuestoes } = useQuery(['questoes', aula_id], async ({ queryKey }) => {

        const { data } = await Api.get<any[]>(`aulas/${queryKey[1]}/questoes?withRespondidas=true`)

        return data;
    })

    useEffect(() => {
        if (listCadernos) {
            refetchCadernos()
        }
    }, [listCadernos])

    return <div className="flex flex-col max-h-screen relative">

        <PageLoading show={isLoadingQuestoes} />

        <div onClick={() => setListCardernos(!listCadernos)} className="h-14 min-h-[56px] px-4 text-white flex bg-header-bg items-center justify-between cursor-pointer">
            <div className="">
                Caderno {currentCaderno?.fim ? DateTime.fromISO(currentCaderno.fim).toFormat('dd/MM/yyyy') : ''}
            </div>
            <div>
                <MdArrowDropDown />
            </div>
        </div>

        <div className={`${listCadernos ? 'max-h-full' : 'max-h-0 overflow-hidden'} top-14 shadow transition-all absolute left-0 right-0 bg-white`}>
            <PageLoading show={isRefetchingCadernos} />
            <div className="flex flex-col divide-y">
                {dataCadernos?.map(caderno => (
                    <div onClick={() => setCurrentCaderno(dataCadernos.find(c => c.id === caderno.id))} className="px-4 py-2 cursor-pointer" key={caderno.id}>
                        Caderno {DateTime.fromISO(caderno.fim).toFormat('dd/MM/yyyy')}
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-6 gap-3 p-4 flex-1 overflow-y-scroll">
            {dataQuestoes && dataQuestoes.map((item, index) => (
                <Item key={item.id} questao={item} caderno_id={currentCaderno?.id} index={index + 1} />
            ))}
        </div>

    </div>
}

type ItemProp = {
    questao: any, index: number, caderno_id: number
}

function Item({ questao, index, caderno_id }: ItemProp) {

    const { closeModal } = useModal()

    const respondida = questao?.respondidas.find((r: any) => r.caderno_id === caderno_id)

    const bgClassName = respondida ? respondida.acertou ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-200'

    return <div onClick={() => closeModal(index)} className={`${bgClassName} rounded-lg cursor-pointer font-extrabold text-lg flex justify-center items-center text-white h-12`}>
        {index}
    </div>
}