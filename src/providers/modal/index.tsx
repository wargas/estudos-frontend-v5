import { createContext, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import ModalComponent from "../../components/modal";
import ModalRoutes from "../../ModalRoutes";

type callback = (data:any) => void

type contextProps = {
  setLocation: (path: string) => void;
  open: (path: string, callback?: callback) => void;
  close: (data: any) => void
};

export const ModalContext = createContext<contextProps>({} as contextProps);

export function ModalProvider({ children }: any) {
  const [location, setLocation] = useState("/");
  const [callback, setCallback] = useState<callback>()

  function open(path:string, cb: callback = ({}) => {}){
    setLocation(path)
    setCallback(() => cb)
  }

  function close(data:any) {
    setLocation('/')
    if(callback) {
      callback(data)
    }
  }

  return (
    <ModalContext.Provider value={{ setLocation, open, close }}>
      {children}
      <StaticRouter location={location}>
        <ModalRoutes />
      </StaticRouter>
    </ModalContext.Provider>
  );
}

export function useModal(): { openModal: (path:string, cb: callback) => void, closeModal: (data?:any) => void} {
  const ctx = useContext(ModalContext);

  function openModal(path: string, cb?: callback) {
    console.log(path)
    ctx.open(path, cb)
  }

  function closeModal(data:any = null) {
    ctx.close(data)
  }
  
  return { openModal, closeModal }
}
