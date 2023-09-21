import 'normalize.css'
import './App.css';
import GetStarted from './GetStarted';
import ShortenSection from './form/ShortenSection';
import Statistics from './Statistics';
import { useEffect, useState } from 'react';
import BoostLinks from './BoostLinks';
import Footer from './footer/Footer';
import { DeviceType, FormValues } from '../types/ShortenTypes';
import Header from './header/Header';
import { FormProvider, useForm } from 'react-hook-form';
import useMatchMedia from 'use-match-media-hook'

const queries = [
  '(max-width: 1023px)',
  '(min-width: 1024px)'
]


function App() {

  // const handleWindowResize = (matches: any) => {
  //   console.log(`🚀 ~ handleWindowResize ~ matches:`, JSON.stringify(matches))
  // }

  // const handleWindowResize = (matches: any): void => {
  //   const mediaQuery = window.matchMedia('(min-width: 1024px)')
  //   console.log(`🚀 ~ handleWindowResize ~ mediaQuery:`, mediaQuery)

  //   if (mediaQuery.matches) {
  //     if (isDesktop) {
  //       console.log(`🚀 ~ handleWindowResize ~ mediaQuery.matches ~ isDesktop:`, isDesktop)
  //       console.log(`🚀 ~ handleWindowResize ~ mediaQuery.matches ~ isMobile:`, isMobile)
  //       console.log(`🚀 ~ handleWindowResize ~ mediaQuery.matches ~ isDesktopState:`, isDesktopState)
  //       console.log(`🚀 ~ handleWindowResize ~ mediaQuery.matches ~ isMobileState:`, isMobileState)
  //       console.log(`🚀 ~ handleWindowResize ~ mediaQuery:`, mediaQuery)
  //       console.log(`🚀 ~ handleWindowResize ~ now matches Desktop:`, matches)
  //       // setIsDesktopState((prevVal) => !prevVal)
  //       // setIsMobileState((prevVal) => !prevVal)
  //     }
  //   } else {//if (!mediaQuery.matches) {
  //     if (isMobile) {
  //       console.log(`🚀 ~ handleWindowResize ~ !mediaQuery.matches ~ isDesktop:`, isDesktop)
  //       console.log(`🚀 ~ handleWindowResize ~ !mediaQuery.matches ~ isMobile:`, isMobile)
  //       console.log(`🚀 ~ handleWindowResize ~ !mediaQuery.matches ~ isDesktopState:`, isDesktopState)
  //       console.log(`🚀 ~ handleWindowResize ~ !mediaQuery.matches ~ isMobileState:`, isMobileState)
  //       console.log(`🚀 ~ handleWindowResize ~ mediaQuery:`, mediaQuery)
  //       console.log(`🚀 ~ handleWindowResize ~ now matches Mobile:`, matches)
  //       // setIsMobileState((prevVal) => !prevVal)
  //       // setIsDesktopState((prevVal) => !prevVal)
  //     }
  //   }

  // }

  // const isDesktop = useMediaQuery(
  //   { minWidth: 1024 },
  //   undefined,
  //   handleWindowResize
  // )
  // const isDesktop = useMediaQuery({query: '(min-width: 1024px)' })
  // const isMobile = useMediaQuery(
  //   { maxWidth: 1023 },
  //   undefined,
  //   handleWindowResize
  // )
  // const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

 const [isMobile, isDesktop] = useMatchMedia(queries)
  
  // const [isMobileState, setIsMobileState] = useState(isMobile)
  // const [isDesktopState, setIsDesktopState] = useState(isDesktop)
  const [toggleMenuDisplay, setToggleMenuDisplay] = useState(false)
  const [previousDeviceType, setPreviousDeviceType] = useState<DeviceType>(!isDesktop ? DeviceType.Desktop : DeviceType.Mobile)
  const [currentDeviceType, setCurrentDeviceType] = useState<DeviceType>(isDesktop ? DeviceType.Desktop : DeviceType.Mobile)

  const listenToScroll = () => {
    if (isDesktop) {
      return
    }
    if (!toggleMenuDisplay) {
      return
    }

    let heightToHideFrom = 100;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {  
        // console.debug(`🚀 ~ listendToScroll ~ winScroll:`, winScroll)
        // console.debug(`🚀 ~ listenToScroll ~ heightToHideFrom:`, heightToHideFrom)
        // console.debug(`🚀 ~ listenToScroll ~ toggleMenuDisplay:`, toggleMenuDisplay)
        
        if (toggleMenuDisplay) {
            setToggleMenuDisplay(false);
        }
    }
  };

  useEffect(() => {   
      window.addEventListener("scroll", listenToScroll);
      return () => 
          window.removeEventListener("scroll", listenToScroll); 
  })

  useEffect(() => {
    console.log(`🚀 ~ App ~ isMobile:`, isMobile)
    // console.log(`🚀 ~ App ~ isMobileState:`, isMobileState)

    // setIsMobileState(isMobile)
  }, [isMobile]) //, isMobileState])

    useEffect(() => {
    console.log(`🚀 ~ App ~ isDesktop:`, isDesktop)
    // console.log(`🚀 ~ App ~ isDesktopState:`, isDesktopState)

    // setIsDesktopState(isDesktop)
  }, [isDesktop]) //, isDesktopState])

  //   useEffect(() => {
  //   // console.log(`🚀 ~ App ~ isMobile:`, isMobile)
  //   console.log(`🚀 ~ App ~ isMobileState:`, isMobileState)

  //   // setIsMobileState(isMobile)
  // }, [isMobileState])

  //   useEffect(() => {
  //   // console.log(`🚀 ~ App ~ isDesktop:`, isDesktop)
  //   console.log(`🚀 ~ App ~ isDesktopState:`, isDesktopState)

  //   // setIsDesktopState(isDesktop)
  // }, [isDesktopState])
  
    useEffect(() => {
    console.log(`🚀 ~ useEffect ~ currentDeviceType:`, currentDeviceType)

    setPreviousDeviceType(currentDeviceType === DeviceType.Desktop ? DeviceType.Mobile : DeviceType.Desktop)
  }, [currentDeviceType])

  useEffect(() => {
    console.debug(`🚀 ~ App ~ previousDeviceType:`, previousDeviceType)
    // console.debug(`🚀 ~ App ~ currentDeviceType:`, currentDeviceType)
  }, [previousDeviceType])

  const formMethods = useForm<FormValues>({
      reValidateMode: 'onSubmit',
      mode: 'onSubmit',
  })
  
  return (
    <div className="App">
      <div className="container top-container">
        <Header 
          isMobile={isMobile} 
          // setIsMobile={setIsMobileState}
          isDesktop={isDesktop}
          // setIsDesktop={setIsDesktopState}
          toggleMenuDisplay={toggleMenuDisplay}
          setToggleMenuDisplay={setToggleMenuDisplay}
          previousDeviceType={previousDeviceType}
          setPreviousDeviceType={setPreviousDeviceType}
          currentDeviceType={currentDeviceType}
          setCurrentDeviceType={setCurrentDeviceType}
        />
        <GetStarted />
      </div>
      <div className="container mid-container">
        <main className="app-main">
          <FormProvider {...formMethods}>
            <ShortenSection 
              setCurrentDeviceType={setCurrentDeviceType}
              currentDeviceType={currentDeviceType}
              isMobile={isMobile} 
              // setIsMobile={setIsMobileState}
              isDesktop={isDesktop}
              // setIsDesktop={setIsDesktopState}
            />
          </FormProvider>
          <Statistics />
        </main>
      </div>
      <div className="container btm-container">
        <BoostLinks />
        <Footer />
      </div>
    </div>
  );
}

export default App;
