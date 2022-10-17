import { Questao } from "@app/interfaces/Questao"
import Api from "@app/libs/Api"
import { useModal } from "@app/providers/modal"
import { Button, Icon, Spinner } from "@vechaiui/react"
import { AxiosResponse } from "axios"
import { useFormik } from "formik"
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"
import { MdCheck, MdClearAll, MdContentPaste, MdFileUpload } from "react-icons/md"
import { useMutation } from "react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type QuestaoItem = Questao & {
    loading?: boolean,
    done?: boolean
}


export default function FormImportQuestoes() {
    const { setOptions } = useModal()
    const { aula_id = '' } = useParams()

    const { handleSubmit, handleChange, values, setValues, setFieldValue } 
        = useFormik<{texto: string, questoes: QuestaoItem[]}>({
        initialValues: {
            texto: "",
            questoes: []
        },
        onSubmit: () => {
            mutation.mutate(values);
        },
    });


    const mutation = useMutation(async ({ texto }: any) => {
        const data = new Blob([texto], { type: "text/plain" });
        const file = new File([data], "texto");

        const formData = new FormData();

        formData.append("file", file);
        formData.append("aula_id", aula_id);

        const { data: _data } = await Api.post(`questoes/prepare`, formData);

        if (_data?.error) {
            toast.error(_data?.message || 'Arquivo Inválido')
        } else {
            setValues({ texto: "", questoes: [...values.questoes, ..._data] as [] });
        }
    });


    const inputFileRef = useRef<HTMLInputElement>(null);
    function handleChangeFile(ev: ChangeEvent<HTMLInputElement>) {
        const files = ev.target.files;
        const read = new FileReader();

        read.onload = () => {
            setFieldValue('texto', `${read.result}`);
        };

        if (files && files.length > 0) {
            read.readAsText(files[0]);
        }
    }

    async function sendAll() {
        for await (let questao of values.questoes) {
            await sendQuestao(values.questoes.indexOf(questao));
        }
    }

    async function sendQuestao(questao_index: number) {

        setQuestionLoading(questao_index)
        
        await new Promise((a) => setTimeout(a, 500))

        setQuestionLoading(-1)
        addQuestionDone(questao_index)
        
    }

    function setQuestionLoading(index: number) {
        setFieldValue('questoes', values.questoes.map((q, i) => {
            if(i === index) {
                q.loading = true
                q.done = false
            } else {
                q.loading = false
            }
            return q
        }))
    }

    function addQuestionDone(index: number) {
        setFieldValue('questoes', values.questoes.map((q, i) => {
            if(i === index) {
                q.done = true
            } 
            return q
        }))
    }

    const countDone = useMemo(() => {
        return values.questoes.filter(({done}) => done).length
    }, [values.questoes])

    const countQuestoes = useMemo(() => {
        return values.questoes.length
    }, [values.questoes])

    useEffect(() => {
        setOptions({ size: 'w-3/4' })
    }, [])


    return <div className="relative h-screen overflow-y-hidden">
        <div className="absolute flex items-center text-white top-0 right-0 left-0 h-14 bg-header-bg">
            Aula: {aula_id}
        </div>
        <form onSubmit={handleSubmit} className="flex p-4 flex-col absolute top-14 left-0 right-0 h-40">
            <input ref={inputFileRef} onChange={handleChangeFile} type="file" className="hidden" name="" id="" />
            <div className="flex flex-1">
                <textarea value={values.texto} onChange={handleChange} name="texto" placeholder="Dados das questões aqui"
                    className="focus:outline-none flex-1 resize-none w-full"></textarea>
            </div>
            <div className="flex gap-4 p4">
                <Button type="button" leftIcon={<Icon as={MdFileUpload} label="file" />}
                    variant="solid"
                    onClick={() => inputFileRef.current?.click()}>De arquivo</Button>

                <div className="ml-auto"></div>
                <Button loading={mutation.isLoading}
                    loadingText="Enviando..." type="submit" disabled={values.texto === ''}
                    leftIcon={<Icon as={MdCheck} label="file" />}
                    variant="solid">Preparar</Button>
            </div>
        </form>
        <div className="absolute overflow-y-scroll top-52 left-0 right-0 bottom-14 flex">
            <table className="w-full text-sm">
                <tbody className="divide-y">
                    {values.questoes.map((questao, index) => (
                        <tr>
                            <td className="px-4 py-2">
                                <img className="min-h-[1rem] min-w-[1rem] w-[1rem] h-[rem] rounded-full" src={questao.banca.image_url} alt="" />
                            </td>                            <td className="px-4 py-2">
                                <div className="line-clamp-4">
                                    <b>{questao.header}</b> <br />
                                    <div className="line-clamp-2">
                                        {questao.texto}
                                    </div>
                                    <div>
                                        <span className="font-bold">Gabarito: {questao.gabarito}</span> {` `}
                                        <span className="font-bold">Alternativas: {questao.alternativas.length}</span>
                                    </div>
                                </div>
                            </td >
                            <td className="px-4 py-2">
                                <div>
                                    {questao?.loading && <Spinner className="text-primary-600" />}
                                    {questao?.done && <MdCheck color="green" />}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="absolute flex items-center h-14 border-t left-0 right-0 bottom-0 p-4">
            <Button onClick={() => setFieldValue('questoes', [])} disabled={values.questoes.length === 0}
                leftIcon={<Icon as={MdClearAll} label="file" />}
                variant="solid">Limpar</Button>
            <div className="ml-auto"></div>
            <Button onClick={() => sendAll()} 
                loadingText={`${countDone} de ${countQuestoes} ${(countDone/countQuestoes*100).toFixed(1)}%`}
                loading={values.questoes.filter(q => q.loading).length > 0}
                disabled={values.questoes.length === 0} leftIcon={<Icon as={MdCheck} label="file" />}
                variant="solid">Enviar Selecionadas</Button>
        </div>
    </div>
}