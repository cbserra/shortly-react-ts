import { ISetupCache, setupCache, setup } from 'axios-cache-adapter'
import { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"
import { SHORTEN_API_URL, SHORTEN_REQ_OPTS, ShortenRequestConfig } from '../types/ShortenTypes'
// import localForage from "localforage"
import * as localForage from 'localforage';

// Create `localForage` instance
const forageStore = localForage.createInstance({
  // List of drivers used
  driver: [
    localForage.LOCALSTORAGE
  ],
  // Prefix all storage keys to prevent conflicts
  name: 'Shorten-Url-Ls-Db'
})

// Create `axios-cache-adapter` instance
// const cache: ISetupCache = setupCache({

//   maxAge: 15 * 60 * 1000,
//   store: forageStore
// })

// axios.defaults.adapter = cache.adapter

// Create `axios` instance passing the newly created `cache.adapter`
// const api: AxiosInstance = axios.create({
//   baseURL: SHORTEN_API_URL,
//   adapter: cache.adapter
// })

const SHORTEN_REQ_CACHE_CONF: AxiosRequestConfig<ShortenRequestConfig> = {
  baseURL: SHORTEN_API_URL,
  // adapter: cache.adapter,
  method: 'get',

  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000,
    store: forageStore,
  }
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

// export const useLocalStorageCachedAxios = <TResponse, TBody, TError>
//   (
//     config?: string | AxiosRequestConfig<any> | undefined, 
//     options?: Options | undefined
//   )
//   : UseAxiosResult<TResponse, TBody, TError> => {
  
//     return useAxios<TResponse, TBody, TError>
//     (
//       typeof config === 'string' ? config : 
//         { 
//           ...SHORTEN_REQ_CACHE_CONF,
//           ...config
//         }, 
//         {
//           ...SHORTEN_REQ_OPTS,
//           ...options
//         }
//     )
// }


// Create `axios-cache-adapter` instance
// const cache: ISetupCache = setupCache({
//   maxAge: 15 * 60 * 1000
// })

// export const api: AxiosInstance = setup({
//   ...SHORTEN_REQ_CACHE_CONF
// })

const api: AxiosInstance = axios.create({
  ...SHORTEN_REQ_CACHE_CONF
})
// export const api: AxiosInstance = axios.create({
//   adapter: cache.adapter
// })


// api({
//   url: SHORTEN_API_URL,
//   method: 'get'
//   }).then(async (response) => {
//     // Do something fantastic with response.data \o/
//     console.log('Request response:', response)

//     // Interacting with the store, see `localForage` API.
//     const length = await Object.keys(cache.store).length

//     console.log('Cache store length:', length)
//   })


export { api, forageStore }