import './Statistics.css'

const Statistics = () => {
    return (
        <div className="statistics">
            <header>
                <h1>Advanced Statistics</h1>

                <p>Track how your links are performing across the web with our 
                advanced statistics dashboard.</p>
            </header>

            <div className="articles">
                <div className="article" id="brand-recognition">
                    <header>
                        <div className="icon">
                            {/* <img src={brandRecognition} alt="" /> */}
                        </div>
                        <h2>Brand Recognition</h2>
                    </header>
                    <div className="text">
                        <p> 
                            Boost your brand recognition with each click. 
                            Generic links don’t mean a thing. 
                            Branded links help instil confidence in your content.
                        </p>
                    </div>
                </div>

                <div className="article" id="detailed-records">
                    <header>
                        <div className="icon"></div>
                        <h2>Detailed Records</h2>
                    </header>
                    <div className="text">
                        <p>
                            Gain insights into who is clicking your links. 
                            Knowing when and where people engage with your content helps inform better decisions.
                        </p>
                    </div>
                </div>

                <div className="article" id="fully-customizable">
                    <header>
                        <div className="icon"></div>
                        <h2>Fully Customizable</h2>
                    </header>
                    <div className="text">
                        <p>
                            Improve brand awareness and content discoverability 
                            through customizable links, supercharging audience engagement.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Statistics