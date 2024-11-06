import { NextUIProvider } from "@nextui-org/system";
import RoutersWrapper from "./core/routes";
import AuthProviderWrapper from "./core/providers/AuthProviderWrapper";
import ThemeProvider from "@/core/providers/ThemeContext.jsx";

export default function App() {

    return (
        <AuthProviderWrapper>
            <ThemeProvider>
                <NextUIProvider>

                    <RoutersWrapper />


                </NextUIProvider>
            </ThemeProvider>
        </AuthProviderWrapper>
    )
}