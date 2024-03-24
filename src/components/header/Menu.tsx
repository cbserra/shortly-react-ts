import { useEffect, useState } from 'react'
import './Menu.css'

type Props = {
    toggleMenu?: boolean | undefined,
    deviceType: string
}

const Menu = (props: Props) => {
    const getMenuClass = (toggleMenu: boolean | undefined): string => {
        return toggleMenu === undefined ? '' : (toggleMenu ? 'show' : 'hide')
    }

    const generateMenuClassNames = (menuClass: string, deviceType: string): string => {
        return [menuClass].concat(deviceType).join(' ')
    }

    const [toggleMenu, setToggleMenu] = useState(props.toggleMenu)
    const [deviceType, setDeviceType] = useState(props.deviceType)

    const [menuClass,  setMenuClass]  =  useState(getMenuClass(props.toggleMenu))
    const [classNames, setClassNames] =  useState(generateMenuClassNames(menuClass, deviceType))
    
    // const menuClass = props.toggleMenu === undefined ? '' : (props.toggleMenu ? 'show' : 'hide')
    // const classNames = props.deviceType

    useEffect(() => {
        setToggleMenu(props.toggleMenu)
        setMenuClass(getMenuClass(props.toggleMenu))
        setClassNames(generateMenuClassNames(menuClass, deviceType))
        
        console.log(`🚀 ~ useEffect ~ props.toggleMenu:`, props.toggleMenu)
        // console.log(`🚀 ~ useEffect ~ toggleMenu:`, toggleMenu)
    }, [deviceType, menuClass, props.toggleMenu, toggleMenu])
    

    useEffect(() => {
        setDeviceType(props.deviceType)
        setClassNames(generateMenuClassNames(menuClass, props.deviceType))
        
        console.log(`🚀 ~ useEffect ~ props.deviceType:`, props.deviceType)
        console.log(`🚀 ~ useEffect ~ deviceType:`, deviceType)
    }, [deviceType, menuClass, props.deviceType])

    useEffect(() => {
        console.log(`🚀 ~ Menu ~ classNames:`, classNames)    
    }, [classNames])

    // useEffect(() => {
    //     console.log(`🚀 ~ Menu ~ toggleMenu:`, toggleMenu)
    //     console.log(`🚀 ~ Menu ~ deviceType:`, deviceType)
    // }, [toggleMenu, deviceType])
    
    return (
        <ul id="nav-menu" className={classNames}>
            <li id="features-link">Features</li>
            <li id="pricing-link">Pricing</li>
            <li id="resources-link">Resources</li>
            <li className='hor-line'></li>
            <li id="login-link" className="push-right">Login</li>
            <li id="sign-up-link" className="sign-up">
                <button className="round-blue-btn">Sign Up</button>
            </li>
        </ul>
    )
}

export default Menu