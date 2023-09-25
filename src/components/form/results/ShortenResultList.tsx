import React, { RefObject, useEffect, useRef } from "react"
import './ShortenResultList.css'
import { FormValues, LS_SHORTEN_RESPONSES, ShortenResult, generateErrorMessage } from "../../../types/ShortenTypes"
import ShortenResultCard from "./ShortenResultCard"
import { useFormContext } from "react-hook-form"
// import localforage from "localforage"
import { forageStore } from "../../../services/ShortenApi"

type Props = {
    shortenResultCards: JSX.Element[]
    setShortenResultCards: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    shortenResponses: ShortenResult[]
    setShortenResponses: React.Dispatch<React.SetStateAction<ShortenResult[]>>
}



const ShortenResultList = (props : Props) => {
    const {shortenResultCards, setShortenResultCards} = props
    const {shortenResponses, setShortenResponses} = props

    const formData = useFormContext<FormValues>()
    const { setError, formState: { isSubmitSuccessful, isValid } } = formData
    // const { formState: { isSubmitSuccessful, isValid }} = formData
    
    // Scroll to newly-added ShortenResultCard Component
    const scrollToRef : RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    async function buildResultElements(resultData: ShortenResult[]): Promise<JSX.Element[]> {
    //  let json: any[] = resultData

        let cards: JSX.Element[] = await resultData.map((result, index) => 
                                        <ShortenResultCard 
                                            key={result.code} 
                                            shortUrl={result.short_link} 
                                            targetUrl={result.original_link}
                                            refProp={index === resultData.length - 1 ? scrollToRef : null}
                                        />
                                    )                    
        console.log(`🚀 ~ buildShortenResultCards ~ cards:`, cards)
        // setShortenResultCards(cards)

        return cards
    }

    useEffect(() => {
        forageStore.getItem<ShortenResult[]>(LS_SHORTEN_RESPONSES)
            .then(function(value) {
                // This code runs once the value has been loaded
                // from the offline store.
                console.log(value);

                // setShortenResponses(value !== null ? value : []);
                buildResultElements(value || [])
                    .then(function(elems: JSX.Element[]) {
                        setShortenResultCards(elems)
                    })
                    .catch(function(err: any) {
                        setError("url", { message: generateErrorMessage(err) })
                    })
                // setShortenResultCards(resultElements)
            }).catch(function(err) {
                // This code runs if there were any errors
                console.error(err);

                setError("url", {message: generateErrorMessage(err)})
            });
        // let lsShortenResponses: (string | null) = window.localStorage.getItem(LS_SHORTEN_RESPONSES)
        // if (lsShortenResponses == null || lsShortenResponses === undefined || /^.*undefined.*$/.test(lsShortenResponses)) {
        //     return
        // }

        // setShortenResponses(JSON.parse(lsShortenResponses));
    }, [setError, setShortenResultCards])

    useEffect(() => {
        if (!shortenResponses.length || shortenResponses == null || shortenResponses === undefined) {
            return
        }
        forageStore.setItem<ShortenResult[]>(LS_SHORTEN_RESPONSES, shortenResponses);
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