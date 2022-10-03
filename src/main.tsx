import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from '@app/serviceWorkerRegistration';

import App from "@app/App";
import "@app/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register({onUpdate: () => {}, onSuccess: () => {}});