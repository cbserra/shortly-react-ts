import {ReactComponent as ShortlyLogo} from '../../images/logo.svg'
import Hamburger from './Hamburger'
import Menu from './Menu'
import './Nav.css'
import { DeviceType } from '../../types/ShortenTypes'
import { useCallback, useEffect } from 'react'

type Props = {
    isMobile: boolean
    // setIsMobile: (value: React.SetStateAction<boolean>) => void
    isDesktop: boolean
    // setIsDesktop: (value: React.SetStateAction<boolean>) => void
    toggleMenuDisplay: boolean
    setToggleMenuDisplay: React.Dispatch<React.SetStateAction<boolean>>
    previousDeviceType?: DeviceType
    setPreviousDeviceType?: (value: React.SetStateAction<DeviceType>) => void
    currentDeviceType?: DeviceType
    setCurrentDeviceType?:  (value: React.SetStateAction<DeviceType>) => void
}

const Nav = (props: Props) => {
    // const {isMobile, setIsMobile} = props
    // const {isDesktop, setIsDesktop} = props
    const {isMobile, isDesktop} = props
    const {toggleMenuDisplay, setToggleMenuDisplay} = props
    // const {currentDeviceType: deviceType, setCurrentDeviceType: setDeviceType} = props

    const toggleMobileMenu = useCallback(
      () => {
        // console.log(`🚀 ~ toggleMobileMenu ~ showMobileMenu:`, showMobileMenu)
        // console.log(`🚀 ~ toggleMobileMenu ~ toggleMenuDisplay:`, toggleMenuDisplay)
        // setToggleMenuDisplay(showMobileMenu) 
        setToggleMenuDisplay((prevValue) => isDesktop ? isDesktop : !prevValue)
      },
      [isDesktop, setToggleMenuDisplay], //, toggleMenuDisplay],
    )
    // (showMobileMenu: boolean): void => {
    //     console.log(`🚀 ~ toggleMobileMenu ~ showMobileMenu:`, showMobileMenu)
    // //   console.log(`🚀 ~ toggleMobileMenu ~ toggleMenuDisplay:`, toggleMenuDisplay)
    //     setToggleMenuDisplay(showMobileMenu) 
    // }

    // useEffect(() => {
    //     console.log(`🚀 ~ Nav ~ deviceType:`, deviceType)    
    // }, [deviceType])
    

    // useEffect(() => {
    //     // setPreviousDeviceType(currentDeviceType)
    //     // setCurrentDeviceType(isDesktop ? DeviceType.Desktop : DeviceType.Mobile)
    //     console.log(`🚀 ~ useEffect ~ props.isDesktop:`, props.isDesktop)
    //     console.log(`🚀 ~ useEffect ~ props.isMobile:`, props.isMobile)

    //     setIsDesktop(props.isDesktop)
    //     setIsMobile(props.isMobile)
    // }, [props.isMobile, props.isDesktop, setIsDesktop, setIsMobile])

    // useEffect(() => {
    //     console.log(`🚀 ~ useEffect ~ isDesktop:`, isDesktop)
    //     console.log(`🚀 ~ useEffect ~ isMobile:`, isMobile)

    //     setIsDesktop(isDesktop)
    //     setIsMobile(isMobile)
    // }, [isMobile, isDesktop])

    // const handleWindowResize = (matches: any): void => {
    //     const mediaQuery = window.matchMedia('(min-width: 1024px)')

    //     if (mediaQuery.matches && !isDesktop) {
    //         console.log(`🚀 ~ handleWindowResize ~ mediaQuery:`, mediaQuery)
    //         console.log(`🚀 ~ handleWindowResize ~ now matches Desktop:`, matches)
    //         setIsDesktop((prevVal) => !prevVal)
    //         setIsMobile((prevVal) => !prevVal)
    //     } else if (!mediaQuery.matches && !isMobile) {
    //         console.log(`🚀 ~ handleWindowResize ~ mediaQuery:`, mediaQuery)
    //         console.log(`🚀 ~ handleWindowResize ~ now matches Mobile:`, matches)
    //         setIsMobile((prevVal) => !prevVal)
    //         setIsDesktop((prevVal) => !prevVal)
    //     }

    // }

    // const listenToScroll = (): void => {
    //     let heightToHideFrom = 100;
    //     const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    //     if (isMobile && winScroll > heightToHideFrom) {  
            
    //         if (toggleMenuDisplay) {
    //             console.debug(`🚀 ~ listendToScroll ~ winScroll:`, winScroll)
    //             console.debug(`🚀 ~ listenToScroll ~ heightToHideFrom:`, heightToHideFrom)
    //             console.debug(`🚀 ~ listenToScroll ~ toggleMenuDisplay:`, toggleMenuDisplay)
                
    //             setToggleMenuDisplay(false);
    //         }
    //     }
    // };

    // useEffect(() => {   
    //   window.addEventListener("scroll", listenToScroll);
    //   return () => 
    //       window.removeEventListener("scroll", listenToScroll); 
    // })

    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowResize)

    //     return () => {
    //         window.removeEventListener("resize", handleWindowResize);
    //     };
    // })

    return (
        <nav>
            <ShortlyLogo />
            { isDesktop && (
                <Menu 
                    toggleMenu={false} 
                    // deviceType={DeviceType.Desktop} 
                    // setDeviceType={setDeviceType} 
                />
            )}
            { isMobile && (
                <>
                    <Menu 
                        toggleMenu={toggleMenuDisplay} 
                        // deviceType={DeviceType.Mobile} 
                        // setDeviceType={setDeviceType} 
                    />
                    {/* <Menu toggleMenu={false} deviceType={DeviceType.Mobile} setDeviceType={setDeviceType} /> */}
                    <Hamburger 
                        onClickFun={toggleMobileMenu} 
                    />
                </>
            )}
        </nav>
    );
}

export default Nav