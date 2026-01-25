import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <div className="min-h-screen bg-black text-white">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>,
);
