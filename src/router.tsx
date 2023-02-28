import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetails } from "./components/AnimalDetails/AnimalDetails";
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
        path: "/animals",
        element: <Animals />,
      },
      {
        path: "/animal/:id",
        element: <AnimalDetails />,
      },
    ],
  },
]);
