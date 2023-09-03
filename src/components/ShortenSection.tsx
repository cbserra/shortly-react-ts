import { BaseSyntheticEvent, RefObject, useEffect, useRef, useState } from 'react'
import ShortenResultCard from './ShortenResultCard'
import { SubmitHandler, useForm } from "react-hook-form";
import './ShortenSection.css'
import { SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS, ShortenErrorResponse, ShortenResult, ShortenSuccessResponse } from '../types/ShortenTypes';
import useAxios from 'axios-hooks';
import { useLocalStorageCachedAxios } from '../hooks/useLocalStorageCachedAxios';

type FormValues = {
    url: string
}

// const useAxios = makeUseAxios({
//   axios: axios.create({})
// })

const ShortenSection = (props: {
    isMobile: boolean,
    isDesktop: boolean
}) => {
    const [shortenResponses, setShortenResponses] = useState<ShortenResult[]>([])
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])

    const [{ data, loading, error }, refetch] = useLocalStorageCachedAxios<ShortenSuccessResponse, any, ShortenErrorResponse>(SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS)
    //   useAxios<ShortenSuccessResponse, any, ShortenErrorResponse>(SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS)

    const {
    register,
    handleSubmit,
    setError,
    formState: { errors: formErrors, isValid, isSubmitted, isSubmitSuccessful },
  } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  })

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

    // useEffect(() => {

    //     if (shortenResponses && shortenResponses.length > 0) {
    //         setShortenResponses((prevResps: any) => [...prevResps, data?.result])
    //     } else if (data?.result) {
    //         setShortenResponses([data?.result])
    //     }

    //     // setShortenResponses(JSON.parse(localStorage));
    // }, [data])

    // useEffect(() => {
    //     console.log(`🚀 ~ useEffect ~ data:`, data)
    // }, [data])

    const onSubmit: SubmitHandler<FormValues> = async (form: FormValues, evt?: BaseSyntheticEvent<object, any, any> | undefined) => {
        evt?.preventDefault()
        console.debug(`🚀 ~ constonSubmit:SubmitHandler<FormValues>= ~ form:`, form)

        // const reqParams: ShortenRequestParams = {
        //     ...form
        // }
        refetch({ 
            // ...SHORTEN_REQ_CONF,
            params: form //{ url: form['url'] } //reqParams 
        })
        .then((response) => {
            console.debug(`🚀 ~ .then ~ response:`, response)
            
            if (response.data.ok && response.data.result !== undefined) {
                const success = response.data.result
                console.debug(`🚀 ~ .then ~ success:`, success)

                if (shortenResponses?.some(res => res.code === success.code)) {
                    console.debug("already have a response with matching code: " + success.code)
                    return
                }
                // console.debug(JSON.stringify(success))
                if (shortenResponses && shortenResponses.length > 0) {
                    setShortenResponses((prevResps: any) => [...prevResps, success])
                } else {
                    setShortenResponses([success])
                }
            } else if (error?.isAxiosError && error.message !== undefined) {
                console.log(`🚀 ~ .then ~ error:`, error)

                console.error(`❗️ ~ .then ~ error.code:`, error.code)
                console.error(`❗️ ~ .then ~ error.cause:`, error.cause)
                setError("url", {message: `Axios Error detected during refetch: ${JSON.stringify(error)}`})
            }

            evt?.target.reset()
        })
        .catch((err) => {
            console.error(`❗️ ~ err:`, err)
            setError("url", {message: `Error caught during refetch: ${JSON.stringify(err.message)}`})
        })
    }

    useEffect(() => {
        function buildShortenResponseCards() {
            if (shortenResponses && shortenResponses !== undefined) {
                let json: any[] = shortenResponses

                let cards: JSX.Element[] = json
                                            // .map(res => res.result)
                                            .map((result, index) => <ShortenResultCard 
                                                key={result.code} 
                                                shortUrl={result.short_link} 
                                                targetUrl={result.original_link}
                                                refProp={index === json.length - 1 ? scrollToRef : null}/>)                    
                console.log(`🚀 ~ buildShortenResponseCards ~ cards:`, cards)
                setShortenResultCards(cards)
                executeScroll()
            }
        }
    
        buildShortenResponseCards();
      }, [shortenResponses]);

    return (
        <div className="shorten-url-container">
            <div className="shorten-form-elements">
                <form className="shorten-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="input-container">
                        <input 
                            {...register("url", {
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
                                            result = !shortenResponses.some(res => res.original_link === value)
                                        }

                                        return result || 'That URL already exists!'
                                    }
                                }                                
                            })} 
                            type="url" 
                            className="url-text"
                            // defaultValue={''}
                            placeholder="Shorten a link here..." 
                            required 
                            />
                        <input type="submit" className="submit-btn" value="Shorten It!" />
                    </div>
                    {/* <div className="break"></div> */}
                    {<div className="error-message">
                        { formErrors.url && (
                            <span className='error-message'>
                                {formErrors.url.message}
                            </span>
                        )}
                    </div>}
                </form>
            </div>
            { shortenResultCards && (
                <div className='shorten-resp-container'>
                    {shortenResponses && shortenResponses !== undefined && (
                        // let cards: JSX.Element[] = json
                        shortenResponses
                        // .map(res => res.result)
                        .map((result, index) => 
                            <ShortenResultCard 
                                key={result?.code || '1'} 
                                shortUrl={result?.short_link || ''} 
                                targetUrl={result?.original_link || ''}
                                refProp={isSubmitSuccessful && index === shortenResponses.length - 1 ? scrollToRef : null}
                            />
                        )
                    )}
                </div>
            )}
        </div>
        
    )
}

export default ShortenSection

