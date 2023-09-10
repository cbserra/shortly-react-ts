import 'normalize.css'
import './App.css';
import GetStarted from './GetStarted';
import ShortenSection from './form/ShortenSection';
import Statistics from './Statistics';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import BoostLinks from './BoostLinks';
import Footer from './footer/Footer';
import { DeviceType, FormValues, ShortenResult } from '../types/ShortenTypes';
import Header from './header/Header';
import { FormProvider, useForm } from 'react-hook-form';

function App() {

  const handleWindowResize = (matches: any) => {
    console.log(`🚀 ~ handleWindowResize ~ matches:`, JSON.stringify(matches))
  }

  const isDesktop = useMediaQuery(
    { minWidth: 1024 },
    undefined,
    handleWindowResize
  )
  // useMediaQuery({query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery(
    { maxWidth: 1023 },
    undefined,
    handleWindowResize
  )
  // useMediaQuery({ query: '(max-width: 1023px)' })
  
  const [isMobileState, setIsMobileState] = useState(isMobile)
  const [isDesktopState, setIsDesktopState] = useState(isDesktop)
  const [toggleMenuDisplay, setToggleMenuDisplay] = useState(false)
  const [previousDeviceType, setPreviousDeviceType] = useState<DeviceType>(!isDesktop ? DeviceType.Desktop : DeviceType.Mobile)
  const [currentDeviceType, setCurrentDeviceType] = useState<DeviceType>(isDesktop ? DeviceType.Desktop : DeviceType.Mobile)

  const listenToScroll = () => {
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

  //   useEffect(() => {
  //     window.onscroll = () => {
  //         if (toggleMenuDisplay) {
  //             setToggleMenuDisplay(false)
  //         }
  //     }
  // })

  useEffect(() => {
    console.log(`🚀 ~ App ~ isMobile:`, isMobile)

    setIsMobileState(isMobile)
  }, [isMobile])

    useEffect(() => {
    console.log(`🚀 ~ App ~ isDesktop:`, isDesktop)

    setIsDesktopState(isDesktop)
  }, [isDesktop])
  
    useEffect(() => {
    console.log(`🚀 ~ useEffect ~ currentDeviceType:`, currentDeviceType)

    setPreviousDeviceType(currentDeviceType === DeviceType.Desktop ? DeviceType.Mobile : DeviceType.Desktop)
  }, [currentDeviceType])

  useEffect(() => {
    console.debug(`🚀 ~ App ~ previousDeviceType:`, previousDeviceType)
    console.debug(`🚀 ~ App ~ currentDeviceType:`, currentDeviceType)
  }, [currentDeviceType, previousDeviceType])

   const formMethods = useForm<FormValues>({
        reValidateMode: 'onSubmit',
        mode: 'onSubmit',
    })
  
  return (
    <div className="App">
      <div className="container top-container">
        <Header 
          isMobile={isMobileState} 
          setIsMobile={setIsMobileState}
          isDesktop={isDesktopState}
          setIsDesktop={setIsDesktopState}
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
              isMobile={isMobileState} 
              setIsMobile={setIsMobileState}
              isDesktop={isDesktopState}
              setIsDesktop={setIsDesktopState}
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
