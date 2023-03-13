import React from "react";
import { BrowserRouter, Route, Routes as Browser } from "react-router-dom";
import App from "./App";
import FormComponent from "./components/FormComponent";

const Routes = () => {
  return (
    <BrowserRouter>
      <Browser>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<FormComponent />} />
      </Browser>
    </BrowserRouter>
  );
};

export default Routes;
