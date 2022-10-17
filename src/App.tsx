import AppRoutes from "@app/routes/app-routes";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { ToastContainer } from "react-toastify";

import { ModalProvider } from "@app/providers/modal";
import { VechaiProvider } from "@vechaiui/react";

import "react-toastify/dist/ReactToastify.css";
import '@tremor/react/dist/esm/tremor.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <VechaiProvider> 
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ModalProvider>
            <AppRoutes />
            <ToastContainer />
          </ModalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </VechaiProvider>
  );
}

export default App;
