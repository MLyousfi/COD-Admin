import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import BlankLayout from "@/modules/shared/layouts/BlankLayout";
import {ViewIcon, ViewOffSlashIcon} from "hugeicons-react";
import {useState} from "react";
import {changePasswordSchema} from "@/modules/shared/schemes/userSchema.js";

export default function ChangePassword() {
    const [validation, setValidation] = useState({});
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordInputChange = async (e) => {
        const password = e.target.value;
        setPassword(password);
        const check = await changePasswordSchema.safeParse({password, confirmPassword});
        if (check.error) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({password: null});
        }
    }
    const handleConfirmPasswordInputChange = async (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        const check = await changePasswordSchema.safeParse({password, confirmPassword});
        if (check.error) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({confirmPassword: null});
        }
    }
    return (
        <BlankLayout>
            <div className="relative min-h-screen">
                <div className="px-8 mx-auto text-center w-[25rem]">
                    <h2 className="my-3 text-xl font-bold text-primary">Change Password.</h2>
                    <form action="" className="mt-8">
                        <Input type={showPassword ? 'text' : 'password'} required placeholder="New Password" value={password}
                               classNames={{
                                   inputWrapper: `bg-white border-2 ${validation?.password ? 'border-red-200' : 'border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                               }} onChange={handlePasswordInputChange}
                               endContent={showPassword ?
                                   <ViewOffSlashIcon className="cursor-pointer"
                                                     onClick={() => setShowPassword(false)}/> :
                                   <ViewIcon className="cursor-pointer" onClick={() => setShowPassword(true)}/>
                               }
                        />
                        {validation?.password && (
                            <div className="text-red-400 my-2 text-sm block text-start">
                                {validation.password.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}

                        <Input type={showConfirmPassword ? 'text' : 'password'} required className="my-4" value={confirmPassword}
                               placeholder="Confirm Password" classNames={{
                            inputWrapper: `bg-white border ${validation?.confirmPassword ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                        }} onChange={handleConfirmPasswordInputChange}
                               endContent={showConfirmPassword ?
                                   <ViewOffSlashIcon className="cursor-pointer"
                                                     onClick={() => setShowConfirmPassword(false)}/> :
                                   <ViewIcon className="cursor-pointer" onClick={() => setShowConfirmPassword(true)}/>
                               }
                        />
                        {validation?.confirmPassword && (
                            <div className="text-red-400 my-2 text-sm block text-start">
                                {validation.confirmPassword.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        <Button className="w-full py-6 my-4 font-bold text-white rounded bg-danger" type="submit">Save</Button>
                    </form>
                </div>
            </div>
        </BlankLayout>
    );
}