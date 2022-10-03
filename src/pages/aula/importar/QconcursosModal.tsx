import { SpinnerGap } from "phosphor-react"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import Api from "@app/libs/Api"

export default function QconcursosModal() {

    const [query, setQuery] = useState('')
    const [page, setPage] = useState()
    const [count, setCount] = useState(0)
    const [questions, setQuestions] = useState<any>([])
    
    const { mutate: mutateCount, isLoading: loadingCount } = useMutation(async () => {
        const { data } = await Api.post<{total: number}>(`qconcursos/count`, {query})

        setCount(data.total)
    }) 

    
    const { mutate: mutatePage } = useMutation(async (page:number) => {
        if(questions.length < count) {
            setQuestions([...questions, ...Array(5).fill("")])
        }
    })
    
    async function loadQuestions() {
        let _page = 1;
        let _questions = [];
        
        while(_questions.length < count) {
            const { data: _data} = await Api.post(`qconcursos/list`, {
                query, page: _page
            })

            _page ++

            _questions.push(..._data)
        } 
        
        setQuestions(_questions)

    }
    
    return <div className="flex flex-col gap-4">
        <div className="px-4 py-4 border-b">
            <h1>Importar do Qconcursos</h1>
        </div>
        <div className="flex px-4">
            <input type="text" name="" 
                value={query}
                onChange={ev => setQuery(ev.target.value)}
                className="w-full border h-12 rounded-l px-4 focus:outline-none"
                placeholder="discipline_ids[]=18&discipline_ids[]=40&examining_board_ids[]=63" />

            <button disabled={query.length === 0 || loadingCount} 
                onClick={() => mutateCount()}
                className="bg-primary-600 w-24 flex justify-center items-center disabled:opacity-70 text-white px-5 rounded-r">
                    {loadingCount ? <SpinnerGap className="animate-spin" /> : <span>Buscar</span>}
                </button>
        </div>
        <div className="px-4 pb-4">
            <div className="bg-gray-100 h-5 rounded-full"></div>
            <div className="text-gray-400 text-sm">{questions.length}/{count} Questões</div>
        </div>
        <div className="px-4 pb-4 flex justify-between">
            <button 
                onClick={() => loadQuestions()}
                className="bg-primary-600 text-white px-4 h-10 rounded">Iniciar</button>
            <button className="bg-primary-600 text-white px-4 h-10 rounded">Ok</button>
        </div>
    </div>
}