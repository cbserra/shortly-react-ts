// import React, { useContext, useState, useEffect, createContext } from "react";
// import axios from "axios";
// import { DeviceType, FormValues, SHORTEN_API_URL, ShortenErrorResponse, ShortenRequestConfig, ShortenResult, ShortenSuccessResponse } from "../types/ShortenTypes";
// import useAxios, { UseAxiosResult, configure } from "axios-hooks";
// import { UseFormReturn } from "react-hook-form";
// import { setupCache } from "axios-cache-adapter";
// import localForage from "localforage"

// export interface ShortenFormData {
//   isMobile?: boolean
//   isDesktop?: boolean
//   deviceType?: DeviceType
//   shortenResultCards?: JSX.Element[]
//   setShortenResultCards?: React.Dispatch<React.SetStateAction<JSX.Element[]>>
//   shortenResponses?: ShortenResult[]
//   setShortenResponses?: React.Dispatch<React.SetStateAction<ShortenResult[]>>
//   formData?: UseFormReturn<FormValues, any>
//   axiosData?: UseAxiosResult<ShortenSuccessResponse, any, ShortenErrorResponse>
// }

// const ShortenApiContext = createContext<ShortenFormData>({

// });

// configure({ axios })

// interface Props {
//   children: React.ReactNode
// }

// export const ShortenApiContextProvider: React.FunctionComponent<Props> = (props: Props) => {
//   const [{ data, loading, error }] = useAxios<ShortenSuccessResponse>({
//     url: '/',
//     method: 'GET',
//   })

//   // Create `localforage` instance
//   const forageStore = localForage.createInstance({
//     // List of drivers used
//     driver: [
//       localForage.LOCALSTORAGE,
//     ],
//     // Prefix all storage keys to prevent conflicts
//     name: 'ls-cache'
//   })

//   // Create `axios-cache-adapter` instance
//   const cache = setupCache({
//     maxAge: 15 * 60 * 1000,
//     store: forageStore
//   })

//   // Create `axios` instance passing the newly created `cache.adapter`
//   // const api: AxiosInstance = axios.create({
//   //   baseURL: SHORTEN_API_URL,
//   //   adapter: cache.adapter
//   // })

//   const SHORTEN_REQ_CACHE_CONF: ShortenRequestConfig = {
//     baseURL: SHORTEN_API_URL,
//     adapter: cache.adapter,
//     method: 'get'
//   }

//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       const { data } = await axios.get(
//         `https://jsonplaceholder.typicode.com/users`
//       );
//       console.log(data);
//       setUsers(data);
//     }
//     fetchData();
//   }, []);
//   return (
//     <ShortenApiContext.Provider
//       value={{
        
//       }}
//     >
//       {props.children}
//     </ShortenApiContext.Provider>
//   );
// }

// export function useShortenApi() {
//   const context = useContext(ShortenApiContext);
//   if (context === undefined) {
//     throw new Error("Context must be used within a Provider");
//   }
//   return context;
// }

export {}