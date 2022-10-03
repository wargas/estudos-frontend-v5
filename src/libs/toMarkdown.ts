import { Questao } from "@app/interfaces/Questao";

export default function toMarkdown(questoes: Questao[]): string {
    const conteudos = questoes?.map((questao, index) => {
        const alternativas = questao
            .alternativas.map(alt => `a) ${alt.conteudo
                .replace(/^\n/g, "")
                .replace(/\n$/g, "")}`).join('\n')

        let resolucao = `\n`
        if (questao.resolucao) {
            resolucao = `\n---\n${questao.resolucao.replace(/^\n/g, "")
                .replace(/\n$/g, "")}\n---\n`.replace(/\n\n/g, '\n')
        }


        return `${index + 1}. ${questao.enunciado.replace(/^\n/g, "")
            .replace(/\n$/g, "")}\n${alternativas}${resolucao}`
    }).join('') || ''

    const header = questoes?.map((questao) => {
        return questao.id
    }).join(',')

    const gabaritos = questoes?.map((questao, index) => {
        return `${index + 1}. ${questao.gabarito}`
    }).join('\n')

    const text = `[UPDATE]${header}\n${conteudos}\nGABARITO\n${gabaritos}`

    return text;
}