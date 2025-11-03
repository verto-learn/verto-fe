import { Outlet } from "react-router-dom"
import { CourseNavbar } from "../components/ui/CourseNavbar"

export const CourseLayout = () => {
    return (
    <div className="relative min-h-screen overflow-hidden bg-primary text-white">
      <div className="aurora absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-secondary to-accent rounded-full blur-3xl opacity-30 animate-aurora1" />
      <div className="aurora absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-400 rounded-full blur-2xl opacity-25 animate-aurora3" />
      <div className="aurora absolute right-0  w-[500px] h-[500px] bg-gradient-to-tr from-accent via-cyan-400 to-purple-400 rounded-full blur-2xl opacity-25 animate-aurora3" />
      <div className="aurora absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary via-accent to-purple-400 rounded-full blur-2xl opacity-25 animate-aurora3" />

      <div className="relative z-10 flex flex-col min-h-screen p-4">
        <CourseNavbar />
        <main className="flex-grow px-8">
          <Outlet />
        </main>
      </div>
    </div>
    )
}