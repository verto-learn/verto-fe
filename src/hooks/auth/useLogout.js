import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth/logout";

export function useLogout() {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log('Logout Success')
      navigate("/authenticate/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
}