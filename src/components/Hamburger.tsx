import './Hamburger.css'
import {ReactComponent as HamburgerIcon} from '../images/icon-hamburger.svg'

const Hamburger = (props: { onClickFun: any }) => (
    <div className="mobile-icon-wrapper">
        <button onClick={props.onClickFun}>
            <HamburgerIcon />
        </button>
        {/* <i className="fa-solid fa-bars"></i> */}
    </div>
)

export default Hamburger