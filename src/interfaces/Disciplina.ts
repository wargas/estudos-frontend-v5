export interface Disciplina {
    id: number
    name: string
    user_id: number
    arquivada: number
    meta: {
        dia: string
        count_aulas: number
        count_questoes: number
        count_tempo: number
    }
}