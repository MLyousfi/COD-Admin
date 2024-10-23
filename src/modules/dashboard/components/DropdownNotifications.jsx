import Transition from '@/core/utils/Transition.jsx';
import { Button } from "@nextui-org/button";
import { ArrowLeft01Icon, Database02Icon, Notification01Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function DropdownNotifications({ align }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div className="relative lg:inline-flex">
            <Button
                ref={trigger}
                isIconOnly
                className={`overflow-visible bg-gray-100 dark:bg-gray-950 rounded-full flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 ${dropdownOpen && 'bg-gray-200 dark:bg-gray-800'}`}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}>
                <span className="sr-only">Notifications</span>
                <Notification01Icon className="text-gray-500" />
                <div
                    className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 dark:border-gray-900 rounded-full"></div>
            </Button>

            <Transition
                className={`origin-top-right z-10 fixed lg:absolute min-h-screen lg:min-h-fit top-0 lg:top-full -mr-48 sm:mr-0 w-full lg:w-fit lg:min-w-80 bg-white dark:bg-black border border-gray-200 dark:border-gray-700/60 py-1.5 lg:rounded-lg shadow-lg overflow-y-scroll lg:mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div
                        className=" pt-1.5 pb-2 px-4 flex flex-row items-center gap-2">
                        <Button onClick={() => setDropdownOpen(false)} variant='light' isIconOnly>
                            <ArrowLeft01Icon />
                        </Button>
                        <h3 className='text-lg font-semibold text-gray-600 dark:text-gray-200'>Notifications</h3>
                    </div>
                    <ul className='flex flex-col gap-2 px-4 py-2'>
                        <li className="rounded-md dark:bg-gray-700/20">
                            <Link
                                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                                to={"#"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}>

                                <div
                                    className='flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-1 w-full overflow-x-hidden'>
                                    <div className='p-2 mr-0 sm:mr-4 bg-yellow-100 rounded max-h-fit'>
                                        <Database02Icon size={20} className='text-orange-400'/>
                                    </div>
                                    <div>
                                        <h4 className='text-base sm:text-lg font-semibold'>Stock Alert.</h4>
                                        <p className='text-gray-600 dark:text-gray-400'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
                                            perspiciatis!
                                        </p>
                                    </div>
                                    <span className='inline-block font-semibold text-xs sm:text-sm mt-2 sm:mt-0'>Learn More</span>
                                </div>

                            </Link>
                        </li>
                        <li className="rounded-md bg-gray-300/60 dark:bg-blue-800/30">
                            <Link
                                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                                to={"#"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}>

                                <div
                                    className='flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-1 w-full overflow-x-hidden'>
                                    <div className='p-2 mr-0 sm:mr-4 bg-yellow-100 rounded max-h-fit'>
                                        <Database02Icon size={20} className='text-orange-400'/>
                                    </div>
                                    <div>
                                        <h4 className='text-base sm:text-lg font-semibold'>Stock Alert.</h4>
                                        <p className='text-gray-600 dark:text-gray-400'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
                                            perspiciatis!
                                        </p>
                                    </div>
                                    <span className='inline-block font-semibold text-xs sm:text-sm mt-2 sm:mt-0'>Learn More</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    )
}

export default DropdownNotifications;