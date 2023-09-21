import { useEffect, useState } from 'react'
import './Menu.css'
import { DeviceType } from '../../types/ShortenTypes'

type Props = {
    toggleMenu?: boolean | undefined
    setToggleMenu?: (value: React.SetStateAction<boolean>) => void
    deviceType?: DeviceType | undefined
    setDeviceType?: (value: React.SetStateAction<DeviceType>) => void
}

const Menu = (props: Props) => {
    // const getMenuClass = (toggleMenu: boolean | undefined): string => {
    //     return toggleMenu === undefined ? '' : (toggleMenu ? 'show' : 'hide')
    // }

    const getMenuClass = (toggleMenu: boolean | undefined): string => {
        return (toggleMenu === undefined || !toggleMenu) ? '' : 'show'
    }

    // const generateMenuClassNames = (menuClass: string, deviceType: DeviceType | undefined): string => {
    //     return [menuClass].concat(deviceType?.toLowerCase() || '').join(' ')
    // }

    // const {toggleMenu, setToggleMenu} = props
    const {deviceType, setDeviceType} = props

    const [menuClass,  setMenuClass]  =  useState(getMenuClass(props.toggleMenu))
    // const [classNames, setClassNames] =  useState(generateMenuClassNames(menuClass, deviceType))
    const [classNames, setClassNames] =  useState(menuClass)
    
    // const menuClass = props.toggleMenu === undefined ? '' : (props.toggleMenu ? 'show' : 'hide')
    // const classNames = props.deviceType

    useEffect(() => {
        setMenuClass(getMenuClass(props.toggleMenu))
        // setClassNames(generateMenuClassNames(menuClass, deviceType))
        setClassNames(menuClass)
        
        console.log(`🚀 ~ useEffect ~ props.toggleMenu:`, props.toggleMenu)
        // console.log(`🚀 ~ useEffect ~ toggleMenu:`, toggleMenu)
    }, [deviceType, menuClass, props.toggleMenu])
    

    // useEffect(() => {
    //     setDeviceType(props.deviceType?)
    //     setClassNames(generateMenuClassNames(menuClass, props.deviceType))
        
    //     console.log(`🚀 ~ useEffect ~ props.deviceType:`, props.deviceType)
    //     // console.log(`🚀 ~ useEffect ~ deviceType:`, deviceType)
    // }, [menuClass, props.deviceType, setDeviceType])

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