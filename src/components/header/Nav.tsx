import {ReactComponent as ShortlyLogo} from '../../images/logo.svg'
import Hamburger from './Hamburger'
import Menu from './Menu'
import './Nav.css'
import { useCallback } from 'react'

type Props = {
    isMobile: boolean
    isDesktop: boolean
    toggleMenuDisplay: boolean
    setToggleMenuDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = (props: Props) => {
    const {isMobile, isDesktop} = props
    const {toggleMenuDisplay, setToggleMenuDisplay} = props

    const toggleMobileMenu = useCallback(
      () => {
        setToggleMenuDisplay((prevValue) => isDesktop ? isDesktop : !prevValue)
      },
      [isDesktop, setToggleMenuDisplay],
    )

    return (
        <nav>
            <ShortlyLogo />
            { isDesktop && (
                <Menu 
                    toggleMenu={false} 
                />
            )}
            { isMobile && (
                <>
                    <Menu 
                        toggleMenu={toggleMenuDisplay} 
                    />
                    <Hamburger 
                        onClickFun={toggleMobileMenu} 
                    />
                </>
            )}
        </nav>
    );
}

export default Nav