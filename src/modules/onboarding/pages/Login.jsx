import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import BlankLayout from "@/modules/shared/layouts/BlankLayout";
import { Mail01Icon, ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import Recaptcha from "../components/Repatcha";
import { RouteNames } from "@/core/constants/routes.js";
import ContinueWithGoogle from "@/modules/onboarding/components/ContinueWithGoogle.jsx";
import { loginSchema, registerSchema } from "@/modules/shared/schemes/userSchema.js";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [setCaptchaToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validation, setValidation] = useState({});

    const handleEmailInputChange = async (e) => {
        const email = e.target.value;
        setEmail(email);
        const check = await registerSchema.safeParse({ email, password });
        if (check.error) {
            setValidation(check.error.flatten().fieldErrors);
        }
        if (check.success) {
            setValidation({ email: null });
        }
    }
    const handlePasswordInputChange = async (e) => {
        const password = e.target.value;
        setPassword(password);
        const check = await loginSchema.safeParse({ email, password });
        if (check.error) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({ password: null });
        }
    }
    return (
        <BlankLayout showNavbar>
            <div className="px-8 mx-auto text-center w-[25rem]">
                <h2 className="my-3 text-2xl font-bold text-primary">Welcome Back !</h2>
                <p className="text-gray-400">Please enter your credentials to sign in !</p>
                <form action="" className="mt-8">
                    <Input type="email" placeholder="Your Email Address" value={email} classNames={{
                        inputWrapper: `bg-white border-2 ${validation?.email ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                    }} endContent={<Mail01Icon />} onChange={handleEmailInputChange} required />
                    {validation?.email && (
                        <span className="text-red-400 my-2 text-sm block text-start">{validation?.email}</span>)}

                    <Input type={showPassword ? 'text' : 'password'} className="my-3" placeholder="Your Password"
                        value={password} classNames={{
                            inputWrapper: `bg-white border-2 ${validation?.email ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                        }} endContent={showPassword ?
                            <ViewOffSlashIcon className="cursor-pointer" onClick={() => setShowPassword(false)} /> :
                            <ViewIcon className="cursor-pointer" onClick={() => setShowPassword(true)} />
                        }
                        onChange={handlePasswordInputChange} required />
                    {validation?.password && (
                        <span className="text-red-400 my-2 text-sm block text-start">{validation?.password}</span>)}

                    <Button className="w-full my-4 font-bold text-white rounded bg-primary"><Link to={RouteNames.dashboard} className="text-sm">Login</Link></Button>
                    <br />
                    <div className="flex flex-row justify-between my-1">
                        <Link to={RouteNames.forgotPassword} className="text-sm">Forgot your password?</Link>
                        <Link to={RouteNames.signup} className="text-sm font-bold">Signup Now</Link>
                    </div>
                    <br />
                    <div className="flex flex-col gap-4 py-2">
                        <Recaptcha setToken={setCaptchaToken} />
                        <span className="block text-sm">Or Continue with:</span>
                        <ContinueWithGoogle />
                    </div>
                </form>
            </div>
        </BlankLayout>
    );
}