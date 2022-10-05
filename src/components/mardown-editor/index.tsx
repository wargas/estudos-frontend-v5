import CodeMirror, { useCodeMirror } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { lineNumbers, EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { useRef, MutableRefObject, useEffect, ClipboardEvent } from 'react'
import axios from 'axios'

type Props = {
  value: string,
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: Props) {

  const editor = useRef() as MutableRefObject<any>
  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions: [
      lineNumbers(),
      EditorView.lineWrapping,
      EditorState.allowMultipleSelections.of(true),
      markdown({ base: markdownLanguage })
    ],
    value,
    onChange: (val, viewUpdate) => {
      onChange(val)
    }
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [setContainer])

  async function handlePaste(ev: ClipboardEvent<HTMLDivElement>) {

    const [file] = ev.clipboardData.files;

    if (file) {
      const formData = new FormData();
      const name = `${file.lastModified}-${file.name}`;
      formData.append('image', file);
      formData.append('name', name);

      const { data } = await axios.post<any>(
        `https://api.imgbb.com/1/upload?key=aced9d5e1cfb36cb296778c77d07aa06`,
        formData
      );

      const imgTag = `![${data.data.title}](${data.data.url})`

      const from = view?.state.selection.ranges[0].from || 0;

      view?.dispatch({
        changes: {
          from,
          insert: imgTag
        }
      })

    }




  }


  return (
    <>
      {/* <button type='button' onClick={addImage}>Click</button> */}

      <div onPaste={handlePaste} ref={editor}></div>
    </>
  )
}
