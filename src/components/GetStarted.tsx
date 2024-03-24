import './GetStarted.css'
import illustrationWorking from '../images/illustration-working.svg'


const GetStarted = () => {
    return (
        <section className="get-started">
            <figcaption className="text">
                <div className='text-container'>
                    <h1>More than just shorter links</h1>

                    <p>Build your brand’s recognition and get detailed insights 
                    on how your links are performing.</p>
                </div>

                <button className='round-blue-btn'>Get Started</button>
            </figcaption>
            <figure className="image">
                <img src={illustrationWorking} alt="illustration working" />
            </figure>
        </section>
    );
}

export default GetStarted