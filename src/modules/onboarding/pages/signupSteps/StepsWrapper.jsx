import signUpImage from "@shared/assets/images/onboarding/signup-image.png";

export default function StepsWrapper({children}) {

    return (
        <div className="flex flex-row w-full justify-between items-center gap-4 relative h-screen">
            <form action=""
                  className="md:w-1/2 w-full md:max-w-[25rem] mx-8 md:mx-auto flex flex-col justify-center p-0">

                {children}

            </form>

            <img src={signUpImage} className="hidden md:block w-1/2 self-end"
                 alt="Signup Image"/>

        </div>
    );
}