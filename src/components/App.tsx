import 'normalize.css'
import './App.css';
import Nav from './Nav'
import GetStarted from './GetStarted';
import ShortenSection from './ShortenSection';
import Statistics from './Statistics';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import BoostLinks from './BoostLinks';
import Footer from './Footer';

export enum DeviceType {
  Mobile = "MOBILE",
  Desktop = "DESKTOP"
}

function App() {
  const toggleMobileMenu = () => {
      setToggleMenuDisplay((prevValue) => !prevValue) 
  }

  const handleWindowResize = (matches: any) => {
    console.log(`🚀 ~ handleWindowResize ~ matches:`, matches)
    // const previousDevice = 

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
  
  const [toggleMenuDisplay, setToggleMenuDisplay] = useState(false)
  const [previousDeviceType, setPreviousDeviceType] = useState<DeviceType>()
  const [currentDeviceType, setCurrentDeviceType] = useState<DeviceType>(isDesktop ? DeviceType.Desktop : DeviceType.Mobile)

  const listenToScroll = () => {
    let heightToHideFrom = 100;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {  
        console.debug(`🚀 ~ listendToScroll ~ winScroll:`, winScroll)
        console.debug(`🚀 ~ listenToScroll ~ heightToHideFrom:`, heightToHideFrom)
        console.debug(`🚀 ~ listenToScroll ~ toggleMenuDisplay:`, toggleMenuDisplay)
        
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
    setPreviousDeviceType(currentDeviceType)
    setCurrentDeviceType(isDesktop ? DeviceType.Desktop : DeviceType.Mobile)
  }, [isMobile, isDesktop, currentDeviceType])

  useEffect(() => {
    console.debug(`🚀 ~ App ~ previousDeviceType:`, previousDeviceType)
    console.debug(`🚀 ~ App ~ currentDeviceType:`, currentDeviceType)
  }, [currentDeviceType, previousDeviceType])

  // useEffect(() => {
  //     window.addEventListener('resize', handleWindowResize)

  //     return () => {
  //         window.removeEventListener("resize", handleWindowResize);
  //     };
  // })
  
  return (
    <div className="App">
      <div className="container top-container">
        <header className="app-header">
          <Nav 
            isMobile={isMobile} 
            isDesktop={isDesktop}
            toggleMenu={toggleMenuDisplay} 
            toggleMenuFun={setToggleMenuDisplay}
            toggleMobileMenuFun={toggleMobileMenu} />
          <GetStarted />
        </header>
      </div>
      <div className="container mid-container">
        <main className="app-main">
          <ShortenSection 
            isMobile={isMobile} 
            isDesktop={isDesktop}
          />
          <Statistics />
        </main>
      </div>
      <BoostLinks />
      <div className="container btm-container">
        <footer className="app-footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
