import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Copy01Icon, Share08Icon, StarIcon } from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import trustPilotLogo from "@shared/assets/images/trustpilot.svg";
import messangerLogo from "@shared/assets/images/messanger.svg";
import whatsappLogo from "@shared/assets/images/whatsapp.svg";
import telegramLogo from "@shared/assets/images/telegram.svg";
import instagramLogo from "@shared/assets/images/instagram.svg";
import linkedinLogo from "@shared/assets/images/linkedin.svg";
import { Link, useLocation } from "react-router-dom";

export default function Referral() {

    const location = useLocation();
    const stats = [
        {
            label: "Total Earned Bonus Amount",
            value: "$129.00"
        },
        {
            label: "Referral Sent",
            value: "$0.00"
        },
        {
            label: "Successful Invites",
            value: "18"
        }
    ];

    const redirectLink = location.state ? location.state.from : '/dashboard';

    return (
        <DashboardLayout title="Referrals" hasSearchInput={false} hasReturnLink={redirectLink}>
            <div className="px-2 md:px-12 py-8">
                <div className="">
                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-8 mb-8 px-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col">
                                <span className="text-gray-400 text-sm mb-2">{stat.label}</span>
                                <span className="text-2xl font-semibold">{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex xl:flex-row flex-col justify-start gap-6 px-6">
                        {/* Referral Card */}
                        <Card className="bg-transparent shadow-sm dark:hover:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 py-4 w-full hover:bg-gray-200/20">
                            <CardBody className="p-6 flex flex-col gap-4">
                                <h3 className="text-xl font-bold mb-2">
                                    Refer a friend, Earn 100$ !
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Share your unique referral link to your friends ! Copy it and share it! That&#39;s
                                    it !
                                </p>

                                <div className="flex items-center gap-4 mb-6">
                                    <AvatarGroup
                                        size="md">
                                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" isDisabled/>
                                        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" isDisabled/>
                                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" isDisabled/>
                                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" isDisabled/>
                                        <Avatar name='15K' src='' isDisabled/>
                                    </AvatarGroup>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 dark:bg-zinc-900 bg-gray-200 dark:hover:bg-zinc-700 justify-evenly rounded-full hover:bg-gray-300 transition-colors max-w-fit"
                                        endContent={<Copy01Icon size={18} />}
                                    >
                                        <span>https://cod.codpowergroup.com/Htsghd</span>
                                    </Button>
                                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                                        <Share08Icon />
                                        Share a link
                                    </Button>
                                </div>
                                <div className="flex flex-row flex-wrap gap-2 mt-4">
                                    <Link to={""}>
                                        <img
                                            src={messangerLogo}
                                            alt="Messanger"
                                            className="h-6"
                                        />
                                    </Link>
                                    <Link to={""}>
                                        <img
                                            src={whatsappLogo}
                                            alt="Whatsapp"
                                            className="h-6"
                                        />
                                    </Link>
                                    <Link to={""}>
                                        <img
                                            src={telegramLogo}
                                            alt="Telegram"
                                            className="h-6"
                                        />
                                    </Link>
                                    <Link to={""}>
                                        <img
                                            src={instagramLogo}
                                            alt="Instagram"
                                            className="h-6"
                                        />
                                    </Link>
                                    <Link to={""}>
                                        <img
                                            src={linkedinLogo}
                                            alt="Linkedin"
                                            className="h-6"
                                        />
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Review Card */}
                        <Card className="bg-transparent shadow-sm dark:hover:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 py-3 w-full hover:bg-gray-200/20">
                            <CardBody className="p-6 flex flex-col gap-4">
                                <h3 className="text-xl font-bold mb-2">
                                    Write us a Review
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    Please enter a valid email to this website, so as to recover your account by your inbox.
                                </p>

                                <div className="mb-4">
                                    <div className="flex gap-0.5 bg-green-500 w-fit px-1 py-1 mb-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                fill="white"
                                                className="text-white"
                                                size={18}
                                            />
                                        ))}
                                    </div>

                                    <span className="text-white font-semibold">13k reviews on</span>
                                </div>

                                <div className="flex flex-row flex-nowrap items-center gap-2">
                                    <img
                                        src={trustPilotLogo}
                                        alt="Trustpilot"
                                        className="h-8"
                                    />
                                    <span className="text-xl font-bold mt-1">Trustpilot</span>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
        ;
};
