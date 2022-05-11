import './Menu.css'

const Menu = (props : {toggleMenu?: boolean | undefined}) => {
    const menuClass = props.toggleMenu === undefined ? '' : (props.toggleMenu ? 'show' : 'hide')
    return (
        <ul id="nav-menu" className={menuClass}>
            <li id="features-link">Features</li>
            <li id="pricing-link">Pricing</li>
            <li id="resources-link">Resources</li>
            <li id="login-link" className="push-right">Login</li>
            <li id="sign-up-link" className="sign-up">Sign Up</li>
        </ul>
    )
}

export default Menu