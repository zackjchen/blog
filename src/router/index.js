import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import LayoutInner from "@/pages/LayoutInner";

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
      {
        path: "/system",
        element: <LayoutInner/>
      }
    ],
  );


  export default router