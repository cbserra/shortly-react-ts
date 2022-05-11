import { RefObject, useEffect, useRef, useState } from 'react'
import ShortenResultCard from './ShortenResultCard'
import { useForm } from "react-hook-form";
import './ShortenSection.css'

export interface ShortenSuccessResponse {
    "ok": boolean,
    "result": ShortenResult
}

export interface ShortenErrorResponse {
    "ok": boolean,
    "error_code": number,
    "error": string
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

type FormInputs = {
    urlText: string
}

const ShortenSection = () => {
    const [shortenResponses, setShortenResponses] = useState<ShortenSuccessResponse[]>()
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
            mode: "onSubmit",
            reValidateMode: "onChange",
            defaultValues: {
                urlText: ""
            }
    });

    // Scroll to newly-added ShortenResultCard Component
    const scrollToRef : RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const executeScroll = () => {
        if (scrollToRef.current !== null) {
            scrollToRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

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

    const onSubmitHandler = (form: FormInputs, event: any) => {
        console.info(form)

        try {
            fetch(`https://api.shrtco.de/v2/shorten?url=${form.urlText}`, 
            {
                method: "GET",
            })
            .then(response => response.json())
            .then(data  => {
                console.log(data)
                if (data.ok) {
                    const success: ShortenSuccessResponse = data

                    if (shortenResponses?.some(res => res.result.code === success.result.code)) {
                        console.debug("already have a response with matching code: " + success.result.code)
                        return
                    }
                    console.debug(JSON.stringify(success))
                    if (shortenResponses && shortenResponses.length > 0) {
                        setShortenResponses((prevResps: any) => [...prevResps, success])
                    } else {
                        setShortenResponses([data])
                    }
    
                    event.target.reset()
                }

                if (!data.ok) {
                    const error: ShortenErrorResponse = data
                    setError('urlText', {type: 'server', message: `Error from API: [Error Code: ${error.error_code}], [Error Message: ${error.error}]`}, { shouldFocus: true})
                    event.target.focus()
                    return
                }
                
            })
            .catch(error => {
                console.error(error)
                setError('urlText', {type: 'server', message: JSON.stringify(error)}, {shouldFocus: true})
                event.target.focus()
            })
        } catch(error: any) {
            console.error(error)
            setError('urlText', {type: 'server', message: JSON.stringify(error)}, {shouldFocus: true})
            event.target.focus()
        }

    }

    useEffect(() => {
        function buildShortenResponseCards() {
            if (shortenResponses && shortenResponses !== undefined) {
                let json: any[] = shortenResponses

                let cards: JSX.Element[] = json
                                            .map(res => res.result)
                                            .map((result, index) => <ShortenResultCard 
                                                key={result.code} 
                                                shortUrl={result.short_link} 
                                                targetUrl={result.original_link}
                                                refProp={index === json.length - 1 ? scrollToRef : null}/>)                    
                console.log(cards)
                setShortenResultCards(cards)
                executeScroll()
            }
        }
    
        buildShortenResponseCards();
      }, [shortenResponses]);

    return (
        <section className="shorten-url-container">
            <section className="shorten-form-elements">
                <form className="shorten-form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                    <input 
                        {...register("urlText", {
                                required: "Please add a link",
                                pattern: {
                                    value: /^http(s?):\/\/.*/,
                                    message: "URL must begin with 'http://' or 'https://'!",
                                },
                                validate: {
                                    urlExists: (value: string) => {
                                        console.log(`value: ${value}, shortenResponses: ${JSON.stringify(shortenResponses)} `)
                                        let result = true
                                        if (shortenResponses && shortenResponses?.length > 0) {
                                            result = !shortenResponses.some(res => res.result.original_link === value)
                                        }

                                        return result || 'That URL already exists!'
                                    }
                                }                                
                            })
                        } 
                        type="url" 
                        className="url-text"
                        defaultValue={''}
                        placeholder="Shorten a link here..." 
                        required 
                        />
                    <input type="submit" className="submit-btn" value="Shorten It!" />
                    <div className="break"></div>
                    <div className="error-message">
                        { errors.urlText && (
                            <span className='error-message'>
                                {errors.urlText.message}
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

