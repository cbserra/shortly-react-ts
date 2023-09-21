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
    useButton: boolean
    buttonClassname?: string 
}

const MENU_LINKS: MenuLink[] = [
    {id: "features-link", title: "Features", useButton: true, buttonClassname: 'button-link' },
    {id: "pricing-link", title: "Pricing", useButton: true, buttonClassname: 'button-link' },
    {id: "resources-link", title: "Resources", useButton: true, buttonClassname: 'button-link' },
    {classNames: 'hor-line', useButton: false },
    {id: "login-link", classNames: "push-right", title: "Login", useButton: true, buttonClassname: 'button-link' },
    {id: "sign-up-link", classNames: "sign-up", buttonClassname: "round-blue-btn", title: "Sign Up", useButton: true },
]

const Menu = (props: Props) => {
    // const getMenuClass = (toggleMenu: boolean | undefined): string => {
    //     return toggleMenu === undefined ? '' : (toggleMenu ? 'show' : 'hide')
    // }

    type LinkProp = {
        link: MenuLink
        // keyProp: number
    }

    type MenuProps = {
        menuLinks: MenuLink[]
    }

    const MenuLink = (props: LinkProp) => {
        // if (props.link.useButton) {
            return (
                <li key={props.link.id} id={props.link.id} className={props.link.classNames}>
                    { props.link.useButton && <button className={props.link.buttonClassname}>{props.link.title}</button> }
                </li>
            )
        // } else {
            // return (
                // <li id={props.link.id} className={props.link.classNames}>
                // </li>               
            // )
        // }
    }

    const MenuList = (props: MenuProps) => {
        return (
            <ul id="nav-menu" className={classNames}>
                {props.menuLinks.map((link, index) => <MenuLink key={index} link={link} />)}
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
        <MenuList menuLinks={MENU_LINKS} />
    )
}

export default Menu