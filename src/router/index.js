import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
    [
      {
        // id: "root",
        path: "/",
        element: <Layout/>,
      },
      {
        // id: "root",
        path: "login",
        element: <Login/>,
      },
    ],
  );


  export default router