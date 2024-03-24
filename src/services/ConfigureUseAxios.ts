import { AxiosInstance, AxiosStatic } from "axios"
import Axios from "axios"
import { Options, configure } from "axios-hooks"
import { SHORTEN_REQ_CONF } from "../types/ShortenTypes"
import { LRUCache } from 'lru-cache'

export const configureForUseAxios = (axiosParam?: AxiosInstance | AxiosStatic | any, cacheParam?: LRUCache<any, any> | false, defaultOptions?: Options): void => {

  const axios = axiosParam || Axios.create({...SHORTEN_REQ_CONF})
  const cache = cacheParam || new LRUCache({ max: 10 })
  
  configure({ axios, cache, defaultOptions })
}