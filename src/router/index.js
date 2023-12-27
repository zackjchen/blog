import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import LayoutInner from "@/pages/LayoutInner";
import Home from "@/pages/Home";

import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute"
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import RichTextEditor from "@/components/RichTextEditor";
import ArticleList from "@/pages/ArticleList";


const router = createBrowserRouter(
    [
      {
        // id: "root",
        path: "/",
        element: <Layout/>,
      },
      {
        // id: "root",
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/system",
        element: <AuthRoute><LayoutInner/></AuthRoute>,
        children:[
          {
            path: "/system/home",
            element: <Home/>
          },
          {
            path: "/system/article",
            element: <Article/>
          },
          {
            path: "/system/publish",
            element: <Publish/>
          },
          {
            path: "/system/editor",
            element: <RichTextEditor/>
          },
          {
            path: "/system/articles",
            element: <ArticleList/>
          },
        ]
      }
    ],
  );


  export default router