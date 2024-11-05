import PropTypes from 'prop-types';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown01Icon, PencilEdit01Icon, PencilIcon } from "hugeicons-react";
import { countries_code } from '../../../core/utils/dataCountries';
import { Input } from '@nextui-org/input';

export default function NumTelSelect({
    id,
    open,
    disabled = false,
    onToggle,
    onChange,
    selectedValue,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && open) {
                onToggle();
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onToggle, open, ref]);

    const [query, setQuery] = useState("");

    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const [position, setPosition] = useState("bottom");

    useEffect(() => {
        if (open) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;

            // Set position based on available space
            setPosition(spaceBelow > dropdownHeight ? "bottom" : "top");


        }
    }, [open]);

    return (
        <div ref={ref} className="flex w-full justify-between items-end gap-2">
            <div className="mt-1 relative w-fit">
                <button ref={triggerRef}
                    type="button"
                    className={` p-2 cursor-pointer
                    ${disabled ? "bg-neutral-100" : "bg-white dark:bg-base_dark"
                        } relative w-full border-b-3 outline-none border-b-[#00000030] dark:border-b-[#ffffff20] 
                         shadow-sm pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none  focus:!border-b-blue-500 sm:text-sm`}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={onToggle}
                    disabled={disabled}
                >
                    <span className="truncate flex items-center">
                        {selectedValue.code}
                    </span>
                    <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none 
                            ${disabled ? "hidden" : ""
                            }`}
                    >
                        <ArrowDown01Icon />
                    </span>
                </button>



                <AnimatePresence>
                    {open && (
                        <motion.ul
                            ref={dropdownRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            style={{
                                position: "absolute",
                                top: position === "bottom" ? "100%" : "auto",
                                bottom: position === "top" ? "100%" : "auto",
                            }}

                            className="absolute flex flex-col z-50 mt-1 w-full bg-white dark:bg-base_card 
                            shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 
                            focus:outline-none sm:text-sm"
                            tabIndex={-1}
                            role="listbox"
                            aria-labelledby="listbox-label"
                            aria-activedescendant="listbox-option-3"
                        >
                            <div className={`${position === "bottom" ? 'order-1' : 'order-2'}  sticky top-0 z-100 bg-white dark:bg-base_card`}>
                                <li className=" text-gray-900 dark:text-gray-200 cursor-default select-none relative">
                                    <input
                                        type="search"
                                        name="search"
                                        autoComplete={"off"}
                                        className="outline-none py-2 px-3 focus:border-gray-500 block w-full sm:text-sm border-gray-300 dark:border-[#ffffff10] rounded-md"
                                        placeholder={"Search"}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </li>
                                <hr />
                            </div>

                            <div
                                className={
                                    `max-h-64 ${position === "bottom" ? 'order-2' : 'order-1'} scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll`
                                }
                            >
                                {countries_code.filter((country) =>
                                    country.code.toLowerCase().startsWith(query.toLowerCase()) ||
                                    country.name.toLowerCase().startsWith(query.toLowerCase()) ||
                                    country.telephoneCode.toLowerCase().startsWith(query.toLowerCase())
                                ).length === 0 ? (
                                    <li className="text-gray-900 dark:text-gray-200 cursor-default select-none relative py-2 pl-3 pr-9">
                                        None
                                    </li>
                                ) : (
                                    countries_code.filter((country) =>
                                        country.code.toLowerCase().startsWith(query.toLowerCase()) ||
                                        country.name.toLowerCase().startsWith(query.toLowerCase()) ||
                                        country.telephoneCode.toLowerCase().startsWith(query.toLowerCase())
                                    ).map((value, index) => {
                                        return (
                                            <li
                                                key={`${id}-${index}`}
                                                className={`${(value.flag + ' ' + value.telephoneCode) === selectedValue.code ? 'hover:bg-gray-50 dark:hover:bg-gray-800 bg-glb_blue' : ' hover:bg-gray-50 dark:hover:bg-gray-800'} 
                                                cursor-pointer   text-gray-900 dark:text-gray-200 select-none relative py-2 pl-3 pr-9 
                                                flex items-center  transition`}
                                                id="listbox-option-0"
                                                role="option"
                                                onClick={() => {
                                                    onChange('code', value.flag + ' ' + value.telephoneCode);
                                                    setQuery("");
                                                    onToggle();
                                                }}
                                            >


                                                <span className="font-normal truncate">
                                                    {value.flag + ' ' + value.telephoneCode}
                                                </span>

                                            </li>
                                        );
                                    })
                                )}
                            </div>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
            <Input onChange={(e) => onChange('num', e.target.value)}
                placeholder='661 678905'
                type="text" variant="underlined" color="primary"
                classNames={{
                    label: ["!text-[#00000050] dark:!text-[#FFFFFF30]"],


                }}
                endContent={
                    <PencilEdit01Icon className="text-[#00000030] dark:text-[#ffffff30]" />
                }
            />

        </div>
    );
}

// PropTypes for validation
NumTelSelect.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.shape({
        code: PropTypes.string.isRequired,
        num: PropTypes.string.isRequired,
    }).isRequired,
};


