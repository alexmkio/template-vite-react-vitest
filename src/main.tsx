import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes/root";
import List from "./components/List/List";
import Dog, { loader as dogLoader } from "./routes/dog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <List />,
      },
      {
        path: "dog/:dogId",
        element: <Dog />,
        loader: dogLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
