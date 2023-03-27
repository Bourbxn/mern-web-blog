import React from "react";
import { BrowserRouter, Route, Routes as Browser } from "react-router-dom";
import App from "./App";
import EditBlog from "./components/EditBlog";
import FormComponent from "./components/FormComponent";
import Login from "./components/Login";
import SingleBlog from "./components/SingleBlog";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Browser>
        <Route path="/" element={<App />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <FormComponent />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route
          path="/blog/edit/:slug"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <ProtectedRoute redirectPath="/">
              <App />
            </ProtectedRoute>
          }
        />
      </Browser>
    </BrowserRouter>
  );
};

export default Routes;
