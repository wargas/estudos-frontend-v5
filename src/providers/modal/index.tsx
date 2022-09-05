import { Dialog } from "@headlessui/react";
import { createContext, useContext, useState } from "react";
import { matchRoutes, renderMatches, useLocation, useMatch, useNavigate } from "react-router-dom";
import routes from "../../ModalRoutes";



type callback = (data: any) => void

type contextProps = {
  open: (path: string, callback?: callback) => void;
  close: (data: any) => void
};

export const ModalContext = createContext<contextProps>({} as contextProps);

export function ModalProvider({ children }: any) {

  const { hash, pathname } = useLocation()
  const navigate = useNavigate()

  const matches = matchRoutes(
    routes,
    atob(hash.replace('#', ''))
  )

  const [callback, setCallback] = useState<callback>();

  function open(path: string, cb?: callback) {
    const _path = btoa(path)
    navigate(`${pathname}#${_path}`)
    if(cb) {
      setCallback(() => cb)
    }
  }

  function close(data: any) {
    navigate(pathname)
    if (callback) {
      
      callback(data)
    }

  }

  const opened = !!matches && matches?.length > 0

  return (
    <ModalContext.Provider value={{ open, close }}>

      {children}
      <>
        <div
          onClick={() => close(null)}
          className={`${opened ? 'block': 'hidden'} fixed z-50 inset-0 bg-black/30 cursor-pointer`}
          aria-hidden="true" 
        />
        <div className={`${opened ? 'right-0' : '-right-96'} z-50 transition-all absolute  top-0 bottom-0 bg-white w-96`}>
          {renderMatches(matches)}
        </div>
      </>
    </ModalContext.Provider>
  );
}

export function useModal(): { openModal: (path: string, cb?: callback) => void, closeModal: (data?: any) => void } {
  const ctx = useContext(ModalContext);

  function openModal(path: string, cb?: callback) {
    ctx?.open(path, cb)
  }

  function closeModal(data: any = null) {
    ctx.close(data)
  }

  return { openModal, closeModal }
}
