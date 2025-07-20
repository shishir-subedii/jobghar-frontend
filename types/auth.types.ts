export type registerFormData = {
    name: string;
    role: 'seeker' | 'employer' | '';
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
};

export type loginData = {
    accessToken: string;
    role: string;
};

export type loginFormData = {
    email: string;
    password: string;
};

