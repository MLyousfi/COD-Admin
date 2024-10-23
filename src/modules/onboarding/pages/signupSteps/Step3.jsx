import StepsWrapper from "@/modules/onboarding/pages/signupSteps/StepsWrapper.jsx";
import {SignupSteps} from "@/core/constants/signup.js";
import {Button} from "@nextui-org/button";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "@nextui-org/input";
import {useState} from "react";
import {nextStep, prevStep, setValues} from "@/core/states/signup.js";
import {registerStep3Schema} from "@shared/schemes/userSchema.js";

export default function Step3() {

    const {step3} = useSelector(state => state.signUpSteps.values)
    const [storeName, setStoreName] = useState(step3.storeName || '');
    const [website, setWebsite] = useState(step3.website || '');
    const [storeAddress, setStoreAddress] = useState(step3.storeAddress || '');
    const [storeEmail, setStoreEmail] = useState(step3.storeEmail || '');
    const [validation, setValidation] = useState({});

    const step = useSelector(state => state.signUpSteps.currentStep)
    const dispatch = useDispatch();

    const handleStoreNameChange = async (e) => {
        const storeName = e.target.value;
        setStoreName(storeName);
        const check = await registerStep3Schema.safeParse({storeName});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                storeName: check.error.flatten().fieldErrors.storeName
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                storeName: null
            }));
        }
    }

    const handleWebsiteChange = async (e) => {
        const website = e.target.value;
        setWebsite(website);
        const check = await registerStep3Schema.safeParse({website});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                website: check.error.flatten().fieldErrors.website
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                website: null
            }));
        }
    }

    const handleStoreAddressChange = async (e) => {
        const storeAddress = e.target.value;
        setStoreAddress(storeAddress);
        const check = await registerStep3Schema.safeParse({storeAddress});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                storeAddress: check.error.flatten().fieldErrors.storeAddress
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                storeAddress: null
            }));
        }
    }
    const handleStoreEmailChange = async (e) => {
        const storeEmail = e.target.value;
        setStoreEmail(storeEmail);
        const check = await registerStep3Schema.safeParse({storeEmail});
        if (!check.success) {
            setValidation(prevValidation => ({
                ...prevValidation,
                storeEmail: check.error.flatten().fieldErrors.storeEmail
            }));
        } else {
            setValidation(prevValidation => ({
                ...prevValidation,
                storeEmail: null
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const check = await registerStep3Schema.safeParse({storeName, storeAddress, website, storeEmail});
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
            dispatch(setValues({step: 'step3', values: {storeName, website, storeAddress, storeEmail}}));
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
                    <Input type="text" placeholder="Store name" value={storeName}
                           onChange={handleStoreNameChange}
                           classNames={{
                               inputWrapper: `bg-white border-2 ${validation?.storeName ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                           }} required/>

                    <Input type="text" placeholder="Website" value={website}
                           onChange={handleWebsiteChange}
                           classNames={{
                               inputWrapper: `bg-white border-2 ${validation?.website ? 'border-red-200' : ' border-gray-200'} rounded-md py-6 px-4 focus:bg-normal`
                           }} required/>
                </div>
                <Input type="text" placeholder="Address line" value={storeAddress}
                       onChange={handleStoreAddressChange}
                       classNames={{
                           inputWrapper: `bg-white border-2 ${validation?.storeAddress ? 'border-red-200' : ' border-gray-200'} my-3 rounded-md py-6 px-4 focus:bg-normal`
                       }} required/>
                <Input type="text" placeholder="Email Address" value={storeEmail}
                       onChange={handleStoreEmailChange}
                       classNames={{
                           inputWrapper: `bg-white border-2 ${validation?.storeEmail ? 'border-red-200' : ' border-gray-200'} my-3 rounded-md py-6 px-4 focus:bg-normal`
                       }} required/>

                {validation?.storeName && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.storeName}</span>)}
                {validation?.website && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.website}</span>)}
                {validation?.storeAddress && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.storeAddress}</span>)}
                {validation?.storeEmail && (
                    <span className="text-red-400 my-2 text-sm block text-start">{validation?.storeEmail}</span>)}
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