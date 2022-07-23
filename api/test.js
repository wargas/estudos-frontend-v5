export default async function(req, res) {
    const response = fetch('https://dool.egba.ba.gov.br/apifront/portal/edicoes/ultimas_edicoes.json')

    const json = await response.json()
    res.send(json)
}