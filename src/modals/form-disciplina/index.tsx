import { useParams } from "react-router-dom"
import { useModal } from "@app/providers/modal"
import { useFormik } from "formik"
import Input from "@app/components/input"
import { Button } from "@vechaiui/react"
import { useMutation, useQuery } from "react-query"
import Api from "@app/libs/Api"
import { toast } from "react-toastify"

export default function FormDisciplina(...args: any[]) {
    const { closeModal } = useModal()

    const params = useParams()

    const mutation = useMutation(async (values:any) => {
        try {
            const { data} = await Api.post('disciplinas', values)

            closeModal(data)

            toast.success('Disciplina Salva!');
        } catch (error) {

            toast.error('Erro ao cadastrar')
        }


    })

    const { getFieldProps, values, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            arquivada: 0
        },
        onSubmit: (_values) => mutation.mutate(_values)
    })

    return <div className="p-5">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="">Nome</label>
                <Input placeholder="Nome" type="text" {...getFieldProps('name')} />
            </div>
            {/* <div className="flex flex-col">
                <label htmlFor="">Arquivada</label>
                <select placeholder="Nome" className="form-select rounded" {...getFieldProps('arquivada')}>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>
            </div> */}

            

            <Button type="submit" className="py-5"  variant="solid" >Enviar</Button>
        </form>

        
    </div>
}