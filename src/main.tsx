import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AntThemeProvider from "@/AntThemeProvider";
import { DevTools } from "jotai-devtools";
import NiceModal from "@ebay/nice-modal-react";
import { GalleryDevTools } from "@/views/ComponentsGallery/GalleryDevTools";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AntThemeProvider>
      <NiceModal.Provider>
        <App />
        <DevTools />
        <GalleryDevTools />
      </NiceModal.Provider>
    </AntThemeProvider>
  </React.StrictMode>
);
