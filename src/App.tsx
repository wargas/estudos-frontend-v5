import AppRoutes from "./routes/app-routes";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from "./providers/modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ModalProvider>
        <AppRoutes />
          <ToastContainer />
        </ModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
