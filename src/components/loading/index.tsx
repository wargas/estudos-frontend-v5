import { CircleNotch, IconProps } from "phosphor-react";
import BeatLoader from 'react-spinners/BeatLoader'

type Props = {} & IconProps

export default function Loading(props:Props) {
    return <BeatLoader />
}