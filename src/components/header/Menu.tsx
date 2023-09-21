import { useEffect, useState } from 'react'
import './Menu.css'
import { DeviceType } from '../../types/ShortenTypes'

type Props = {
    toggleMenu?: boolean | undefined
    setToggleMenu?: (value: React.SetStateAction<boolean>) => void
    deviceType?: DeviceType | undefined
    setDeviceType?: (value: React.SetStateAction<DeviceType>) => void
}

type MenuLink = {
    classNames?: string | undefined
    id?: string | undefined
    title?: string
    useButton?: boolean
    buttonClassname?: string
}

const MENU_LINKS: MenuLink[] = [
    {id: "features-link", title: "Features" },
    {id: "pricing-link", title: "Pricing" },
    {id: "resources-link", title: "Resources" },
    {classNames: 'hor-line', useButton: false },
    {id: "login-link", classNames: "push-right", title: "Login" },
    {id: "sign-up-link",classNames: "sign-up", buttonClassname: "round-blue-btn", title: "Sign Up" },
]

const Menu = (props: Props) => {
    // const getMenuClass = (toggleMenu: boolean | undefined): string => {
    //     return toggleMenu === undefined ? '' : (toggleMenu ? 'show' : 'hide')
    // }

    type MenuProps = {
        menuLinks: MenuLink[]
    }

    const MenuLinks = (props: MenuProps) => {
        return (
            <ul id="nav-menu" className={classNames}>
                {props.menuLinks
                    .map((link, index) => 
                        <li key={index} id={link.id} className={link.classNames}>
                            <button className={link.buttonClassname ? link.buttonClassname : 'button-link'}>
                                {link.title}
                            </button>
                        </li>)
                }
            </ul>
        )
    }

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
        <MenuLinks key={1}  menuLinks={MENU_LINKS} />
    )
}

export default Menu