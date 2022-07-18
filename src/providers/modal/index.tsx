import { createContext, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import ModalComponent from "../../components/modal";
import ModalRoutes from "../../ModalRoutes";

type contextProps = {
  setLocation: (path: string) => void;
};

export const ModalContext = createContext<contextProps>({} as contextProps);

export function ModalProvider({ children }: any) {
  const [location, setLocation] = useState("/");

  return (
    <ModalContext.Provider value={{ setLocation }}>
      {children}
      <StaticRouter location={location}>
        <ModalRoutes />
      </StaticRouter>
    </ModalContext.Provider>
  );
}

export function useModal(): { openModal: (path:string) => void, closeModal: () => void} {
  const ctx = useContext(ModalContext);

  function openModal(path: string) {
    ctx.setLocation(path)
  }

  function closeModal() {
    ctx.setLocation('/')
  }
  
  return { openModal, closeModal }
}
