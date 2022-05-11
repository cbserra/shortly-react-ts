import './Footer.css'
import logo from '../images/logo.svg'

const Footer = () => {
    return (
        <section className='footer-container'>
            <div className='footer-elements'>
                <div className='list-container footer-logo'>
                    <img src={logo} alt="shortly logo" />
                </div>
                
                <div className='list-container'>
                    <h1>Features</h1>
                    <ul>
                        <li>Link Shortening</li>
                        <li>Branded Links</li>
                        <li>Analytics</li>
                    </ul>
                </div>

                <div className='list-container'>
                    <h1>Resource</h1>
                    <ul>
                        <li>Blog</li>
                        <li>Developers</li>
                        <li>Support</li>
                    </ul>
                </div>

                <div className='list-container'>
                    <h1>Company</h1>
                    <ul>
                        <li>About</li>
                        <li>Our Team</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>  
                </div> 

                <div className='icon-container'>
                    <i className="fa-brands fa-facebook-square fa-lg"></i>
                    <i className="fa-brands fa-twitter fa-lg"></i>
                    <i className="fa-brands fa-pinterest fa-lg"></i>
                    <i className="fa-brands fa-instagram fa-lg"></i>
                </div>
            </div>
        </section>
    )
}

export default Footer