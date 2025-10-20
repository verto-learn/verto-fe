import { createBrowserRouter } from "react-router-dom";
import { LandingLayout } from "../layouts/LandingLayout";
import Landing from "../pages/Landing";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <Landing />,
            }
        ]
    }
])