import {Navbar, NavbarBrand} from '@nextui-org/navbar';
import BrandLogo from '@/modules/shared/assets/images/cod-power-group-logo.svg';

// FIXME: get rid of this annoying issue on every component
// eslint-disable-next-line react/prop-types
export default function BlankLayout({children, showNavbar}) {
    return (
        <div className="w-full h-screen">
            <Navbar position='static' maxWidth='full'>
                <NavbarBrand className={`${showNavbar ? '' : 'hidden'} w-10/12 mx-auto my-12`}>
                    <img src={BrandLogo} className="my-12" alt="Logo"/>
                </NavbarBrand>
            </Navbar>
            <div>
                {children}
            </div>
        </div>
    );
}