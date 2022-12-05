import { ButtonHTMLAttributes, ComponentProps } from "react"
import Loading from "@app/components/loading"

type Props = {
    children?: any
    isLoading?: boolean
} & ComponentProps<"button">

export default function Button({ children, isLoading, disabled, className, ...rest }: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button
        disabled={isLoading || disabled}
        className={`${className} disabled:opacity-80 w-full flex items-center px-4 justify-center gap-4 bg-primary-600 text-white h-10 rounded-lg hover:bg-primary-700`}
        {...rest}>
        {isLoading ? <Loading /> : children } 
    </button>
}