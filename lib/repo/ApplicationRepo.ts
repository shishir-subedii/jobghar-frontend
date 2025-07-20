import axios from "axios";
import apiClient from "../api/apiClient";

class ApplicationRepo {
    constructor() { }

    async submitApplication({
        jobSlug, coverLetter, cv, onSuccess, onError
    }: {
        jobSlug: string;
        coverLetter: string;
        cv: File | null;
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        const formData = new FormData();
        formData.append('jobSlug', jobSlug);
        formData.append('coverLetter', coverLetter);
        if (cv) {
            formData.append('cv', cv);
        }

        try {
            const { success, data, message } = await apiClient.post('/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to submit application");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while submitting application";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

    async getMyApplications({
        onSuccess, onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get('/applications/my-applications');
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch applications");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while fetching applications";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

    async getApplicationById({
        id, onSuccess, onError
    }: {
        id: number;
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/applications/${id}`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch application");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while fetching application";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

    /*
    For Employers
    */
    // /applications/job/{jobSlug} View all submitted applications for a job(Employer only)
    async getApplicationsByJobSlug({
        jobSlug, onSuccess, onError
    }: {
        jobSlug: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/applications/job/${jobSlug}`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch applications for the job");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while fetching applications for the job";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

    // /applications/job/{jobSlug}/reviewed View all reviewed applications for a job(Employer only)
    async getReviewedApplicationsByJobSlug({
        jobSlug, onSuccess, onError
    }: {
        jobSlug: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/applications/job/${jobSlug}/reviewed`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch reviewed applications for the job");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while fetching reviewed applications for the job";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

    // /applications/application/{id} View a specific application(Employer only)
    async getApplicationByIdForEmployer({
        id, onSuccess, onError
    }: {
        id: number;
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/applications/application/${id}`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch application details");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while fetching application details";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

    // /applications/{id}/review Mark an application as reviewed(Employer only)
    async markApplicationAsReviewed({
        id, onSuccess, onError
    }: {
        id: number;
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.patch(`/applications/${id}/review`);
            if (success && data) {
                onSuccess(data);
            } else {
                onError(message || "Failed to mark application as reviewed");
            }
        } catch (error: unknown) {
            let errorMsg = "Something went wrong while marking application as reviewed";

            if (axios.isAxiosError(error) && error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }
            onError(errorMsg);
        }
    }

}
export const applicationRepo = new ApplicationRepo();