import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { useLocalStorageCachedAxios } from '../../hooks/useLocalStorageCachedAxios'
import { ShortenResult, ShortenSuccessResponse, ShortenErrorResponse, SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS, FormValues, DeviceType, PartialShortenResult } from '../../types/ShortenTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { FormError } from './FormError'
import './ShortenForm.css'

type Props = {
    currentDeviceType: DeviceType
    setCurrentDeviceType: React.Dispatch<React.SetStateAction<DeviceType>>
    isMobile: boolean
    setIsMobile: (value: React.SetStateAction<boolean>) => void
    isDesktop: boolean
    setIsDesktop: (value: React.SetStateAction<boolean>) => void
  // shortenResultCards: JSX.Element[]
  // setShortenResultCardsFun: React.Dispatch<React.SetStateAction<JSX.Element[]>>
  shortenResponses: PartialShortenResult[]
  setShortenResponsesFun: React.Dispatch<React.SetStateAction<PartialShortenResult[]>>
}

const ShortenForm = (props: Props) => {
  const {currentDeviceType, setCurrentDeviceType} = props
  const {isMobile, setIsMobile} = props
  const {isDesktop, setIsDesktop} = props
    // const [shortenResponses, setShortenResponses] = useState(props.shortenResponses)
  // const [shortenResponses, setShortenResponses] = useState(props.shortenResponses)
  // const [shortenResultCards, setShortenResultCards] = useState(props.shortenResultCards)
  const shortenResponses = props.shortenResponses
  const setShortenResponses = props.setShortenResponsesFun

  const formData = useFormContext<FormValues>()
  const { handleSubmit, setError, formState, register } = formData

  const [{ data, loading, error: axiosError }, fetch] = useLocalStorageCachedAxios<ShortenSuccessResponse, any, ShortenErrorResponse>(SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS)

  useEffect(() => {
      console.log(`🚀 ~ ShortenForm ~ useEffect ~ props.currentDeviceType:`, props.currentDeviceType)
      setCurrentDeviceType(props.currentDeviceType)
  }, [props.currentDeviceType, setCurrentDeviceType])

  useEffect(() => {
      console.log(`🚀 ~ ShortenForm ~ useEffect ~ currentDeviceType:`, currentDeviceType)
  }, [currentDeviceType])

  useEffect(() => {
      console.log(`🚀 ~ useEffect ~ props.isDesktop:`, props.isDesktop)
      console.log(`🚀 ~ useEffect ~ props.isMobile:`, props.isMobile)

      setIsMobile((prevVal) => !prevVal)
      setIsDesktop((prevVal) => !prevVal)
  }, [props.isMobile, props.isDesktop, setIsMobile, setIsDesktop])

  // useEffect(() => {
  //     console.log(`🚀 ~ useEffect ~ isDesktop:`, isDesktop)
  //     console.log(`🚀 ~ useEffect ~ isMobile:`, isMobile)

  //     setIsMobile((prevVal) => !prevVal)
  //     setIsDesktop((prevVal) => !prevVal)
  // }, [isMobile, isDesktop, setIsMobile, setIsDesktop])

  // useEffect(() => {
  //   console.log(`🚀 ~ useEffect ~ data:`, data)
    
  //   if (data?.ok && data.result !== undefined) {
  //     const success = data.result
  //     console.log(`🚀 ~ useEffect ~ success:`, success)

  //     if (shortenResponses?.some(res => res.code === success.code)) {
  //       console.debug("already have a response with matching code: " + success.code)
  //       return
  //     }

  //     if (shortenResponses && shortenResponses.length) {
  //       setShortenResponses((prevResps: PartialShortenResult[]) => [...prevResps, success])
  //     } else {
  //       setShortenResponses([success])
  //     }
  //   }
  // }, [data, setShortenResponses, shortenResponses])

  useEffect(() => {
    if (axiosError?.isAxiosError && axiosError.message !== undefined) {
      const axiosErrorJson = JSON.stringify(axiosError.message)
      console.error(`❗️ ~ useEffect ~ axiosErrorJson:`, axiosErrorJson)
      
      setError("url", {message: `Axios Error detected during fetch in useEffect: ${axiosErrorJson}`})
    }
  }, [axiosError, setError])

  useEffect(() => {
    console.log(`🚀 ~ useEffect ~ loading:`, loading)
  }, [loading])

  const onSubmit: SubmitHandler<FormValues> = 
    async (
      form: FormValues, 
      evt?: BaseSyntheticEvent<object, any, any> | undefined
    ) => {
    evt?.preventDefault()
    console.debug(`🚀 ~ constonSubmit:SubmitHandler<FormValues>= ~ form:`, form)

    try {
      fetch({ 
        // ...SHORTEN_REQ_CONF,
        params: form //{ url: form['url'] } //reqParams 
      })
      .then((resp: AxiosResponse<ShortenSuccessResponse, any>) => {
        console.log(`🚀 ~ .then ~ resp:`, resp)
        console.log(`🚀 ~ useEffect ~ data:`, data)
    
        if (data?.ok && data.result !== undefined) {
          const success = data.result
          console.log(`🚀 ~ useEffect ~ success:`, success)

          if (shortenResponses?.some(res => res.code === success.code)) {
            console.debug("already have a response with matching code: " + success.code)
            return
          }

          if (shortenResponses && shortenResponses.length) {
            setShortenResponses((prevResps: PartialShortenResult[]) => [...prevResps, success])
          } else {
            setShortenResponses([success])
          }
        }
      })
      .catch((err: any) => {
        const errJson = JSON.stringify(err)
        setError("url", {message: `Error caught from fetch: ${errJson}`});  
      })
    } catch(err: any) {
      const axiosShortenErr: AxiosError<ShortenErrorResponse> = err.response?.data.error
      console.log(`🚀 ~ ShortenForm ~ axiosShortenErr:`, axiosShortenErr)
      const errJson = JSON.stringify(axiosShortenErr)
      console.error(`❗️ ~ errJson:`, errJson)
      setError("url", {message: `Error thrown from API: ${errJson}`});
    }
    // .then((response) => {
    //   console.debug(`🚀 ~ .then ~ response:`, response)
          
    //   if (response.data.ok && response.data.result !== undefined) {
    //     const success = response.data.result
    //     console.debug(`🚀 ~ .then ~ success:`, success)

    //     if (shortenResponses?.some(res => res.code === success.code)) {
    //       console.debug("already have a response with matching code: " + success.code)
    //       return
    //     }
    //     // console.debug(JSON.stringify(success))
    //     if (shortenResponses && shortenResponses.length > 0) {
    //       setShortenResponses((prevResps: ShortenResult[]) => [...prevResps, success])
    //     } else {
    //       setShortenResponses([success])
    //     }
      // } else 
      // if (axiosError?.isAxiosError && axiosError.message !== undefined) {
      //   console.log(`🚀 ~ .then ~ error:`, axiosError)

      //   console.error(`❗️ ~ .then ~ error.code:`, axiosError.code)
      //   console.error(`❗️ ~ .then ~ error.cause:`, axiosError.cause)
      //   setError("url", {message: `Axios Error detected during refetch: ${JSON.stringify(axiosError)}`})
      // }

      // evt?.target.reset()
    // }
    // )
    // .catch((err: AxiosError<ShortenErrorResponse>) => {
    //   console.error(`❗️ ~ err:`, err)
    //   setError("url", {message: `Error thrown from API: ${JSON.stringify(err.response?.data.error)}`});
    // })
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
            { isMobile && <FormError isDesktop={isDesktop} isMobile={isMobile} formErrors={formState.errors} />}
            <input type="submit" className="submit-btn" value="Shorten It!" />
          </div>
          { isDesktop && <FormError isDesktop={isDesktop} isMobile={isMobile} formErrors={formState.errors} />}
        </form>
    </div>
  )
}

export default ShortenForm