
import { createElement, useRef, useState, MutableRefObject } from 'react';
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Questao } from '../../../interfaces/Questao'
import Api from '../../../libs/Api'
import { Transition } from '@headlessui/react'
import { useModal } from '../../../providers/modal';


export default function ResumoPage() {
    const params = useParams();
    const navigate = useNavigate()

    const refLink = useRef() as MutableRefObject<HTMLAnchorElement>

    const { data: dataQuestoes } = useQuery(['questoes', params.aula_id], async () => {
        const { data } = await Api.get<Questao[]>(`aulas/${params.aula_id}/questoes`)

        return data
    })

    function handlerDownload() {
        if (refLink.current) {

            const conteudos = dataQuestoes?.map((questao, index) => {
                const alternativas = questao
                    .alternativas.map(alt => `a) ${alt.conteudo
                        .replace(/^\n/g, "")
                        .replace(/\n$/g, "")}`).join('\n')

                let resolucao = `\n`
                if (questao.resolucao) {
                    resolucao = `\n---\n${questao.resolucao.replace(/^\n/g, "")
                        .replace(/\n$/g, "")}\n---\n`.replace(/\n\n/g, '\n')
                }


                return `${index + 1}. ${questao.enunciado.replace(/^\n/g, "")
                    .replace(/\n$/g, "")}\n${alternativas}${resolucao}`
            }).join('') || ''

            const header = dataQuestoes?.map((questao) => {
                return questao.id
            }).join(',')

            const gabaritos = dataQuestoes?.map((questao, index) => {
                return `${index + 1}. ${questao.gabarito}`
            }).join('\n')

            const text = `[UPDATE]${header}\n${conteudos}\nGABARITO\n${gabaritos}`

            const data = new Blob([text], { type: 'text/x-markdown' })

            refLink.current.href = URL.createObjectURL(data)

            refLink.current.click()
        }
    }


    return <div className='flex flex-col divide-y divide-gray-100 pb-10'>
        <div className='flex gap-4 justify-end mb-4'>
            <button
                className='border text-primary-600 border-primary-600 px-4 rounded-full bg-white'
                onClick={handlerDownload}>Exportar</button>
            <button
                className='border text-primary-600 border-primary-600 px-4 rounded-full bg-white'
                onClick={() => navigate('importar')}>Importar</button>
        </div>
        <a href="" download="aula.md" ref={refLink} className='d-none'></a>
        {dataQuestoes?.map(questao => <QuestaoItem questao={questao} />)}
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
            <div className='gap-2 flex flex-col'>
                {questao.alternativas.map(alternativa => (
                    <div key={alternativa.letra} className='flex gap-4'>
                        <div className='flex'>
                            {alternativa.letra}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: alternativa.html }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}