import { createGlobalStyle } from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reset from "styled-reset";
// Router
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: #222;
    color: whitesmoke;
  }
  * {
    box-sizing: border-box;
  }
  a {
    color: tomato;
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);

export default function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}
