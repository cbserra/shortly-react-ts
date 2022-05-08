import useAxios from 'axios-hooks'
import React, { useState } from 'react'
import ShortenResultCard from './ShortenResultCard'
import './ShortenSection.css'
const axios = require('axios');


export interface ShortenResponse {
    "ok": boolean,
    "result": ShortenResult
}

export interface ShortenResult  {
    "code": "string",
    "short_link": "string",
    "full_short_link": "string",
    "short_link2": "string",
    "full_short_link2": "string",
    "share_link": "string",
    "full_share_link": "string",
    "original_link": "string"
}

const ShortenSection = () => {
    const [shortenedRes, setShortenedRes] = useState<ShortenResponse[]>([])
    const [response, setResponse] = useState<any>()
    const [responses, setResponses] = useState<any[]>([])
    const [inputUrl, setInputUrl] = useState<string>('')
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')

    // const [{ data: getData, loading: getLoading, error: getError }, getShortenedUrl] = useAxios({
    //     method: 'get',
    //     url: `https://api.shrtco.de/v2/shorten?url=${inputUrl}`,
    // },
    // { 
    //     manual: true 
    // })

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // console.log('targetValue = ' + event.target.value)
    // const [{ data: getData, loading: getLoading, error: getError }, getShortenedUrl] = useAxios({
    //     method: 'get',
    //     url: `https://api.shrtco.de/v2/shorten?url=${inputUrl}`,
    // },
    // { 
    //     manual: true 
    // })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('targetValue = ' + event.target.value)
        setInputUrl(event.target.value)
    }

    // const handleCall = () => {
    //     console.log("calling handleCall")
    //     console.log(getShortenedUrl())

    //     if (getData?.data.ok) {
    //         setShortenedRes((res) => [...res, getData.data])
    //     }
        

    //     // setShortenResultCards(((currentCards) => [...currentCards,
    //     // shortenedRes?.result]))
    // }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('inside handleSubmit')
       
        fetch(`https://api.shrtco.de/v2/shorten?url=${inputUrl}`, 
        {
            method: "GET",
        })
        .then(response => response.json())
        .then(data  => {
            console.log(data.result)
            setResponse(data.result)
            setResponses((prevResponses) => [...prevResponses, data.result])

            let cards:JSX.Element[] = responses.map((response, index) => {
                return <ShortenResultCard 
                            key={index} 
                            shortUrl={response.short_link} 
                            targetUrl={response.original_link} />
            })
            setShortenResultCards(cards)
                    
            console.log(shortenResultCards)
        })
        .catch(error => {
            console.error(error)
            setErrorMessage(error)
        })

        e.preventDefault();
    }

    return (
        <section className="shorten-url-container">
            <section className="shorten-form-elements">
                <form className="shorten-form" onSubmit={handleSubmit}>
                    <input type="url" className="url-text" placeholder="Shorten a link here..." onChange={handleChange} required />
                    <input type="submit" className="submit-btn" value="Shorten It!" />
                </form>
            </section>
            { errorMessage && (
                <section className='shorten-resp-container'>
                    <div className='error-message'>
                        {errorMessage}
                    </div>
                </section>
            )}
            { shortenResultCards && (
                <section className='shorten-resp-container'>
                    {shortenResultCards}
                </section>
            )}
        </section>
        
    )
}

export default ShortenSection

