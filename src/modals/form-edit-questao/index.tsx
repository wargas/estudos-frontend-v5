import { useLocation } from "react-router-dom"
import { useModal } from "../../providers/modal"

export default function FormEditQuestao() {

    const location = useLocation()
    const { closeModal} = useModal()

    return <div className="p-5">
        editar questao

        <hr />
        <button onClick={closeModal}>
            Fechar
        </button>
    </div>
}