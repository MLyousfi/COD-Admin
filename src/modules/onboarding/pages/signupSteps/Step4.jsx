import {useDispatch, useSelector} from "react-redux";
import {SignupSteps} from "@/core/constants/signup.js";
import {Button} from "@nextui-org/button";
import {nextStep, prevStep, setValues} from "@/core/states/signup.js";
import startsWith from 'lodash.startswith';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import StepsWrapper from "@/modules/onboarding/pages/signupSteps/StepsWrapper.jsx";
import {useState} from "react";
import {registerStep4Schema} from "@shared/schemes/userSchema.js";
import {isObjectEmpty} from "@/core/utils/object.js";

export default function Step4() {
    const {step4, step1} = useSelector(state => state.signUpSteps.values)
    const [phoneNumber, setPhoneNumber] = useState(step4.phoneNumbers || '');
    const [validation, setValidation] = useState({});

    const step = useSelector(state => state.signUpSteps.currentStep)

    const dispatch = useDispatch();

    const handlePhoneInputChange = async (phoneNumber) => {
        setPhoneNumber(phoneNumber);
        const check = await registerStep4Schema.safeParse({phoneNumber});
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handlePhoneInputChange(phoneNumber);
        if (phoneNumber && isObjectEmpty(validation)) {
            dispatch(setValues({step: 'step4', values: {phoneNumber}}));
            dispatch(nextStep());
        }
    }

    return (
        <StepsWrapper>

                <div>
                    <h2 className="text-xl font-bold text-primary">Sign up - {step + '/' + SignupSteps.max}</h2>
                    <p className="text-gray-400">Add phone number</p>
                </div>
                <div className="my-6">
                    <PhoneInput
                        containerClass="shadow-sm"
                        inputClass={`!py-5 !w-full border ${validation?.phoneNumber ? '!border-red-400' : '!border-gray-200'}  !bg-white`}
                        buttonClass="!bg-gray-100 border !border-gray-200 !px-0.5"
                        searchClass="!bg-gray-50 relative !px-0 !py-1 [&>input]:w-full [&>input]:!m-0 [&>input]:!px-2  [&>input]:!py-2 [&>input]:!border-none"
                        disableSearchIcon={true}
                        country={(step1.country || SignupSteps.defaultCountry).toLowerCase()}
                        value={phoneNumber}
                        isValid={(inputNumber, country, countries) => {
                            return countries.some((country) => {
                                return (startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber)) && inputNumber.length > 8;
                            });
                        }}
                        onChange={phone => handlePhoneInputChange(phone)}
                        enableSearch={true}
                    />

                    {validation?.phoneNumber && (
                        <span className="text-red-400 my-2 text-sm block text-start">{validation?.phoneNumber}</span>)}
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