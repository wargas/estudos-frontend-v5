import { useParams } from "react-router-dom"
import { useModal } from "@app/providers/modal"

export default function FormDisciplina(...args: any[]) {
    const { closeModal } = useModal()
    
    const params = useParams()
    return <div className="p-5">

        <p>
            {JSON.stringify(params, null, 2)}
        </p>
        
        <button onClick={() => closeModal({ name: 'wargas' })}>Fechar</button>
    </div>
}