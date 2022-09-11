export interface Questao {
    id: number
    modalidade: string
    enunciado: string
    gabarito: string
    resolucao: string
    resolucaoHtml: string
    aula_id: number
    alternativas: Alternativa[]
    created_at: string
    updated_at: string
    respondidas: any[]
    enunciadoHtml: string
    banca: Banca
    texto: string
    header: string
  }
  
  export interface Alternativa {
    conteudo: string
    html: string
    letra: string
    correta: boolean
  }
  
  export interface Banca {
    name: string
    image_url: string
  }
  