import { Outlet, useLocation } from "react-router-dom";
import { useModal } from "@app/providers/modal";

export default function Drawer() {

    const { pathname, search } = useLocation();
    const { closeModal } = useModal();

    return (
        <>
            <div onClick={() => closeModal(null)} className="inset-0 absolute z-50 bg-black/30 cursor-pointer">

            </div>
            <div className={`${pathname === '/' ? '-right-40' : 'right-0'} transition-all z-50 overflow-y-auto absolute w-96 shadow top-0 bottom-0 bg-white`}>
                <Outlet />
            </div>
        </>
    )
}