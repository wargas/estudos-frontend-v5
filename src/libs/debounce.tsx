import { useEffect, useState } from "react";

export default function useDebounce<T = any>(_value: T, duration: number = 500) {
    const [value, setValue] = useState<T>()

    useEffect(() => {

        const timeout = setTimeout(() => {
            setValue(_value)
        }, duration)

        return () => {
            if(timeout) {
                clearTimeout(timeout)
            }
        }

    }, [_value])

    return value;
}