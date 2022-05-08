import React, { useEffect, useState } from 'react'
import ShortenResultCard from './ShortenResultCard'
import './ShortenSection.css'

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
    const [response, setResponse] = useState<any>()
    const [inputUrl, setInputUrl] = useState<string>('')
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputUrl(event.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            fetch(`https://api.shrtco.de/v2/shorten?url=${inputUrl}`, 
            {
                method: "GET",
            })
            .then(response => response.json())
            .then(data  => {
                console.debug(data.result)
                setResponse(data.result)
            })
            .catch(error => {
                console.error(error)
                setErrorMessage(error)
            })
        } catch(error: any) {
            console.error(error)
            setErrorMessage(error)
        }

    }

    useEffect(() => {
        async function getShortenResponse() {
            if (response) {
                let newCard:JSX.Element = 
                    <ShortenResultCard 
                                key={shortenResultCards.length + 1} 
                                shortUrl={response.short_link} 
                                targetUrl={response.original_link}
                                shareLink={response.share_link} />
                
                setShortenResultCards((prevCards) => [...prevCards, newCard])
                console.debug(shortenResultCards)
            }
        }
    
        getShortenResponse();
      }, [response]);

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

