import { HTMLAttributes } from 'react'
import { VscLoading } from "react-icons/vsc";

type Props = {
    show: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function PageLoading({ show, className, ...props }: Props) {

    if (!show)
        return null;

    return <div className={`absolute flex z-40 items-center justify-center bg-white inset-0 opacity-90 ${className}`} {...props}>
        <div>
            <VscLoading className="animate-spin text-4xl" />
        </div>
    </div>
}