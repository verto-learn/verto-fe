import { session } from "../../data/session";

export const getUserSession = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return session
}