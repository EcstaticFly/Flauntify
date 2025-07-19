import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/toaster.jsx";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Analytics />
      <ToastContainer
        autoClose={4000}
        hideProgressBar={true}
        position="bottom-right"
        theme="dark"
      />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
