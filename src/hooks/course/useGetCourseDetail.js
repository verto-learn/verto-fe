import { useQuery } from "@tanstack/react-query";
import { getCourseDetail } from "../../api/course/getCourseDetail";


export const useGetCourseDetail = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseDetail(id),
    enabled: !!id,

    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data?.data?.chapters) return false;

      const chapters = data.data.chapters;
      const isGrading = chapters.some(c => {
         if (!c.is_study_case) return false;
         
         const proof = c.study_case_proof;
         return proof && !proof.ai_feedback;
      });

      return isGrading ? 2000 : false;
    },
    refetchIntervalInBackground: true,
  });
};