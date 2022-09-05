import { eachMonthOfInterval, format } from "date-fns"
import { useLocation } from "react-router-dom"
import { useModal } from "../../providers/modal"

export default function FormDisciplina() {
    const { closeModal } = useModal()
    const location = useLocation()
    return <div className="p-5">

        {eachMonthOfInterval({
            start: new Date(2019, 0, 1),
            end: new Date()
        }).map(month => (
            <p key={month.getMonth()}>{format(month, "MM/yyyy")}</p>
        ))}

        <hr />
        <button onClick={() => closeModal({ name: 'wargas' })}>Fechar</button>
    </div>
}