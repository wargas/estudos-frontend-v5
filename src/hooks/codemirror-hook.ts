import { useCallback, useEffect, useState } from "react";
import { EditorView, keymap, lineNumbers, ViewUpdate } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import {EditorState} from "@codemirror/state"
import { markdown } from "@codemirror/lang-markdown"


type onChangeText = (text: string) => void


export default function useCodemirror(inialValue: string, cb: onChangeText) {

    const [element, setElement] = useState<HTMLElement>()
    const [view, setView] = useState<EditorView>()

    const ref = useCallback((node: HTMLElement | null) => {
        if(!node) return;

        setElement(node)
    }, [])

    useEffect(() => {
        if(!element) return;

        const updaterListener = EditorView.updateListener.of((vu: ViewUpdate) => {
            if(vu.docChanged) {
                const doc = vu.state.doc

                cb(doc.toJSON().join('\n'))
            }
        })

        const _view = new EditorView({
            state: EditorState.create({
                doc: inialValue,
                extensions: [keymap.of(defaultKeymap), lineNumbers(), markdown(), updaterListener],
                
            }),
            parent: element,
        })

        setView(_view)

        return () => _view.destroy()

    }, [element])

    useEffect(() => {
        view?.dispatch({
            changes: {
                from: 0,
                insert: inialValue
            }
        })
    }, [inialValue])

    return {ref};
}