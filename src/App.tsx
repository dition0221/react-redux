import { ThemeProvider, createGlobalStyle } from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reset from "styled-reset";
import { useSelector } from "react-redux";
import { IRootState } from "./store";
import { darkTheme, lightTheme } from "./theme";
// Router
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Layout from "./Layout";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color : transparent;
  }
  body {
    max-width: 420px;
    margin: 0 auto;
    padding: 0 10px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    overflow-x: hidden;
  }
  a {
    color: ${(props) => props.theme.anchorColor};
  }
`;

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: ":id",
          element: <Detail />,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/react-redux/" }
);

export default function App() {
  // Theme
  const isDarkTheme = useSelector((state: IRootState) => state.isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
