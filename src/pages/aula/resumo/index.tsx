import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { BaseEditor, createEditor, Editor } from 'slate'
import { useMemo, useState } from 'react'

export default function ResumoPage() {

    const [editor] = useState(() => withReact(createEditor() as ReactEditor))

    return <div className='bg-white p-5 shadow rounded'>
        <h1 className='text-2xl font-bold'>Resumo</h1>
        <Slate editor={editor} value={[]}>
            <Editable onKeyDown={() => {
            }} />
        </Slate>
    </div>
}