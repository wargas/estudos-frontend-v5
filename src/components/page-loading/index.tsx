import { MdDownloading } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

type Props = {
    show: boolean
}

export default function PageLoading({show}: Props) {

    if(!show)
        return null;

    return <div className="absolute flex z-50 items-center justify-center bg-white rounded-lg inset-0 opacity-90">
        <div>
            <VscLoading className="animate-spin text-4xl" />
        </div>
    </div>
}