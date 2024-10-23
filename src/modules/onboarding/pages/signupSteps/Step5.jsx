import {useDispatch, useSelector} from "react-redux";
import {SignupSteps} from "@/core/constants/signup.js";
import {Button} from "@nextui-org/button";
import {nextStep, prevStep} from "@/core/states/signup.js";
import StepsWrapper from "@/modules/onboarding/pages/signupSteps/StepsWrapper.jsx";
import VerificationInput from "react-verification-input";
import {Link} from "react-router-dom";
import {Checkbox} from "@nextui-org/checkbox";
import {useState} from "react";

export default function Step5() {

    const [termsSelected, setTermsSelected] = useState(false);
    const [receiveEmails, setReceiveEmails] = useState(false);
    const [termsNotSelected, setTermsNotSelected] = useState(false);
    const [code, setCode] = useState('');
    const [validation, setValidation] = useState({});

    const step = useSelector(state => state.signUpSteps.currentStep)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!termsSelected) {
            setTermsNotSelected(true);
        } else {
            setTermsNotSelected(false);

            // 1. check if code is valid
            if (code.length === 6 && code.match(/^[0-9]+$/)) {
                setValidation({});
                dispatch(nextStep());
            } else {
                setValidation({code: 'Invalid code'});
            }
        }
    }

    return (
        <StepsWrapper>

            <div>
                <h2 className="text-xl font-bold text-primary">Sign up - {step + '/' + SignupSteps.max}</h2>
                <p className="text-gray-400">Confirm your phone number</p>
            </div>
            <div className="my-6">
                <VerificationInput
                    onChange={(code) => setCode(code)}
                    validChars={'0-9'}
                    autoFocus={true}
                    classNames={{
                        container: "mx-auto w-full",
                        character: "bg-white border-gray-200 rounded",
                        characterInactive: "character--inactive",
                        characterSelected: "character--selected",
                        characterFilled: "character--filled",
                    }}
                />
                {validation?.code && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.code}</span>)}

                <div className="my-2 flex flex-row justify-between w-full">
                    <Link to="" className="text-primary font-bold">Resend Code</Link>
                    <Link to="" className="text-danger font-bold">Need help?</Link>
                </div>
            </div>
            <div className="my-8">
                <div className="mb-2 flex flex-row justify-start items-start">
                    <Checkbox isSelected={receiveEmails} onChange={setReceiveEmails}></Checkbox>
                    <label onClick={() => setReceiveEmails(!receiveEmails)}
                           className="text-sm text-gray-700 cursor-pointer">
                        By checking this box, you agree to receive marketing emails from COD Power Group.
                    </label>
                </div>
                <div className="flex flex-row justify-start items-start">
                    <Checkbox isSelected={termsSelected} onChange={setTermsSelected}></Checkbox>
                    <label onClick={() => setTermsSelected(!termsSelected)}
                           className={`text-sm ${termsNotSelected ? 'text-danger' : 'text-gray-700'} cursor-pointer`}>
                        By checking this box, you agree to our terms of service and privacy policy, and consent to
                        the transfer, hosting, and processing of data outside the EU.
                    </label>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <Button className="my-4 font-bold rounded bg-normal text-primary py-4 w-full px-12 self-end"
                        onClick={() => dispatch(prevStep())}>
                    Back
                </Button>
                <Button className="my-4 font-bold text-white rounded bg-primary w-full py-4 px-12 self-end"
                        onClick={(e) => handleSubmit(e)}>
                    Next
                </Button>
            </div>
        </StepsWrapper>
    );
}