import { ISetupCache, setupCache } from 'axios-cache-adapter'
import { AxiosInstance } from "axios"
import axios from "axios"

// Create `axios-cache-adapter` instance
const cache: ISetupCache = setupCache({
  maxAge: 15 * 60 * 1000
})

const api: AxiosInstance = axios.create({
  adapter: cache.adapter
})

api({
  url: 'http://some-rest.api/url',
  method: 'get'
  }).then(async (response) => {
    // Do something fantastic with response.data \o/
    console.log('Request response:', response)

    // Interacting with the store, see `localForage` API.
    const length = await Object.keys(cache.store).length

    console.log('Cache store length:', length)
  })


