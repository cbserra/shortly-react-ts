import { useEffect } from 'react'
import { unzipSync } from 'zlib'
import {ReactComponent as ShortlyLogo} from '../images/logo.svg'
import shortlyLogo from '../images/logo.svg'
import Hamburger from './Hamburger'
import Menu from './Menu'
import './Nav.css'


const Nav = (props: { 
                isMobile: boolean, 
                isDesktop: boolean,
                toggleMenu: boolean, 
                toggleMenuFun: React.Dispatch<React.SetStateAction<boolean>>,
                toggleMobileMenuFun: any }
            ) => {
    const isDesktop = props.isDesktop
    const isMobile = props.isMobile
    const toggleMenuDisplay = props.toggleMenu
    const setToggleMenuDisplay = props.toggleMenuFun
    const toggleMobileMenuFun = props.toggleMobileMenuFun

    useEffect(() => {
        window.onscroll = () => {
            if (toggleMenuDisplay) {
                setToggleMenuDisplay(false)
            }
        }
    })

    return (
        <nav>
            {/* <img src={shortlyLogo} alt="shortly" /> */}
            <ShortlyLogo />
            { isDesktop && (
                // <Menu toggleMenu={true} />
                <Menu />
            )}
            { isMobile && (
                <>
                    <Menu toggleMenu={toggleMenuDisplay} />
                    <Hamburger onClickFun={toggleMobileMenuFun} />
                </>)}
        </nav>
    );
}

export default Nav