import './Hamburger.css'
import {ReactComponent as HamburgerIcon} from '../../images/icon-hamburger.svg'

const Hamburger = (props: { onClickFun: () => void }) => (
    <div className="mobile-icon-wrapper">
        <button onClick={props.onClickFun}>
            <HamburgerIcon />
        </button>
    </div>
)

export default Hamburger