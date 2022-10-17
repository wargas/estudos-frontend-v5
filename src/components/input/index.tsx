import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<any> {

}

export default function Input(props: Props) {

    return <input {...props} className={`form-input rounded ${props?.className}`} />
}