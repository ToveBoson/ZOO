import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Animal } from "./components/Animal/Animal";
import { Animals } from "./components/Animals/Animals";
import { Home } from "./components/Home/Home";
import { NotFound } from "./components/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },

      {
        path: "/animal/:id",
        element: <Animal />,
      },
      {
        path: "/animals",
        element: <Animals />,
      },
    ],
  },
]);
