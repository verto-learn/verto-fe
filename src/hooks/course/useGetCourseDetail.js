import { useQuery } from "@tanstack/react-query";
import { getCourseDetail } from "../../api/course/getCourseDetail";

export const useGetCourseDetail = (id) => {
  const query = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseDetail(id),
    enabled: !!id,
    onError: (err) => console.error("Error fetching course detail:", err),
  });

  return query;
};
