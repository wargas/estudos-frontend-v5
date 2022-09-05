import { useLocation } from "react-router-dom"
import { useModal } from "../../providers/modal"

export default function FormDisciplina () {
    const { closeModal } = useModal()
    const location = useLocation()
    return <div className="p-5">
        <h1>Add disciplina</h1>
        <p>{location.pathname}</p>
        <button onClick={() => closeModal({name: 'wargas'})}>Fechar</button>
    </div>
}