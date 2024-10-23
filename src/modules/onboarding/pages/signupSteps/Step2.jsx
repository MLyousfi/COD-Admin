import StepsWrapper from "@/modules/onboarding/pages/signupSteps/StepsWrapper.jsx";
import {SignupSteps} from "@/core/constants/signup.js";
import {Button} from "@nextui-org/button";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "@nextui-org/input";
import {registerStep2Schema} from "@shared/schemes/userSchema.js";
import {useState} from "react";
import {nextStep, prevStep, setValues} from "@/core/states/signup.js";

export default function Step2() {

    const {step2} = useSelector(state => state.signUpSteps.values)
    const [firstName, setFirstName] = useState(step2.firstName || '');
    const [lastName, setLastName] = useState(step2.lastName || '');
    const [identityNumber, setIdentityNumber] = useState(step2.identityNumber || '');
    const [validation, setValidation] = useState({});

    const step = useSelector(state => state.signUpSteps.currentStep)
    const dispatch = useDispatch();

    const handleFirstNameChange = async (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
        const check = await registerStep2Schema.safeParse({firstName});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                firstName: check.error.flatten().fieldErrors.firstName
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                firstName: null
            }));
        }
    }

    const handleLastNameChange = async (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
        const check = await registerStep2Schema.safeParse({lastName});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                lastName: check.error.flatten().fieldErrors.lastName
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                lastName: null
            }));
        }
    }


    const handleIdentityNumberChange = async (e) => {
        const identityNumber = e.target.value;
        setIdentityNumber(identityNumber);
        const check = await registerStep2Schema.safeParse({identityNumber});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                identityNumber: check.error.flatten().fieldErrors.identityNumber
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                identityNumber: null
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const check = await registerStep2Schema.safeParse({firstName, lastName, identityNumber});
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
            dispatch(setValues({step: 'step2', values: {firstName, lastName, identityNumber}}));
            dispatch(nextStep());
        }
    }
    return (
        <StepsWrapper>
            <div>
                <h2 className="text-xl font-bold text-primary">Sign up - {step + '/' + SignupSteps.max}</h2>
                <p className="text-gray-400">Add your identity details</p>
            </div>
            <div className="my-6">
                <div className="flex flex-col gap-4 md:flex-row">
                    <Input type="text" placeholder="First Name" value={firstName}
                           onChange={handleFirstNameChange}
                           classNames={{
                               inputWrapper: `bg-white border-2 ${validation?.firstName ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                           }} required/>

                    <Input type="text" placeholder="First Name" value={lastName}
                           onChange={handleLastNameChange}
                           classNames={{
                               inputWrapper: `bg-white border-2 ${validation?.lastName ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                           }} required/>
                </div>
                <Input type="text" placeholder="ID Card" value={identityNumber}
                       onChange={handleIdentityNumberChange}
                       classNames={{
                           inputWrapper: `bg-white border-2 ${validation?.identityNumber ? 'border-red-200' : ' border-gray-200'} my-3 rounded-md py-6 px-4 focus:bg-normal`
                       }} required/>

                {validation?.firstName && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.firstName}</span>)}
                {validation?.lastName && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.lastName}</span>)}
                {validation?.identityNumber && (
                    <span
                        className="text-red-400 my-2 text-sm block text-start">{validation?.identityNumber}</span>)}
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