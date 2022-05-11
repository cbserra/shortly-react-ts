import './Footer.css'
import logo from '../images/logo.svg'

const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className='footer-elements'>
                <div className='list-container footer-logo'>
                    <img src={logo} alt="shortly logo" />
                </div>
                
                <div className='list-container'>
                    <h3>Features</h3>
                    <ul>
                        <li>Link Shortening</li>
                        <li>Branded Links</li>
                        <li>Analytics</li>
                    </ul>
                </div>

                <div className='list-container'>
                    <h3>Resource</h3>
                    <ul>
                        <li>Blog</li>
                        <li>Developers</li>
                        <li>Support</li>
                    </ul>
                </div>

                <div className='list-container'>
                    <h3>Company</h3>
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
        </footer>
    )
}

export default Footer