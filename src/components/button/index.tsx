import { ButtonHTMLAttributes } from "react"
import Loading from "@app/components/loading"

type Props = {
    children?: any
    isLoading?: boolean
}

export default function Button({ children, isLoading, disabled, className, ...rest }: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button
        disabled={isLoading || disabled}
        className={`${className} disabled:opacity-80 w-full flex items-center justify-center gap-4 bg-primary-600 uppercase font-bold text-white h-10 rounded hover:bg-primary-700`}
        {...rest}>
        {isLoading ? <Loading /> : children } 
    </button>
}