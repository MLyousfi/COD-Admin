import {useState} from 'react';

function SidebarLinkGroup({
                              children,
                              activeCondition,
                          }) {

    const [open, setOpen] = useState(activeCondition);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <li className={`p-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${activeCondition && 'from-info/[0.2] dark:from-info/[0.4] to-info/[0.1]'}`}>
            {children(handleClick, open)}
        </li>
    );
}

export default SidebarLinkGroup;