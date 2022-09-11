
import React, { useMemo, useState, KeyboardEvent, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useOutletContext } from 'react-router-dom'
import MarkdownEditor from '../../../components/mardown-editor'
import Aula from '../../../interfaces/Aula'
import Api from '../../../libs/Api'


export default function ResumoPage() {

    const [value, setValue] = useState('Wargas')

    

    const {aula} = useOutletContext<{aula: Aula}>()

    const { data: dataResumo } = useQuery(['notion-html', aula?.id], async() => {
        const {data } = await Api.get(`notion/${aula?.notion_id}`)

        return data
    }, {
        enabled: !!aula?.notion_id
    })


    return <div className='bg-white h-screen p-5 shadow rounded'>
                
        <div dangerouslySetInnerHTML={{__html: dataResumo?.html}}></div>

       <MarkdownEditor value={value} onChange={setValue} />

        <code>
            {value}
        </code>

    </div>
}