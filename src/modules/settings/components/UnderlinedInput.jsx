import { Input } from "@nextui-org/input";

export default function UnderlinedInput({ label, endContent, ...props }) {
    return (
        <Input
            label={label}
            variant="underlined"
            endContent={endContent}
            classNames={{
                label: "text-gray-600 dark:text-gray-400",
                input: "text-gray-900 dark:text-white",
                inputWrapper: [
                    "before:!content-none",
                    "after:!content-none",
                    "border-b-gray-300 dark:border-b-gray-700",
                    "group-data-[focus=true]:!border-b-blue-700",
                ].join(" ")
            }}
            {...props}
        />
    );
};