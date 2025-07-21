import axios from "axios";
import apiClient from "../api/apiClient";
import { handleApiError } from "@/utils/ErrorHandler";

class AuthRepo {
    constructor() { }
    async getUserProfile({
        onSuccess, onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get('/user')
            if (success) {
                onSuccess(data);
            }
            else {
                onError(message || "Failed to fetch user profile");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async login({
        email,
        password,
        onSuccess,
        onError
    }: {
        email: string;
        password: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post('/auth/login', { email, password });
            if (success && data !== null) {
                onSuccess(data);
            } else {
                onError(message || "Login failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async register({
        name,
        role,
        email,
        age,
        password,
        confirmPassword,
        onSuccess,
        onError
    }: {
        name: string;
        role: string;
        email: string;
        age: number;
        password: string;
        confirmPassword: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post('/auth/register', {
                name,
                role,
                age,
                email,
                password,
                confirmPassword
            });
            if (success && data !== null) {
                onSuccess(message || "Registration successful");
            } else {
                onError(message || "Registration failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async logOut({
        onSuccess,
        onError
    }: {
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.get('/auth/logout');
            if (success) {
                onSuccess(message || "Logout successful");
            } else {
                onError(message || "Logout failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async changePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
        onSuccess,
        onError
    }: {
        oldPassword: string;
        newPassword: string;
        confirmNewPassword: string;
        onSuccess: (message: string) => void;
        onError: (message: string) => void;
    }) {
        try {
            if (!oldPassword || !newPassword || !confirmNewPassword) {
                onError("All fields are required");
                return;
            }
            if(newPassword !== confirmNewPassword) {
                onError("New password and confirm password do not match");
                return;
            }
            
            const { success, message } = await apiClient.post('/auth/change-password', {
                oldPassword,
                newPassword,
                confirmNewPassword
            });
            if (success) {
                onSuccess(message || "Password changed successfully");
            } else {
                onError(message || "Failed to change password");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

}

export const authRepo = new AuthRepo();