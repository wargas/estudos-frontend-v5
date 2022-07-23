import { CircleNotch, IconProps } from "phosphor-react";

type Props = {} & IconProps

export default function Loading(props:Props) {
    return <CircleNotch className="animate-spin" {...props} />
}