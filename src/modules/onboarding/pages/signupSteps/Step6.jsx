import {Button} from "@nextui-org/button";
import {Checkbox} from "@nextui-org/checkbox";
import {useState} from "react";
import {Chip} from "@nextui-org/chip";
import {nextStep, prevStep} from "@/core/states/signup.js";
import {useDispatch} from "react-redux";
import {ArrowLeft01Icon} from "hugeicons-react";
import Mastercard from '@shared/assets/images/onboarding/Mastercard.svg'
import Visa from '@shared/assets/images/onboarding/Visa.svg'
import Paypal from '@shared/assets/images/onboarding/Paypal.svg'
import GPay from '@shared/assets/images/onboarding/G Pay.svg'
import ApplePay from '@shared/assets/images/onboarding/apple pay.svg'
import AmericanExpress from '@shared/assets/images/onboarding/American Express.svg'
import Stripe from '@shared/assets/images/onboarding/Stripe.svg'
import {Input} from "@nextui-org/input";

export default function Step6() {
    const [basicPlan, setBasicPlan] = useState(false);
    const [proPlan, setProPlan] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-row w-full justify-between items-center gap-4 relative h-screen">
            <form action=""
                  className="md:w-1/2 w-full md:max-w-[25rem] mx-8 md:mx-auto flex flex-col justify-center p-0">

                <Button variant="light" isIconOnly className="self-start mb-16 "
                        onClick={() => dispatch(prevStep())}>
                    <ArrowLeft01Icon className="w-6 h-6"/>
                </Button>
                <div className="my-12">
                    <h2 className="text-xl font-bold text-primary">Choose your plan !</h2>
                    <p className="text-gray-400">Choose the plan that suits you best</p>
                </div>
                <div>
                    <Chip color="danger" size="md" variant="solid" className="my-6 ml-auto leading-7 mr-2 block">
                        Recommended
                    </Chip>
                    <div className="flex flex-col gap-8 justify-between mb-24 mt-6">
                        <Checkbox
                            radius="full"
                            aria-label="Basic plan"
                            classNames={{
                                base: "inline-flex w-full max-w-md bg-gray-100 hover:bg-gray-200 items-center justify-start cursor-pointer rounded-lg gap-2 p-6 border-2 border-transparent data-[selected=true]:border-primary",
                                label: "w-full",
                            }}
                            isSelected={basicPlan}
                            onValueChange={setBasicPlan}
                        >
                            <div className="w-full flex justify-between gap-2 text-primary font-bold">
                                <span className="block">Basic</span>
                                <span className="block">$39.0</span>
                            </div>
                        </Checkbox>
                        <Checkbox
                            radius="full"
                            aria-label="Pro plan"
                            classNames={{
                                base: "inline-flex w-full max-w-md bg-gray-100 hover:bg-gray-200 items-center justify-start cursor-pointer rounded-lg gap-2 p-6 border-2 border-transparent data-[selected=true]:border-primary",
                                label: "w-full",
                            }}
                            isSelected={proPlan}
                            onValueChange={setProPlan}
                        >
                            <div className="w-full flex justify-between gap-2 text-primary font-bold">
                                <span className="block">Pro</span>
                                <span className="block">$69.0</span>
                            </div>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex flex-row gap-4 mx-auto">
                    <Button variant="bordered" className="my-4 font-bold rounded py-4 text-gray-700 px-12 self-end"
                            onClick={() => dispatch(prevStep())}>
                        Back
                    </Button>
                    <Button
                        className={`my-4 font-bold text-white rounded ${(!basicPlan && !proPlan) ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary'}  py-4 px-12 self-end`}
                        disabled={!basicPlan && !proPlan} onClick={() => dispatch(nextStep())} >
                        Next
                    </Button>
                </div>

            </form>
            <div className="w-full md:w-1/3 mx-auto">
                <h2 className="hidden md:block text-2xl font-bold text-primary">Payment method !</h2>
                <p className="text-gray-400">Choose your favorite payment method</p>
                <div className="flex flex-row gap-1 flex-wrap justify-between">
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={Mastercard} alt="Mastercard"/>
                    </Button>
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={Visa} alt="Visa"/>
                    </Button>
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={Paypal} alt="Paypal"/>
                    </Button>
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={GPay} alt="Google Pay"/>
                    </Button>
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={ApplePay} alt="Apple Pay"/>
                    </Button>
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={AmericanExpress} alt="American Express"/>
                    </Button>
                    <Button variant="bordered" className="border-gray-500 border-1">
                        <img src={Stripe} alt="Strip"/>
                    </Button>
                </div>
                <div>
                    <Input className="border border-gray-200 my-2" placeholder="Card holder name" />
                </div>
                <div>
                    <Button className="bg-danger w-full rounded-md text-white my-4">
                        Pay Now
                    </Button>
                    <p className="text-gray-400 text-center text-sm">
                        By clicking on Pay Now Button, you’re agreed all terms and conditions &
                        Privacy data of our platform and website.
                    </p>
                </div>
            </div>

        </div>
    );
}