import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth/logout";

export function useLogout() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log('Logout Success')
      // clear user data from cache
      queryClient.removeQueries(["user"]);
      navigate("/authenticate/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
}