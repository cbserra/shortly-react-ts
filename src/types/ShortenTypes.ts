import { Axios, AxiosAdapter } from "axios"

export const SHORTEN_API_URL = 'https://api.shrtco.de/v2/shorten'

export const SHORTEN_REQ_CONF = {
  baseURL: SHORTEN_API_URL,
  method: 'get'
}

export const SHORTEN_REQ_OPTS = {
  manual: true,
  useCache: true
}

// export interface ShortenResponse {
//   ok: boolean
//   resp_wrapper?: ShortenSuccessResponse | ShortenErrorResponse
// }

export interface ShortenSuccessResponse {
    ok: boolean,
    result?: ShortenResult
}

export interface ShortenErrorResponse {
    ok: boolean,
    error_code?: number,
    error?: string
}

export interface ShortenResult  {
    code: string,
    short_link: string,
    full_short_link: string,
    short_link2: string,
    full_short_link2: string,
    share_link: string,
    full_share_link: string,
    original_link: string
}

export type ShortenRequestConfig = {
    adapter?: AxiosAdapter,
    baseURL: string,
    params?: ShortenRequestParams,
    method: 'get'
}

export type ShortenRequestParams = {
  url: string
}

export type ShortenRequestOptions = {
  manual: boolean,
  useCache: boolean
}