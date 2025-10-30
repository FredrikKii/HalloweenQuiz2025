import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4 from "./pages/Question4";
import Question5 from "./pages/Question5";
import Question6 from "./pages/Question6";
import Question7 from "./pages/Question7";
import Question8 from "./pages/Question8";
import Question9 from "./pages/Question9";
import Question10 from "./pages/Question10";
import Team from "./pages/Team";
import Thanks from "./pages/Thanks";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/team", element: <Team /> },
  { path: "/question/1", element: <Question1 /> },
  { path: "/question/2", element: <Question2 /> },
  { path: "/question/3", element: <Question3 /> },
  { path: "/question/4", element: <Question4 /> },
  { path: "/question/5", element: <Question5 /> },
  { path: "/question/6", element: <Question6 /> },
  { path: "/question/7", element: <Question7 /> },
  { path: "/question/8", element: <Question8 /> },
  { path: "/question/9", element: <Question9 /> },
  { path: "/question/10", element: <Question10 /> },
  { path: "/thanks", element: <Thanks /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
