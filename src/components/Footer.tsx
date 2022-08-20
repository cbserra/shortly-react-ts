import './Footer.css'
import logo from '../images/logo.svg'
import {ReactComponent as ShortlyLogo} from '../images/logo.svg'
import {ReactComponent as FacebookIcon} from '../images/icon-facebook.svg'
import {ReactComponent as TwitterIcon} from '../images/icon-twitter.svg'
import {ReactComponent as InstagramIcon} from '../images/icon-instagram.svg'
import {ReactComponent as PinterestIcon} from '../images/icon-pinterest.svg'

const Footer = () => {
    return (
        <section className='footer-container'>
            <div className='footer-elements'>
                <div className='list-container footer-logo'>
                    <ShortlyLogo />
                    {/* <img src={logo} alt="shortly logo" /> */}
                </div>
                
                <div className='list-container'>
                    <h1>Features</h1>
                    <ul>
                        {['Link Shortening', 'Branded Links', 'Analytics'].map(item => <li key={item}><button className='button-link'>{item}</button></li>)}
                        {/* <li>Link Shortening</li>
                        <li>Branded Links</li>
                        <li>Analytics</li> */}
                    </ul>
                </div>

                <div className='list-container'>
                    <h1>Resource</h1>
                    <ul>
                        {['Blog', 'Developers', 'Support'].map(item => <li key={item}><button className='button-link'>{item}</button></li>)}
                        {/* <li>Blog</li>
                        <li>Developers</li>
                        <li>Support</li> */}
                    </ul>
                </div>

                <div className='list-container'>
                    <h1>Company</h1>
                    <ul>
                        {['About', 'Careers', 'Press', 'Contact'].map(item => <li key={item}><button className='button-link'>{item}</button></li>)}
                        {/* <li>About</li>
                        <li>Our Team</li>
                        <li>Careers</li>
                        <li>Contact</li> */}
                    </ul>  
                </div> 

                <div className='icon-container'>
                    <a href='https://www.facebook.com/'><FacebookIcon /></a>
                    <a href='https://www.twitter.com/'><TwitterIcon /></a>
                    <a href='https://www.pinterest.com/'><PinterestIcon /></a>
                    <a href='https://www.instagram.com/'><InstagramIcon /></a>
                    
                    {/* <i className="fa-brands fa-facebook-square fa-lg"></i>
                    <i className="fa-brands fa-twitter fa-lg"></i>
                    <i className="fa-brands fa-pinterest fa-lg"></i>
                    <i className="fa-brands fa-instagram fa-lg"></i> */}
                </div>
            </div>
        </section>
    )
}

export default Footer