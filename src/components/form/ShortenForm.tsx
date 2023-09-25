import React, { BaseSyntheticEvent, useEffect } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { ShortenResult, ShortenErrorResponse, FormValues, LS_SHORTEN_RESPONSES } from '../../types/ShortenTypes'
import { AxiosError } from 'axios'
import { FormError } from './FormError'
import './ShortenForm.css'
import localforage from 'localforage'
import { api, forageStore } from '../../services/ShortenApi'

type Props = {
    isMobile: boolean
    isDesktop: boolean
    shortenResponses: ShortenResult[]
    setShortenResponses: React.Dispatch<React.SetStateAction<ShortenResult[]>>
}

const ShortenForm = (props: Props) => {
  const {isMobile, isDesktop} = props
  const {shortenResponses, setShortenResponses} = props

  const formData = useFormContext<FormValues>()
  const { handleSubmit, setError, formState, register } = formData

  // const [{ loading, error: axiosError }, fetch] = useLocalStorageCachedAxios<ShortenSuccessResponse, any, ShortenErrorResponse>(SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS)

  useEffect (() => {
    async function queryLocalStorage(): Promise<void> {
      try {
        const value = localforage.getItem<ShortenResult[]>(LS_SHORTEN_RESPONSES);
        // This code runs once the value has been loaded
        // from the offline store.
        console.log(value);
      } catch (err) {
        // This code runs if there were any errors.
        console.log(err);
      }
      
      const lsShortenResults = localforage.getItem<ShortenResult[]>(LS_SHORTEN_RESPONSES)
      setShortenResponses(await lsShortenResults || [])
    }

    queryLocalStorage()
  }, [setShortenResponses])

    //   useEffect(() => {
    //     checkUserLoggedIn()
    // }, [])

    // // Check if user is logged in
    // const checkUserLoggedIn:() => Promise<void> = async () => {
    //     console.log('checkUserLoggedIn')

    //     const res = await fetch(`${NEXT_URL}/api/user`)
    //     const data = await res.json()

    //     if (res.ok) {
    //         setUser(data.user)

    //         console.log('data.user', data.user)
    //         router.push('/account/dashboard')
    //     } else {
    //         setUser(null)
    //     }
    // }

  // useEffect(() => {
  //   if (axiosError?.isAxiosError && axiosError.message !== undefined) {
  //     const axiosErrorJson = JSON.stringify(axiosError.message)
  //     console.error(`❗️ ~ useEffect ~ axiosErrorJson:`, axiosErrorJson)
      
  //     setError("url", {message: `Axios Error detected during fetch in useEffect: ${axiosErrorJson}`})
  //   }
  // }, [axiosError, setError])

  // useEffect(() => {
  //   console.log(`🚀 ~ useEffect ~ loading:`, loading)
  // }, [loading])

  const onSubmit: SubmitHandler<FormValues> = 
    async (
      form: FormValues, 
      evt?: BaseSyntheticEvent<object, any, any> | undefined
    ) => {
    evt?.preventDefault()
    console.debug(`🚀 ~ constonSubmit:SubmitHandler<FormValues>= ~ form:`, form)

    // try {
      api({
        params: form
        // url: SHORTEN_API_URL,
        // method: 'get'
      // }).then(async (response) => {
      //     // Do something fantastic with response.data \o/
      //     console.log('Request response:', response)

      //     // Interacting with the store, see `localForage` API.
      //     const length = await Object.keys(cache.store).length

      //     console.log('Cache store length:', length)
      //   })

      // fetch({ 
      //   // ...SHORTEN_REQ_CONF,
      //   params: form //{ url: form['url'] } //reqParams 
      }).then((response) => {
        console.debug(`🚀 ~ .then ~ response:`, response)
            
        if (response.data.ok && response.data.result !== undefined) {
          const success = response.data.result
          console.debug(`🚀 ~ .then ~ success:`, success)

          if (shortenResponses?.some(res => res.code === success.code)) {
            console.debug("already have a response with matching code: " + success.code)
            return
          }

          const updatedResponses: ShortenResult[] = []
          if (shortenResponses && shortenResponses.length > 0) {
            updatedResponses.concat(...shortenResponses, success)
            // setShortenResponses((prevResps: ShortenResult[]) => [...prevResps, success])
          } else {
            updatedResponses.concat(success)
            // setShortenResponses([success])
          }

          forageStore.setItem(LS_SHORTEN_RESPONSES, updatedResponses)
            .then(
              function(value) {
                setShortenResponses(value)
              }, 
              function(error) {
                const axiosShortenErr: AxiosError<ShortenErrorResponse> = error.response?.data.error
                console.error(`❗️ ~ ShortenForm ~ axiosShortenErr:`, axiosShortenErr)
                const errJson = JSON.stringify(axiosShortenErr)
                console.error(`❗️ ~ errJson:`, errJson)
                setError("url", {message: `Error thrown from API: ${errJson}`});
              }
            );
        } 
        // else if (response.data.)
        // } else if (axiosError?.isAxiosError && axiosError.message !== undefined) {
        //   console.log(`🚀 ~ .then ~ error:`, axiosError)

        //   console.error(`❗️ ~ .then ~ error.code:`, axiosError.code)
        //   console.error(`❗️ ~ .then ~ error.cause:`, axiosError.cause)
        //   setError("url", {message: `Axios Error detected during refetch: ${JSON.stringify(axiosError)}`})
        // }

        evt?.target.reset()
    }).catch((err: AxiosError<ShortenErrorResponse, any>) => {
        console.error(`❗️ ~ ShortenForm ~ err:`, err)
        const axiosShortenErr: ShortenErrorResponse | undefined = err.response?.data
        console.log(`🚀 ~ ShortenForm ~ axiosShortenErr:`, axiosShortenErr)
        const errJson = JSON.stringify(axiosShortenErr)
        console.error(`❗️ ~ errJson:`, errJson)
        setError("url", {message: `Error thrown from API: ${errJson}`});
    })
    // } catch(err: any) {
    //   const axiosShortenErr: AxiosError<ShortenErrorResponse> = err.response?.data.error
    //   console.log(`🚀 ~ ShortenForm ~ axiosShortenErr:`, axiosShortenErr)
    //   const errJson = JSON.stringify(axiosShortenErr)
    //   console.error(`❗️ ~ errJson:`, errJson)
    //   setError("url", {message: `Error thrown from API: ${errJson}`});
    // }
  }

  const handleMediaQueryChange = (matches: any) => {
    console.log(`🚀 ~ handleMediaQueryChange ~ matches:`, matches)
    // matches will be true or false based on the value for the media query
  }

  return (
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
                    if (shortenResponses && shortenResponses?.length) {
                      result = !shortenResponses.some(res => res.original_link === value)
                    }

                    return result || 'That URL already exists!'
                  }
                }                                
              })} 
              type="url" 
              className="url-text"
              placeholder="Shorten a link here..." 
              required 
            />
              {isMobile && <FormError 
                formErrors={formState.errors} 
              />}
            <input type="submit" className="submit-btn" value="Shorten It!" />
          </div>
              {isDesktop && <FormError 
                formErrors={formState.errors} 
              />}
        </form>
    </div>
  )
}

export default ShortenForm