
import { createElement, useRef, useState, MutableRefObject, useMemo } from 'react';
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Questao } from '../../../interfaces/Questao'
import Api from '../../../libs/Api'
import { Transition } from '@headlessui/react'
import { useModal } from '../../../providers/modal';
import { FaSearch } from 'react-icons/fa';
import toMarkdown from '../../../libs/toMarkdown';


export default function ResumoPage() {
    const params = useParams();
    const [filter, setFilter] = useState('')
    const navigate = useNavigate()

    const refLink = useRef() as MutableRefObject<HTMLAnchorElement>

    const { data: dataQuestoes } = useQuery(['questoes', params.aula_id], async () => {
        const { data } = await Api.get<Questao[]>(`aulas/${params.aula_id}/questoes`)

        return data
    })

    const filtreds = useMemo(() => {

        return dataQuestoes?.filter(q => {
            return JSON.stringify(q).toLocaleLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                .includes(filter.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
        }) || []

    }, [filter, dataQuestoes])

    function handlerDownload() {
        if (refLink.current) {

            const text = toMarkdown(filtreds)

            const data = new Blob([text], { type: 'text/x-markdown' })

            refLink.current.href = URL.createObjectURL(data)

            refLink.current.click()
        }
    }


    return <div className='flex flex-col divide-y divide-gray-100 pb-10'>
        <div className='flex items-center gap-4 justify-between mb-4'>
            <div className="flex flex-1 items-center gap-4">
                <div className='h-9 bg-white flex items-center w-full max-w-[30rem] px-4 rounded-full border'>
                    <input value={filter} onChange={(ev) => setFilter(ev.target.value)} placeholder='Filtrar questão...' type="text" className='flex-1 focus:outline-none' />

                    <span className='text-sm text-gray-400 mx-4'>
                        {filtreds.length}/{dataQuestoes?.length}
                    </span>
                    <span>
                        <FaSearch className='text-gray-400' />
                    </span>
                </div>
            </div>
            <div className='flex gap-4'>
                <button
                    className='border text-primary-600 border-primary-600 px-4 rounded-full bg-white'
                    onClick={handlerDownload}>Exportar</button>
                <button
                    className='border text-primary-600 border-primary-600 px-4 rounded-full bg-white'
                    onClick={() => navigate('importar')}>Importar</button>
            </div>
        </div>
        <a href="" download="aula.md" ref={refLink} className='d-none'></a>
        {filtreds.map(questao => <QuestaoItem questao={questao} />)}
    </div>
}


function QuestaoItem({ questao }: { questao: Questao }) {

    const { openModal } = useModal()

    return (
        <div className='bg-white group relative border p-4 last:rounded-b-lg first:rounded-t-lg cursor-pointer' key={questao.id}>
            <div className='absolute transition-opacity opacity-0 group-hover:opacity-100 right-4 top-4 border border-primary-600 text-primary-600 px-4 py-1 bg-white rounded-full text-sm'>
                <button onClick={() => openModal(`/form-questao/${questao.id}`, () => { })}>editar</button>
            </div>
            <div className='font-bold'>
                {questao.header}
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: questao.enunciadoHtml }}></div>
            </div>
            <div className='gap-2 mt-4 flex flex-col'>
                {questao.alternativas.map(alternativa => (
                    <div key={alternativa.letra} className='flex gap-4'>
                        <div className='flex'>
                            {alternativa.letra}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: alternativa.html }}></div>
                    </div>
                ))}
            </div>
            <div className='border text-gray-700 p-4 rounded-lg mt-4 max-h-24 overflow-y-auto'>
                <div dangerouslySetInnerHTML={{ __html: questao.resolucaoHtml }}></div>
            </div>
        </div>
    )
}