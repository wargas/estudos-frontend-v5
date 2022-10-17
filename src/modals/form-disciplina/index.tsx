import { useParams } from "react-router-dom"
import { useModal } from "@app/providers/modal"
import { useFormik } from "formik"
import Input from "@app/components/input"
import { Button } from "@vechaiui/react"

export default function FormDisciplina(...args: any[]) {
    const { closeModal } = useModal()

    const params = useParams()

    const { getFieldProps, values } = useFormik({
        initialValues: {
            name: 'wargas',
            arquivada: '2'
        },
        onSubmit: () => { }
    })

    return <div className="p-5">

        <form className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="">Nome</label>
                <Input placeholder="Nome" type="text" {...getFieldProps('name')} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Arquivada</label>
                <select placeholder="Nome" className="form-select rounded" {...getFieldProps('arquivada')}>
                    <option value="1">Sim</option>
                    <option value="2">Não</option>
                </select>
            </div>

            

            <Button onClick={() => closeModal({ name: 'wargas' })} className="py-5"  variant="solid" >Enviar</Button>
        </form>

    </div>
}