import { Navbar, NavbarBrand } from '@nextui-org/navbar';
import codPowerGroupLogo from "@shared/assets/images/cod-power-group-logo.svg";
import codPowerGroupLogoDark from "@shared/assets/images/cod-logo-dark.svg";
import { useThemeProvider } from '../../../core/providers/ThemeContext';
import { Link } from 'react-router-dom';

// FIXME: get rid of this annoying issue on every component
// eslint-disable-next-line react/prop-types
export default function BlankLayout({ children, showNavbar }) {
    const { currentTheme, changeCurrentTheme } = useThemeProvider();
    return (
        <div className="w-full h-screen">
            <Navbar position='static' maxWidth='full'>
                <NavbarBrand className={`${showNavbar ? '' : 'hidden'} w-10/12 mx-auto my-12`}>
                    <Link to='#' className='ml-6 mt-6'>
                        {currentTheme === 'light' ? <img src={codPowerGroupLogo} alt="cod power group logo" className="w-20" /> :
                            <img src={codPowerGroupLogoDark} alt="cod power group logo" className="w-20" />}</Link>
                </NavbarBrand>
            </Navbar>
            <div className='flex-grow mt-10'>
                {children}
            </div>
        </div>
    );
}