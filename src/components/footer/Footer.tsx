import './Footer.css'
import {ReactComponent as ShortlyLogo} from '../../images/logo.svg'
import {ReactComponent as FacebookIcon} from '../../images/icon-facebook.svg'
import {ReactComponent as TwitterIcon} from '../../images/icon-twitter.svg'
import {ReactComponent as InstagramIcon} from '../../images/icon-instagram.svg'
import {ReactComponent as PinterestIcon} from '../../images/icon-pinterest.svg'

const Footer = () => {
    const SiteMapLinks = (props: {heading: string, links: string[]}) => {
        return (
            <div className='list-container'>
                <h1>{props.heading}</h1>
                <ul>
                    {props.links
                        .map(item => <li key={item}><button className='button-link'>{item}</button></li>)
                    }
                </ul>
            </div>
        )
    }

    return (
        <footer className="app-footer">
            <section className='footer-container'>
                <div className='footer-elements'>
                    <div className='list-container footer-logo'>
                        <ShortlyLogo />
                    </div>
                    
                    <div className='site-map'>
                        <SiteMapLinks heading='Features' links={['Link Shortening', 'Branded Links', 'Analytics']} />
                        <SiteMapLinks heading='Resource' links={['Blog', 'Developers', 'Support']} />
                        <SiteMapLinks heading='Company' links={['About', 'Careers', 'Press', 'Contact']} />
                    </div>

                    <div className='icon-container'>
                        <a href='https://www.facebook.com/'><FacebookIcon /></a>
                        <a href='https://www.twitter.com/'><TwitterIcon /></a>
                        <a href='https://www.pinterest.com/'><PinterestIcon /></a>
                        <a href='https://www.instagram.com/'><InstagramIcon /></a>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer