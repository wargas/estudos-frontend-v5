import { Outlet, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { useModal } from "../../providers/modal";

export default function ModalComponent() {
  const location = useLocation();
  const { closeModal } = useModal()

  return (
    <Dialog
      open={location.pathname !== "/"}
      onClose={() => {}}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div
            onClick={() => closeModal(null)}
          className="fixed inset-0 bg-black/30 cursor-pointer"
          aria-hidden="true"
        />
        <Dialog.Panel className="bg-white border z-50 w-full max-w-screen-md shadow-xl rounded-lg">
          <Outlet />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
