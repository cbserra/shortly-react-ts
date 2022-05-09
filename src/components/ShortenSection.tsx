import React, { useEffect, useState } from 'react'
import ShortenResultCard from './ShortenResultCard'
import { useForm } from "react-hook-form";
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
    const [shortenResponses, setShortenResponses] = useState<any[]>()
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { register, resetField, handleSubmit, watch, formState: { errors, isDirty, isValid } } = useForm({
            mode: "onSubmit",
            reValidateMode: "onChange",
            defaultValues: {
                urlText: ""
            }
  });

    useEffect(() => {
        let localStorage: (string | null)= window.localStorage.getItem('shortenResponses')
        if (localStorage == null || localStorage === undefined || /^.*undefined.*$/.test(localStorage)) {
            return
        }

        setShortenResponses(JSON.parse(localStorage));
    }, [])

    useEffect(() => {
        if (shortenResponses == null || shortenResponses === undefined) {
            return
        }
        window.localStorage.setItem('shortenResponses', JSON.stringify(shortenResponses));
    }, [shortenResponses]);

    const onSubmitHandler = (data: any, event: any) => {
        console.info(data)

        try {
            fetch(`https://api.shrtco.de/v2/shorten?url=${data.urlText}`, 
            {
                method: "GET",
            })
            .then(response => response.json())
            .then(data  => {
                if (shortenResponses?.some(res => res.result.code === data.result.code)) {
                    console.debug("already have a response with matching code: " + data.result.code)
                    return
                }
                console.debug(JSON.stringify(data))
                if (shortenResponses && shortenResponses.length > 0) {
                    setShortenResponses((prevResps: any) => [...prevResps, data])
                } else {
                    setShortenResponses([data])
                }

                event.target.reset()
            })
            .catch(error => {
                console.error(error)
                setErrorMessage(error)
                // setInputUrl('')
            })
        } catch(error: any) {
            console.error(error)
            setErrorMessage(error)
        }

    }

    useEffect(() => {
        function getShortenResponse() {
            if (shortenResponses && shortenResponses !== undefined) {
                // console.log(`typeof(shortenResponses): ${typeof(shortenResponses)}`)
                // console.log(`shortenResponses json: ${shortenResponses}`)
                let json: any[] = shortenResponses
                // console.log(`json: ${JSON.stringify(json)}`)

                let cards: JSX.Element[] = json
                                            .map(res => res.result)
                                            .map(result => <ShortenResultCard 
                                                key={result.code} 
                                                shortUrl={result.short_link} 
                                                targetUrl={result.original_link}
                                                shareLink={result.share_link} />)                    

                // console.debug(cards)
                setShortenResultCards(cards)
                // console.debug(shortenResultCards)
            }
        }
    
        getShortenResponse();
      }, [shortenResponses]);

    return (
        <section className="shorten-url-container">
            <section className="shorten-form-elements">
                <form className="shorten-form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                    <input 
                        {...register("urlText", {
                            required: "Please add a link",
                            validate: {
                                urlExists: (value: string) => {
                                    console.log(`value: ${value}, shortenResponses: ${JSON.stringify(shortenResponses)} `)
                                    if (shortenResponses && shortenResponses?.length > 0) {
                                        return !shortenResponses.some(res => res.result.original_link === value)
                                    }

                                    return true
                                }
                            }
                        })} 
                        type="url" 
                        className="url-text"
                        defaultValue={''}
                        placeholder="Shorten a link here..." 
                        required 
                        />
                    <input type="submit" className="submit-btn" value="Shorten It!" />
                    <div className="error-message">
                        { errors.urlText && errors.urlText.type === 'urlExists' && (
                            <span className='error-message'>That URL already exists!</span>
                        ) }
                        { errorMessage && (
                            <span className='error-message'>
                                {errorMessage}
                            </span>
                        )}
                    </div>
                </form>
            </section>
            { shortenResultCards && (
                <section className='shorten-resp-container'>
                    {shortenResultCards}
                </section>
            )}
        </section>
        
    )
}

export default ShortenSection

