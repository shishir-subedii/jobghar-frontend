import axios from "axios";

export function handleApiError(error: unknown): string {
    let errorMsg = "Something went wrong";

    if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        if (status === 403) {
            errorMsg = "You are not authorized to perform this action";
        } else if (status === 404) {
            errorMsg = "Resource not found";
        } else {
            errorMsg = data?.message || errorMsg;
        }
    } else if (error instanceof Error) {
        errorMsg = error.message;
    }

    return errorMsg;
}
