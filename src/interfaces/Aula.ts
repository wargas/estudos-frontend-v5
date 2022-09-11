export default interface Aula {
    "id": number
    "name": string
    "ordem": number
    "user_id": number
    "concurso_id": number
    "disciplina_id": number
    "notion_id": string
    "meta": {
        "total_questoes": number
        "last_registro": string
        "total_registro": number
        "last_caderno_id": number
        "last_caderno_total": number
        "last_caderno_acertos": number
        "last_nota": number
    }
}
