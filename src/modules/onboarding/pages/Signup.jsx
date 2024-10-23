import BlankLayout from "@/modules/shared/layouts/BlankLayout";
import {useSelector} from "react-redux";
import Step0 from "@/modules/onboarding/pages/signupSteps/Step0.jsx";
import Step1 from "@/modules/onboarding/pages/signupSteps/Step1.jsx";
import Step2 from "@/modules/onboarding/pages/signupSteps/Step2.jsx";
import Step3 from "@/modules/onboarding/pages/signupSteps/Step3.jsx";
import Step4 from "@/modules/onboarding/pages/signupSteps/Step4.jsx";
import Step5 from "@/modules/onboarding/pages/signupSteps/Step5.jsx";
import Step6 from "@/modules/onboarding/pages/signupSteps/Step6.jsx";
import Step7 from "@/modules/onboarding/pages/signupSteps/Step7.jsx";

export default function Signup() {

    const step = useSelector(state => state.signUpSteps.currentStep)

    return (
        <BlankLayout showNavbar={step === 0}>
            {step === 0 && <Step0/>}
            {step === 1 && <Step1/>}
            {step === 2 && <Step2/>}
            {step === 3 && <Step3/>}
            {step === 4 && <Step4/>}
            {step === 5 && <Step5/>}
            {step === 6 && <Step6/>}
            {step === 7 && <Step7/>}
        </BlankLayout>
    );
}