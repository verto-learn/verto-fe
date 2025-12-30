import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publishCourse } from "../../api/course/publishCourse"

export const usePublishCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: publishCourse,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["courses"]
            })

            const statusText = data.data.data.is_published ? "Published" : "Hidden";
            console.log("Course successfully", statusText)
        },
        onError: (error) => {
            console.error(error)
            console.log("Error")
        }
    })
}