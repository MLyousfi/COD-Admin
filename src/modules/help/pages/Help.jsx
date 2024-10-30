import { ArrowUpRight01Icon, File02Icon, MapsIcon, ViewIcon } from "hugeicons-react";
import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import { Link, useLocation } from "react-router-dom";

export default function Help() {
    const location = useLocation();

    const redirectLink = location.state ? location.state.from : '/dashboard';
    return (
        <DashboardLayout title="Help" hasSearchInput={false} hasReturnLink={redirectLink}>
            <div className="min-h-screen p-8">

                <div
                    className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-6 lg:max-w-2xl mx-auto my-24">
                    {/* Tariff Guide Card */}
                    <div
                        className="bg-transparent border border-gray-100 dark:border-zinc-900 hover:bg-gray-200/20 dark:hover:bg-zinc-900/40 transition-colors inline-block w-full md:w-1/2 rounded-lg">
                        <div className="p-8">
                            <div className="flex flex-col justify-center h-full">
                                <div className="mb-4 flex flex-col justify-center items-center gap-6">
                                    <File02Icon
                                        className="text-blue-500"
                                        size={36}
                                    />
                                    <h2 className="text-lg font-bold text-center">Tarif Guide</h2>
                                    <p className="text-gray-500 text-sm mt-1 text-center">
                                        Provide details about shipping services, so you can make informed decision about
                                        costs
                                    </p>
                                </div>

                                <Link to={""}
                                    className="rounded-full font-semibold dark:bg-zinc-900 text-sm flex flex-row py-3 items-center justify-center gap-2 shadow"
                                >
                                    <ViewIcon size={20} />
                                    See Details
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Help Center Card */}
                    <div
                        className="bg-transparent border border-gray-100 dark:border-zinc-900 hover:bg-gray-200/20 dark:hover:bg-zinc-900/40 transition-colors inline-block  w-full md:w-1/2 rounded-lg"
                    >
                        <div className="p-8">
                            <div className="flex flex-col justify-center h-full">
                                <div className="mb-4 flex flex-col justify-center items-center gap-6">
                                    <MapsIcon
                                        className="text-blue-500"
                                        size={36}
                                    />
                                    <h2 className="text-lg font-bold text-center">Help Center</h2>
                                    <p className="text-gray-500 text-sm mt-1 text-center">
                                        Increase security for your account by using multiple authentication steps.
                                    </p>
                                </div>

                                <Link to={""}
                                    className="rounded-full font-semibold dark:bg-zinc-900 text-sm flex flex-row py-3 items-center justify-center gap-2 shadow">
                                    Open Help Center
                                    <ArrowUpRight01Icon size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};