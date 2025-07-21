import apiClient from "../api/apiClient";
import axios from "axios";
import { handleApiError } from "@/utils/ErrorHandler";

class JobRepo {
    constructor() { }
    async getJobList({
        page = 1,
        limit = 10,
        onSuccess,
        onError,
    }: {
        page?: number;
        limit?: number;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get('/job', {
                params: { page, limit },
            });
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || 'Failed to fetch job list');
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async getJobDetails({
        jobSlug,
        onSuccess,
        onError
    }: {
        jobSlug: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/job/${jobSlug}`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch job details");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    /*
    For employers 
    */

    // post /job Create a new job(Employer Only)
    async createJob({
        jobData,
        onSuccess,
        onError
    }: {
        jobData: any;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post('/job', jobData);
            if (success && data) {
                onSuccess(message || "Job created successfully");
            } else {
                onError(message || "Failed to create job");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async findEmployerJobs({
        onSuccess,
        onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get('/job/employer/find');
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch employer jobs");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async updateJob({
        jobSlug,
        jobData,
        onSuccess,
        onError
    }: {
        jobSlug: string;
        jobData: any;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.patch(`/job/${jobSlug}`, jobData);
            if (success && data) {
                onSuccess(message || "Job updated successfully");
            } else {
                onError(message || "Failed to update job");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async deleteJob({
        jobSlug,
        onSuccess,
        onError
    }: {
        jobSlug: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.delete(`/job/${jobSlug}/delete`);
            if (success && data) {
                onSuccess(message || "Job deleted successfully");
            } else {
                onError(message || "Failed to delete job");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const jobRepo = new JobRepo();