import BlankLayout from "@/modules/shared/layouts/BlankLayout";
import checkCircle from "@/modules/shared/assets/images/check-circle.svg";
import { RouteNames } from "@/core/constants/routes.js";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";

export default function RecoverPasswordEmailSent() {

    return (
        <BlankLayout>
            <div className="px-8 mx-auto text-center w-[25rem]">
                <h2 className="my-3 text-2xl font-bold text-primary">Recovery Method Sent !</h2>
                <p className="text-gray-400">Connect using your email address, and get a directly started to our
                    platforms</p>

                <img src={checkCircle} className="w-36 h-36 mx-auto my-8" alt="Check Icon" />

                <Button className=" bg-primary rounded w-full p-0">
                    <Link to={RouteNames.login} className="w-full font-bold text-white">
                        Back to Login
                    </Link>
                </Button>
            </div>
        </BlankLayout>
    );
}