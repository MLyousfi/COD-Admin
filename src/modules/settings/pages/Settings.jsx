import { Tab, Tabs } from "@nextui-org/tabs";
import { Avatar } from "@nextui-org/avatar";
import { ArrowLeft01Icon, Delete02Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { SignupSteps } from "@/core/constants/signup.js";
import startsWith from "lodash.startswith";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { registerStep4Schema } from "@shared/schemes/userSchema.js";
import UnderlinedInput from "@/modules/settings/components/UnderlinedInput.jsx";
import { COUNTRIES } from "@/core/constants/countries.js";
import CountrySelector from "@shared/components/CountrySelector.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import { useLocation } from "react-router-dom";

export default function Settings() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validation, setValidation] = useState({});
    const location = useLocation();
    const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
    const [country, setCountry] = useState(SignupSteps.defaultCountry);
    const handlePhoneInputChange = async (phoneNumber) => {
        setPhoneNumber(phoneNumber);
        const check = await registerStep4Schema.safeParse({ phoneNumber });
        if (!check.success) {
            setValidation(check.error.flatten().fieldErrors);
        } else {
            setValidation({});
        }
    }

    const [visibleNotifications, setVisibleNotifications] = useState(4);

    // Function to load more notifications

    // Retrieve the redirection link from the state
    const redirectLink = location.state.from;
    return (
        <DashboardLayout title="Settings" hasSearchInput={false} hasReturnLink={redirectLink}>

            <div className="px-2 md:ps-12 md:pe-6">
                <Tabs
                    aria-label="Settings tabs"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tab: "text-white",
                        tabList: "",
                        cursor: "bg-blue-500 text-white",
                        tabContent: "group-data-[selected=true]:dark:text-white text-gray-600"
                    }}
                >
                    <Tab key="account" title="Account Settings">
                        <div className="mt-6 space-y-8 ps-4">
                            {/* Profile Section */}
                            <div className="flex items-start gap-6">
                                <div className="relative rounded-lg overflow-hidden">
                                    <div
                                        className="absolute inset-0 items-center z-10 gap-2 flex flex-col justify-center bg-zinc-900/60">
                                        <Button isIconOnly className="border rounded-full" variant="light">
                                            <Delete02Icon size={18} className="text-white" />
                                        </Button>
                                        <span className="text-sm text-white">Delete</span>
                                    </div>
                                    <Avatar
                                        className="w-32 h-32 rounded-lg"
                                        src="https://i.pravatar.cc/150"
                                        alt="Profile Picture"
                                    />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <UnderlinedInput label="First Name" />
                                        <UnderlinedInput
                                            label="Display Name"
                                            defaultValue="Viviane123"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <UnderlinedInput label="Company Name" />
                                        <UnderlinedInput label="Last Name" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <UnderlinedInput label="Email" />
                                        <UnderlinedInput label="CIN" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex gap-2">
                                            <PhoneInput
                                                containerClass="shadow-sm border-b-2 border-b-gray-300 dark:border-b-gray-700 dark:!bg-transparent"
                                                inputClass="!bg-transparent !h-full !w-full !border-0"
                                                buttonClass="!border-0 [&>.selected-flag]:dark:!bg-black [&]!hover:bg-transparent"
                                                searchClass="dark:!bg-zinc-800 [&>input]:!border-0 [&>input]:!w-full !m-0 p-0 !border-0 !pb-2"
                                                dropdownClass="ml-auto dark:!bg-zinc-800 [&>.country.highlight]:dark:!bg-zinc-900  [&>.country:hover]:dark:!bg-zinc-700"
                                                disableSearchIcon={true}
                                                country={(SignupSteps.defaultCountry).toLowerCase()}
                                                value={phoneNumber}
                                                isValid={(inputNumber, country, countries) => {
                                                    return countries.some((country) => {
                                                        return (startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber)) && inputNumber.length > 8;
                                                    });
                                                }}
                                                onChange={phone => handlePhoneInputChange(phone)}
                                                enableSearch={true}
                                            />
                                        </div>
                                        <UnderlinedInput label="Address" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <CountrySelector
                                            id={'countries'}
                                            className="bg-red-400"
                                            open={isCountrySelectOpen}
                                            containerClass="!mt-3"
                                            buttonClass="!bg-transparent !border-0 !border-b-2 !rounded-none !border-gray-300 dark:!border-gray-700"
                                            onToggle={() => setIsCountrySelectOpen(!isCountrySelectOpen)}
                                            onChange={val => setCountry(val)}
                                            selectedValue={COUNTRIES.find(option => option.value === country)}
                                        />
                                        <Select
                                            variant="underlined"
                                            label="City"
                                            className="max-w-xs">
                                            <SelectItem key="texas">
                                                Texas
                                            </SelectItem>
                                            <SelectItem key="california">
                                                California
                                            </SelectItem>
                                            <SelectItem key="florida">
                                                Florida
                                            </SelectItem>
                                        </Select>
                                    </div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <UnderlinedInput
                                            label="State"
                                            endContent={null} // Remove pencil icon
                                        />
                                        <UnderlinedInput
                                            label="Zip Code"
                                            endContent={null} // Remove pencil icon
                                        />
                                    </div>

                                    {/* Error Message */}
                                    <div className="hidden items-center gap-2 text-red-500 text-sm">
                                        <span>Error: your password does n&#39;t matched, please enter a valid password.</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <Button color="primary" className="bg-blue-600 rounded-full">
                                            Update Profile
                                        </Button>
                                        <Button color="danger" variant="light" className="rounded-full">
                                            Reset All
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab key="login" title="Login & Security" />
                    <Tab key="notifications" title="Notifications" />
                    <Tab key="subscription" title="My Subscription" />
                    <Tab key="withdrawal" title="Withdrawal Methods" />
                </Tabs>
            </div>
        </DashboardLayout>
    )
        ;
};
