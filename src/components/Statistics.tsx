import './Statistics.css'

const Statistics = () => {

    const StatArticle = (props: {cssId: string, heading: string, text: string}) => {
        return (
            <div className="article" id={props.cssId}>
                <header>
                    <div className="icon"></div>
                    <h2>{props.heading}</h2>
                </header>
                <div className="text">
                    <p>{props.text}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="statistics">
            <header>
                <h1>Advanced Statistics</h1>

                <p>Track how your links are performing across the web with our 
                advanced statistics dashboard.</p>
            </header>

            <div className="articles">
                <StatArticle 
                    cssId='brand-recognition' 
                    heading='Brand Recognition' 
                    text='Boost your brand recognition with each click. 
                                Generic links don’t mean a thing. 
                                Branded links help instil confidence in your content.'
                />

                <StatArticle 
                    cssId='detailed-records' 
                    heading='Detailed Records' 
                    text='Gain insights into who is clicking your links. 
                            Knowing when and where people engage with your content helps inform better decisions.'
                />
                {/* <div className="article" id="detailed-records">
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
                </div> */}
                <StatArticle 
                    cssId='fully-customizable' 
                    heading='Fully Customizable' 
                    text='Improve brand awareness and content discoverability 
                            through customizable links, supercharging audience engagement.'
                />
                

                {/* <div className="article" id="fully-customizable">
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
                </div> */}
            </div>

        </div>
    )
}

export default Statistics