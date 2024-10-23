import { useThemeProvider } from "@/core/providers/ThemeContext.jsx"
import {Switch} from "@nextui-org/switch";

export default function ThemeToggle() {
    const { currentTheme, changeCurrentTheme } = useThemeProvider();

    return (
        <div>
            <input
                type="checkbox"
                name="light-switch"
                id="light-switch"
                className="light-switch sr-only"
                checked={currentTheme === "light"}
                onChange={() => changeCurrentTheme(currentTheme === "light" ? "dark" : "light")}
            />
            <label
                className="flex items-center justify-center cursor-pointer w-8 h-8 hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full"
                htmlFor="light-switch"
            >
                <Switch defaultSelected aria-label="Automatic updates" size="sm" isSelected={currentTheme === "dark"} onChange={() => changeCurrentTheme(currentTheme === "light" ? "dark" : "light")}/>
                <span className="sr-only">Switch to light / dark version</span>
            </label>
        </div>
    );
}