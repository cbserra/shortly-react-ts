import './GetStarted.css'
import illustrationWorking from '../images/illustration-working.svg'


const GetStarted = () => {
    return (
        <section className="get-started">
            <figure className="text">
                <h1>More than just shorter links</h1>

                <p>Build your brand’s recognition and get detailed insights 
                on how your links are performing.</p>

                <button className='round-blue-btn'>Get Started</button>
            </figure>
            <figure className="image">
                <img src={illustrationWorking} alt="illustration working" />
            </figure>
        </section>
    );
}

export default GetStarted