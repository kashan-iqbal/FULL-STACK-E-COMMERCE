import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartPovider } from "./context/Cart";
import { AuthProvider } from "./context/auth";
import { SearchPovider } from "./context/search";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchPovider>
      <CartPovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartPovider>
    </SearchPovider>
  </AuthProvider>
);
