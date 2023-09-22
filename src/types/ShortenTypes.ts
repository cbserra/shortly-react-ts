import { AxiosAdapter, AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponseTransformer } from "axios"
import { RefetchOptions, UseAxiosResult } from "axios-hooks"
import { UseFormRegister } from "react-hook-form"

// Local Storage Pre-existing Shortened URLs Key
export const LS_SHORTEN_RESPONSES = 'shortenResponses'

// Shorten API GET Request Endpoint
export const SHORTEN_API_URL = 'https://api.shrtco.de/v2/shorten'

export const SHORTEN_REQ_CONF = {
  baseURL: SHORTEN_API_URL,
  method: 'get'
}

export const SHORTEN_REQ_OPTS = {
  manual: true,
  useCache: true
}

// export enum DeviceType {
//   Mobile = "MOBILE",
//   Desktop = "DESKTOP"
// }

// export interface ShortenResponse {
//   ok: boolean
//   resp_wrapper?: ShortenSuccessResponse | ShortenErrorResponse
// }

export interface ShortenSuccessResponse {
    ok: boolean,
    result?: ShortenResult
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

// export interface PartialShortenResult  {
//     code?: string,
//     short_link?: string,
//     original_link?: string
// }

export type ShortenRequestConfig = {
    adapter?: AxiosAdapter
    baseURL: string
    params?: ShortenRequestParams
    method: 'get'
    transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[]; 
}

export type ShortenRequestParams = {
  url: string
}

export type ShortenRequestOptions = {
  manual: boolean,
  useCache: boolean
}

// Shorten Error Types
export interface ShortenErrorResponse {
    ok: boolean,
    error_code?: number,
    error?: string
}

export type FormValues = {
    url: string
}

export interface ShortenForm {
    isMobile: boolean
    isDesktop: boolean
    register: UseFormRegister<FormValues>
    fetchFun: (config?: AxiosRequestConfig<any> | undefined, options?: RefetchOptions | undefined) => AxiosPromise<ShortenSuccessResponse>
    shortenResultCards: JSX.Element[]
    setShortenResultCardsFun: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    shortenResponses: ShortenResult[]
    setShortenResponsesFun: React.Dispatch<React.SetStateAction<ShortenResult[]>>
    error: AxiosError<ShortenErrorResponse, any> | null
    useAxiosResult: UseAxiosResult<any, any, any>
}