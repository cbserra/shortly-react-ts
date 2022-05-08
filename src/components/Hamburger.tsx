import './Hamburger.css'

const Hamburger = (props: { onClickFun: any }) => (
    <div className="mobile-icon-wrapper" onClick={props.onClickFun}>
        <i className="fa-solid fa-bars"></i>
    </div>
)

export default Hamburger