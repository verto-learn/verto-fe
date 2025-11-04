import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (formData) => {
      console.log("data nya", formData);
    },
  });
};
