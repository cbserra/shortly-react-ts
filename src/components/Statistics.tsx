import React from "react";
import { ReactDOM } from "react";
import './Statistics.css'
import brandRecognition from '../images/icon-brand-recognition.svg'

const Statistics = () => {
    return (
        <section className="statistics">
            <header>
                <h2>Advanced Statistics</h2>

                <p>Track how your links are performing across the web with our 
                advanced statistics dashboard.</p>
            </header>

            <section className="articles">
                <article className="brand-recognition">
                    <header>
                        <div className="icon">
                            {/* <img src={brandRecognition} alt="" /> */}
                        </div>
                        <h3>Brand Recognition</h3>
                    </header>
                    <main>
                        <p> 
                            Boost your brand recognition with each click. 
                            Generic links don’t mean a thing. 
                            Branded links help instil confidence in your content.
                        </p>
                    </main>
                </article>

                <article className="detailed-records">
                    <header>
                        <div className="icon"></div>
                        <h3>Detailed Records</h3>
                    </header>
                    <main>
                        <p>
                            Gain insights into who is clicking your links. 
                            Knowing when and where people engage with your content helps inform better decisions.
                        </p>
                    </main>
                </article>

                <article className="fully-customizable">
                    <header>
                        <div className="icon"></div>
                        <h3>Fully Customizable</h3>
                    </header>
                    <main>
                        <p>
                            Improve brand awareness and content discoverability 
                            through customizable links, supercharging audience engagement.
                        </p>
                    </main>
                </article>
            </section>

        </section>
    )
}

export default Statistics