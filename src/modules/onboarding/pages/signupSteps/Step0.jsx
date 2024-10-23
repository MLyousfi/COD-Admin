import { Input } from "@nextui-org/input";
import { Mail01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import { RouteNames } from "@/core/constants/routes.js";
import Recaptcha from "@/modules/onboarding/components/Repatcha.jsx";
import ContinueWithGoogle from "@/modules/onboarding/components/ContinueWithGoogle.jsx";
import { useState } from "react";
import { registerSchema } from "@/modules/shared/schemes/userSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setValues } from "@/core/states/signup.js";

export default function Step0() {
    const { step0 } = useSelector(state => state.signUpSteps.values)
    const [setCaptchaToken] = useState('');
    const [email, setEmail] = useState(step0.email || '');
    const [validation, setValidation] = useState({});
    const dispatch = useDispatch();

    const handleEmailInputChange = async (e) => {
        const email = e.target.value;
        setEmail(email);
        const check = await registerSchema.safeParse({ email });
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const check = await registerSchema.safeParse({ email });
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
            dispatch(setValues({ step: 'step0', values: { email } }));
            dispatch(nextStep());
        }
    }
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="px-8 mx-auto text-center w-[25rem] flex-1">
                <h2 className="mb-3 text-2xl font-bold text-primary">Get Started Today !</h2>
                <p className="text-gray-400">Sign up today to get started with COD Power Group !</p>
                <form action="" className="mt-8">
                    <Input type="email" value={email} placeholder="Your Email Address" classNames={{
                        inputWrapper: `bg-white border-2 ${validation?.email ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                    }} endContent={<Mail01Icon />} onChange={handleEmailInputChange} required />
                    {validation?.email && (
                        <span className="text-red-400 my-2 text-sm block text-start">{validation?.email}</span>)}
                    <Button className="w-full my-4 font-bold text-white rounded bg-primary py-6"
                        onClick={(e) => handleSubmit(e)}>
                        Signup with Email
                    </Button>
                    <br />
                    <div className="flex flex-row justify-between my-1">
                        <Link to={RouteNames.forgotPassword} className="text-sm">Forgot your password?</Link>
                        <Link to={RouteNames.login} className="text-sm font-bold">Login</Link>
                    </div>
                    <br />
                    <div className="flex flex-col gap-4 py-2">
                        <Recaptcha setToken={setCaptchaToken} />
                        <span className="block text-sm">Or Continue with:</span>
                        <ContinueWithGoogle />
                    </div>
                </form>
            </div>
            <footer className="flex-1 w-full mx-auto sm:w-6/12">
                <div className="flex flex-row justify-evenly">
                    <Link className="font-bold text-primary" to="">Privacy</Link>
                    <Link to="">Terms</Link>
                    <Link to="">Get Help?</Link>
                </div>
            </footer>
        </div>
    );
}