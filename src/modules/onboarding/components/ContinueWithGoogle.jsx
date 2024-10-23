import googleIcon from "@/modules/shared/assets/images/google.svg";
import {Button} from "@nextui-org/button";

export default function ContinueWithGoogle() {
    return (
        <Button className="rounded-full bg-primary">
            <img src={googleIcon} className="w-8" alt="Google Icon"/>
            <span className="font-bold text-white">Continue with Google</span>
        </Button>
    )
};