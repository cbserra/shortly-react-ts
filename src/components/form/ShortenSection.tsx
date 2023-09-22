import { useState } from 'react'
import './ShortenSection.css'
import { ShortenResult } from '../../types/ShortenTypes';
import ShortenForm from './ShortenForm';
import ShortenResultList from './results/ShortenResultList';

type Props = {
    isMobile: boolean
    isDesktop: boolean
}

const ShortenSection = (props: Props) => {
    const {isMobile, isDesktop} = props
    const [shortenResponses, setShortenResponses] = useState<ShortenResult[]>([])
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])

    return (
        <div className='shorten-section-container'>
            <div className="shorten-url-container">
                <ShortenForm 
                    isMobile={isMobile} 
                    isDesktop={isDesktop}
                    shortenResponses={shortenResponses}
                    setShortenResponses={setShortenResponses}
                />
            </div>
            <ShortenResultList
                setShortenResponses={setShortenResponses}
                shortenResponses={shortenResponses}
                setShortenResultCards={setShortenResultCards}
                shortenResultCards={shortenResultCards}
            />
        </div>
    )
}

export default ShortenSection