// import localforage from 'localforage'
// import memoryDriver from 'localforage-memoryStorageDriver'
// import { setup } from 'axios-cache-adapter'
// import { SHORTEN_API_URL } from '../types/ShortenTypes'

// // `async` wrapper to configure `localforage` and instantiate `axios` with `axios-cache-adapter`
// async function configure () {
//   // Register the custom `memoryDriver` to `localforage`
//   await localforage.defineDriver(memoryDriver)

//   // Create `localforage` instance
//   const forageStore = localforage.createInstance({
//     // List of drivers used
//     driver: [
//       localforage.INDEXEDDB,
//       localforage.LOCALSTORAGE,
//       memoryDriver._driver
//     ],
//     // Prefix all storage keys to prevent conflicts
//     name: 'my-cache'
//   })

//   // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
//   return setup({
//     // `axios` options
//     baseURL: SHORTEN_API_URL,

//     // `axios-cache-adapter` options
//     cache: {
//       maxAge: 15 * 60 * 1000,
//       store: forageStore // Pass `localforage` store to `axios-cache-adapter`
//     }
//   })

// }

export {}