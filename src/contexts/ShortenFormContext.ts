// import React, { createContext } from 'react'
// import { useForm } from 'react-hook-form'
// import { FormValues, SHORTEN_REQ_CONF, SHORTEN_REQ_OPTS, ShortenErrorResponse, ShortenForm, ShortenSuccessResponse } from '../types/ShortenTypes'
// import { useLocalStorageCachedAxios } from '../hooks/useLocalStorageCachedAxios'

// type Props = {
//   children: React.ReactNode
// }

// const ShortenFormContext = createContext<ShortenForm>({

// })

// export const ShortenFormProvider: React.FunctionComponent<Props> = (props: Props) => {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors: formErrors, isValid, isSubmitted, isSubmitSuccessful },
//   } = useForm<FormValues>({
//     reValidateMode: 'onSubmit',
//     mode: 'onSubmit',
//   })

//   const [{ 
//     data, 
//     loading, 
//     error: axiosError 
//   }, fetch
//   ] = useLocalStorageCachedAxios<ShortenSuccessResponse, any, ShortenErrorResponse>(
//     SHORTEN_REQ_CONF, 
//     SHORTEN_REQ_OPTS
//   )
// }

// export default ShortenFormContext
export {}