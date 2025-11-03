import { createBrowserRouter } from "react-router-dom";
import { LandingLayout } from "../layouts/LandingLayout";
import Landing from "../pages/Landing";
import { ChapterDetail } from "../pages/course/ChapterDetail";
import { UserDashboard } from "../layouts/UserDashboard";
import Profile from "../pages/users/Profile";
import { CourseLayout } from "../layouts/CourseLayout";
import Course from "../pages/course/Course";
import { ChapterLayout } from "../layouts/ChapterLayout";



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
        path: "/courses",
        element: <CourseLayout />,
        children: [
            {
                path: "overview",
                element: <Course />,
            }
        ]
    },
    {
        path: "/chapter",
        element: <ChapterLayout />,
        children: [
            {
                path: ":id",
                element: <ChapterDetail />,
            }
        ]
    }
])