import MarkdownEditor from "@app/components/mardown-editor";
import { useState } from "react";

export default function Testes() {
    const [value, setValue] = useState("")
    return (
        <div>

        <MarkdownEditor value={value} onChange={setValue} />

        <code>
            {value}
        </code>
        </div>
    )
}