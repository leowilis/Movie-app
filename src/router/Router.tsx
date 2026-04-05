import { createBrowserRouter } from "react-router-dom";
import Home from "../App";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  
]);

export default Router;