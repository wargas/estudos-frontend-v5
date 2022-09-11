import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { lineNumbers, EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

type Props = {
  value: string,
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: Props) {
  
  return (
    <CodeMirror
      extensions={[
        lineNumbers(),
        EditorView.lineWrapping,
        EditorState.allowMultipleSelections.of(true),
        markdown({ base: markdownLanguage })
      ]}
      value={value}
      onChange={onChange} />
  )
}
