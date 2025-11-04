import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (formData) => {
      console.log("data nya", formData);
    },
  });
};
