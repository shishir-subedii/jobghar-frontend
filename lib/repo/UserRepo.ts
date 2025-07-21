import axios from "axios";
import apiClient from "../api/apiClient";
import { handleApiError } from "@/utils/ErrorHandler";

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
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}
export const userRepo = new UserRepo();