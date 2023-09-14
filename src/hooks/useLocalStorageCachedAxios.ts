import { SHORTEN_API_URL, ShortenRequestConfig, SHORTEN_REQ_OPTS } from "../types/ShortenTypes"
// Import dependencies
import { AxiosRequestConfig } from 'axios'
import { setupCache } from 'axios-cache-adapter'
import useAxios, { Options, UseAxiosResult } from "axios-hooks"
import localForage from "localforage"

// Create `localforage` instance
const forageStore = localForage.createInstance({
  // List of drivers used
  driver: [
    localForage.LOCALSTORAGE,
  ],
  // Prefix all storage keys to prevent conflicts
  name: 'ls-cache'
})

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  store: forageStore
})

// Create `axios` instance passing the newly created `cache.adapter`
// const api: AxiosInstance = axios.create({
//   baseURL: SHORTEN_API_URL,
//   adapter: cache.adapter
// })

const SHORTEN_REQ_CACHE_CONF: AxiosRequestConfig<ShortenRequestConfig> = {
  baseURL: SHORTEN_API_URL,
  adapter: cache.adapter,
  method: 'get',
  // transformResponse: [function(data: ShortenSuccessResponse): ShortenSuccessResponse {
  //   console.log(`🚀 ~ data:`, data)
  //   let partialResult: PartialShortenResult = Object.assign({}, data.result)
  //   // console.log(`🚀 ~ partialResult:`, partialResult)
  //   // data = Object.assign({})
  //   if (data.ok) {
  //     data.result = {
  //       code: partialResult.code,
  //       short_link: partialResult.short_link,
  //       original_link: partialResult.original_link
  //     }
  //   }

  //   return data
  // }]
}

export const useLocalStorageCachedAxios = <TResponse, TBody, TError>
  (
    config?: string | AxiosRequestConfig<any> | undefined, 
    options?: Options | undefined
  )
  : UseAxiosResult<TResponse, TBody, TError> => {
  
    return useAxios<TResponse, TBody, TError>
    (
      typeof config === 'string' ? config : 
        { 
          ...SHORTEN_REQ_CACHE_CONF,
          ...config
        }, 
        {
          ...SHORTEN_REQ_OPTS,
          ...options
        }
    )
}
