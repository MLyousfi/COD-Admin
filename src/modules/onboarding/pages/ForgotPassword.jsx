import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import BlankLayout from "@/modules/shared/layouts/BlankLayout";
import { Mail01Icon } from "hugeicons-react";
import { useState } from "react";
import { forgotPasswordSchema } from "@/modules/shared/schemes/userSchema.js";
import { useNavigate } from "react-router-dom";
import { isObjectEmpty } from "@/core/utils/object.js";
import { RouteNames } from "@/core/constants/routes.js";

export default function ForgotPassword() {
    const [validation, setValidation] = useState({});
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handlePasswordInputChange = async (e) => {
        const email = e.target.value;
        setEmail(email);
        const check = await forgotPasswordSchema.safeParse({ email });
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handlePasswordInputChange(e);
        if (isObjectEmpty(validation) && email.length > 5) {
            navigate(RouteNames.recoverEmailSent);
        }
    }
    return (
        <BlankLayout>
            <div className="relative min-h-screen">
                <div className="px-8 mx-auto text-center w-[25rem]">
                    <h2 className="my-3 text-xl font-bold text-primary">Restore your account !</h2>
                    <p className="text-gray-400">Please enter a valid email to this website, so as to recover your
                        account by your inbox.</p>
                    <form action="" className="mt-8">
                        <Input type="email" placeholder="Your Email Address" value={email}
                            onChange={handlePasswordInputChange}
                            classNames={{
                                inputWrapper: `bg-white border-2 ${validation?.email ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                            }} endContent={<Mail01Icon />} required />
                        {validation?.email && (
                            <span className="text-red-400 my-2 text-sm block text-start">{validation?.email}</span>)}

                        <Button className="w-full my-4 font-bold text-white rounded bg-danger px-0 py-6 cursor-pointer"
                            onClick={(e) => handleSubmit(e)} disabled={!isObjectEmpty(validation)}>
                            Continue
                        </Button>
                    </form>
                </div>
            </div>
        </BlankLayout>
    );
}