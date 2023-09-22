import { useEffect, useState } from 'react'
import './Menu.css'

type Props = {
    toggleMenu?: boolean | undefined
    setToggleMenu?: (value: React.SetStateAction<boolean>) => void
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

    type LinkProp = {
        link: MenuLink
    }

    type MenuProps = {
        menuLinks: MenuLink[]
    }

    const MenuLink = (props: LinkProp) => {
        return (
            <li key={props.link.id} id={props.link.id} className={props.link.classNames}>
                { props.link.useButton && <button className={props.link.buttonClassname}>{props.link.title}</button> }
            </li>
        )
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

    const [menuClass,  setMenuClass]  =  useState(getMenuClass(props.toggleMenu))
    const [classNames, setClassNames] =  useState(menuClass)

    useEffect(() => {
        setMenuClass(getMenuClass(props.toggleMenu))
        setClassNames(menuClass)
        
        console.log(`🚀 ~ useEffect ~ props.toggleMenu:`, props.toggleMenu)
    }, [menuClass, props.toggleMenu])

    useEffect(() => {
        console.log(`🚀 ~ Menu ~ classNames:`, classNames)    
    }, [classNames])
    
    return (
        <MenuList menuLinks={MENU_LINKS} />
    )
}

export default Menu