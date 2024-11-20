export interface ISignupRequestBody {
    firstName: string;
    lastName?: string;
    email: string;
    // gender?: "Female" | "Male" | "Others"; 
    password: string;
}
