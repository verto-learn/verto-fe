import { createBrowserRouter } from "react-router-dom";
import { LandingLayout } from "../layouts/LandingLayout";
import Landing from "../pages/Landing";
import { ChapterDetail } from "../pages/course/ChapterDetail";
import { UserDashboard } from "../layouts/UserDashboard";
import Profile from "../pages/users/Profile";
import { CourseLayout } from "../layouts/CourseLayout";
import Course from "../pages/course/Course";
import { ChapterLayout } from "../layouts/ChapterLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import { AdminDashboard } from "../layouts/AdminDashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import UserCourse from "../pages/users/UserCourse";
import Quiz from "../pages/quiz/Quiz";
import { Simulator } from "../pages/Simulator";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/simulation",
                element: <Simulator />,
            }
            
        ]
    },
    {
        path: "/authenticate",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "quiz",
                element: <Quiz />,
            }
        ]
    },
    {
        element: <ProtectedRoutes allowedRoles={["user"]} />,
        children: [
            {
                path: "/users",
                element: <UserDashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "courses",
                        element: <UserCourse />
                    },
                ]
            }
        ]
    },
    {
        element: <ProtectedRoutes allowedRoles={["admin"]} />,
        children: [
            {
                path: "/admin",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    }
                ]
            }
        ]
    },
    {
        path: "/courses",
        element: <CourseLayout />,
        children: [
            {
                path: ":id",
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