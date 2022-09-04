
import React, { useMemo, useState, KeyboardEvent, useRef, useEffect } from 'react'
import ReactQuill, {Quill} from 'react-quill'
// import 'react-quill/dist/quill.snow.css';

export default function ResumoPage() {

    const [value, setValue] = useState('<p>wargas</p>')
    const refEditor = useRef() as React.LegacyRef<ReactQuill>
    
    useEffect(() => {
        if(refEditor) {
            
        }
    }, [refEditor])
    
    return <div className='bg-white p-5 shadow rounded'>
        <h1 className='text-2xl font-bold'>Resumo</h1>
        <div>
            <ReactQuill ref={refEditor} modules={{toolbar: false}} theme='snow' value={value} onChange={setValue} />
        </div>

        <div>
            {value}
        </div>
    </div>
}