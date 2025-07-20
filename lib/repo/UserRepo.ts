import axios from "axios";
import apiClient from "../api/apiClient";

class UserRepo{
    constructor() { }

    async getUserProfile({
        onSuccess, onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get('/user');
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch user profile");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while fetching user profile";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }
}
export const userRepo = new UserRepo();