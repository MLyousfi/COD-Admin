import {useState} from "react";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import {COUNTRIES} from "@/core/constants/countries.js";
import {useDispatch, useSelector} from "react-redux";
import {SignupSteps} from "@/core/constants/signup.js";
import {Button} from "@nextui-org/button";
import {nextStep, setValues} from "@/core/states/signup.js";
import StepsWrapper from "@/modules/onboarding/pages/signupSteps/StepsWrapper.jsx";

export default function Step1() {

    const {step1} = useSelector(state => state.signUpSteps.values)
    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState(step1.country || SignupSteps.defaultCountry);

    const step = useSelector(state => state.signUpSteps.currentStep)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (country) {
            dispatch(setValues({step: 'step1', values: {country,}}));
            dispatch(nextStep());
        }
    }

    return (
        <StepsWrapper>

            <div>
                <h2 className="text-xl font-bold text-primary">Sign up - {step + '/' + SignupSteps.max}</h2>
                <p className="text-gray-400">Please select your country</p>
            </div>
            <div className="my-6">
                <CountrySelector
                    id={'countries'}
                    open={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={val => setCountry(val)}
                    selectedValue={COUNTRIES.find(option => option.value === country)}
                />
            </div>
            <Button className="my-4 font-bold text-white rounded bg-primary py-4 w-fit px-12 self-end"
                    onClick={(e) => handleSubmit(e)}>
                Next
            </Button>

        </StepsWrapper>
    );
}