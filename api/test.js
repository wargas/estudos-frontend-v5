const axios = require('axios')

export default async function(req, res) {
    const {data} = await axios.get('https://dool.egba.ba.gov.br/apifront/portal/edicoes/ultimas_edicoes.json')
    res.send(data)
}