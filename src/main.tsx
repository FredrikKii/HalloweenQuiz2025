import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Team from "./pages/Team";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
   { path: "/team", element: <Team /> },
  { path: "/question/1", element: <Question1 /> },
  { path: "/question/2", element: <Question2 /> },
  { path: "/question/3", element: <Question3 /> },
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
