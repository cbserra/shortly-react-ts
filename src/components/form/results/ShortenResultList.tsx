import React, { RefObject, useEffect, useRef } from "react"
import './ShortenResultList.css'
import { ShortenResult } from "../../../types/ShortenTypes"
import ShortenResultCard from "./ShortenResultCard"
import { useFormContext } from "react-hook-form"

const LS_SHORTEN_RESPONSES = 'shortenResponses'

type Props = {
    shortenResultCards: JSX.Element[]
    setShortenResultCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    shortenResponses: ShortenResult[]
    setShortenResponses: React.Dispatch<React.SetStateAction<ShortenResult[]>>
}

const ShortenResultList = (props : Props) => {
    const {shortenResultCards, setShortenResultCards} = props
    const {shortenResponses, setShortenResponses} = props

    const formData = useFormContext()
    const { formState: { isSubmitSuccessful, isValid }} = formData
    
    // Scroll to newly-added ShortenResultCard Component
    const scrollToRef : RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let lsShortenResponses: (string | null) = window.localStorage.getItem(LS_SHORTEN_RESPONSES)
        if (lsShortenResponses == null || lsShortenResponses === undefined || /^.*undefined.*$/.test(lsShortenResponses)) {
            return
        }

        setShortenResponses(JSON.parse(lsShortenResponses));
    }, [setShortenResponses])

    useEffect(() => {
        if (!shortenResponses.length || shortenResponses == null || shortenResponses === undefined) {
            return
        }
        window.localStorage.setItem(LS_SHORTEN_RESPONSES, JSON.stringify(shortenResponses));
    }, [shortenResponses]);

    useEffect(() => {
        function buildShortenResultCards() {
            const executeScroll = () => {
                if (isSubmitSuccessful && scrollToRef.current !== null) {
                    scrollToRef.current.scrollIntoView({behavior: 'smooth'})
                }
            }
            
            if (shortenResponses && shortenResponses !== undefined) {
                let json: any[] = shortenResponses

                let cards: JSX.Element[] = json
                                            .map((result, index) => 
                                            <ShortenResultCard 
                                                key={result.code} 
                                                shortUrl={result.short_link} 
                                                targetUrl={result.original_link}
                                                refProp={index === json.length - 1 ? scrollToRef : null}
                                            />)                    
                console.log(`🚀 ~ buildShortenResultCards ~ cards:`, cards)
                setShortenResultCards(cards)
                executeScroll()
            }
        }
    
        buildShortenResultCards();
    }, [isSubmitSuccessful, isValid, setShortenResultCards, shortenResponses]);

    return (
        <div className='shorten-result-container'>
            { shortenResultCards?.length > 0 && (shortenResultCards) }
        </div>
    )
}

export default ShortenResultList