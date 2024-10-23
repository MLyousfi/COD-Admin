import {z} from "zod";

const email = z.string({message: 'Email address is required.'}).email({ message: 'Please enter a valid email.' }).trim();
const password = z.string().min(8, "Password must be at least 8 characters");
const passwordWithComplexity = z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters").refine((val) => /[A-Z]/.test(val), {message: "Password must contain at least one uppercase letter"})
    .refine((val) => /[a-z]/.test(val), {message: "Password must contain at least one lowercase letter"})
    .refine((val) => /\d/.test(val), {message: "Password must contain at least one number"})
    .refine((val) => /[@$!%*?&#]/.test(val), {message: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"});


export const loginSchema = z.object({
    email: email,
    password: password,
});

export const registerSchema =z. object({
    email: email,
});

export const registerStep2Schema = z.object({
    firstName: z.string({message: "First name is required"}).min(2, "First Name must be at least 2 characters"),
    lastName: z.string({message: "Last name is required"}).min(2, "Last Name must be at least 2 characters"),
    identityNumber: z.string({message: "Identity number is required"}).min(4, "Invalid Identity Number"),
});

export const registerStep3Schema = z.object({
    storeName: z.string({message: "Store name is required"}).min(2, "Store Name must be at least 2 characters"),
    website: z.string({message: "Website is required"}).url({message: "Please enter a valid url"}).optional(),
    storeAddress: z.string({message: "Store address is required"}).min(3, "Invalid Store Address"),
    storeEmail: z.string({message: "Store email is required"}).email({ message: 'Please enter a valid email.' }).trim(),
});

export const registerStep4Schema = z.object({
    phoneNumber: z.string({message: "Phone number is required"}).min(8, "Invalid Phone Number"),
});

export const forgotPasswordSchema = z.object({
    email: email,
});

export const changePasswordSchema = z.object({
    password: passwordWithComplexity,
    confirmPassword: password,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
