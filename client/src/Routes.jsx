import React from "react";
import { BrowserRouter, Route, Routes as Browser } from "react-router-dom";
import App from "./App";
import EditBlog from "./components/EditBlog";
import FormComponent from "./components/FormComponent";
import SingleBlog from "./components/SingleBlog";

const Routes = () => {
  return (
    <BrowserRouter>
      <Browser>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<FormComponent />} />
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route path="/blog/edit/:slug" element={<EditBlog />} />
      </Browser>
    </BrowserRouter>
  );
};

export default Routes;
