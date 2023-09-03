import { useEffect } from 'react'
import { unzipSync } from 'zlib'
import {ReactComponent as ShortlyLogo} from '../images/logo.svg'
import shortlyLogo from '../images/logo.svg'
import Hamburger from './Hamburger'
import Menu from './Menu'
import './Nav.css'
import MediaQuery from 'react-responsive/dist/Component'
import { useMediaQuery } from 'react-responsive'


const Nav = (props: { 
                isMobile: boolean, 
                isDesktop: boolean,
                toggleMenu: boolean, 
                toggleMenuFun: React.Dispatch<React.SetStateAction<boolean>>,
                toggleMobileMenuFun: any }
            ) => {
    // const isDesktop = props.isDesktop
    // const isMobile = props.isMobile
    const toggleMenuDisplay = props.toggleMenu
    const setToggleMenuDisplay = props.toggleMenuFun
    const toggleMobileMenuFun = props.toggleMobileMenuFun

    const handleMediaQueryChange = (matches: any) => {
        
        console.log(`🚀 ~ handleMediaQueryChange ~ matches:`, matches)
    // matches will be true or false based on the value for the media query
    }

    const handleWindowResize = (event: UIEvent) => {
        console.log(`🚀 ~ handleWindowResize ~ event:`, event)
    }

    const isDesktop = useMediaQuery(
        { minWidth: 1024 }, undefined,  handleMediaQueryChange
    );
    console.log(`🚀 ~ isDesktop:`, isDesktop)
    
    const isMobile = useMediaQuery(
        { maxWidth: 1023 }, undefined,  handleMediaQueryChange
    );
    console.log(`🚀 ~ isMobile:`, isMobile)

    useEffect(() => {
        window.onscroll = () => {
            if (toggleMenuDisplay) {
                setToggleMenuDisplay(false)
            }
        }
    })

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    })

    return (
        <nav>
            <ShortlyLogo />
            { isDesktop && (
                // <Menu toggleMenu={true} />
                <Menu />
            )}
            { isMobile && (
                <>
                    <Menu toggleMenu={toggleMenuDisplay} />
                    <Hamburger onClickFun={toggleMobileMenuFun} />
                </>
            )}
            {/* <MediaQuery minWidth={1024} onChange={handleMediaQueryChange} >
                <Menu toggleMenu={true} />
            </MediaQuery>
            <MediaQuery maxWidth={1023} >
                <Menu toggleMenu={toggleMenuDisplay} />
                <Hamburger onClickFun={toggleMobileMenuFun} />
            </MediaQuery> */}
        </nav>
    );
}

export default Nav