import { Dialog } from "@headlessui/react";
import { createContext, useContext, useState } from "react";
import { matchRoutes, renderMatches, useLocation, useMatch, useNavigate } from "react-router-dom";
import routes from "../../ModalRoutes";

type callback = (data: any) => void
type Options = {
  size?: 'w-96' | 'w-1/4' | 'w-1/2' | 'w-3/4' | 'w-full' 
}

type contextProps = {
  open: (path: string, callback?: callback) => void;
  close: (data: any) => void
  setOptions: (opt: Options) => void
};

export const ModalContext = createContext<contextProps>({} as contextProps);

export function ModalProvider({ children }: any) {

  const [options, setOptions] = useState<Options>({size: 'w-96'})

  const { hash, pathname, search } = useLocation()
  const navigate = useNavigate()

  const matches = matchRoutes(
    routes,
    atob(hash.replace('#', ''))
  )

  const [callback, setCallback] = useState<callback>();

  function updateOptions(opt: Options) {
    setOptions({...options, ...opt})
  }

  function open(path: string, cb?: callback) {
    const _path = btoa(path)
    navigate(`${pathname}${search}#${_path}`)
    if(cb) {
      setCallback(() => cb)
    }
  }

  function close(data: any) {
    navigate(`${pathname}${search}`)
    if (callback) {
      
      callback(data)
    }
    setOptions({size: 'w-96'})
  }

  const opened = !!matches && matches?.length > 0

  const sizeClasses = options.size

  return (
    <ModalContext.Provider value={{ open, close, setOptions: updateOptions }}>

      {children}
      <>
        <div
          onClick={() => close(null)}
          className={`${opened ? 'block': 'hidden'} fixed z-50 inset-0 bg-black/30 cursor-pointer`}
          aria-hidden="true" 
        />
        <div className={`${opened ? `${sizeClasses} right-0` : '-right-96 w-96'}  z-50 duration-300 transition-all absolute  top-0 bottom-0 bg-white`}>
          {renderMatches(matches)}
        </div>
      </>
    </ModalContext.Provider>
  );
}

export function useModal()  {
  const ctx = useContext(ModalContext);

  function openModal(path: string, cb?: callback) {
    ctx?.open(path, cb)
  }

  function closeModal(data: any = null) {
    ctx.close(data)
  }

  return { openModal, closeModal, setOptions: ctx.setOptions }
}
