import { createBrowserRouter } from "react-router-dom";
import { LandingLayout } from "../layouts/LandingLayout";
import Landing from "../pages/Landing";
import { ChapterDetail } from "../pages/course/ChapterDetail";
import { UserDashboard } from "../layouts/UserDashboard";
import Profile from "../pages/users/Profile";



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
    },
    {
        path: "/users",
        element: <UserDashboard />,
        children: [
            {
                path: "profile",
                element: <Profile />,
            }
        ]
    },
    {
        path: "/chapter/:id",
        element: <ChapterDetail />
    }
])