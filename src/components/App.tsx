import 'normalize.css'
import './App.css';
import GetStarted from './GetStarted';
import ShortenSection from './form/ShortenSection';
import Statistics from './Statistics';
import { useEffect, useState } from 'react';
import BoostLinks from './BoostLinks';
import Footer from './footer/Footer';
import { FormValues } from '../types/ShortenTypes';
import Header from './header/Header';
import { FormProvider, useForm } from 'react-hook-form';
import useMatchMedia from 'use-match-media-hook'

const queries = [
  '(max-width: 1023px)',
  '(min-width: 1024px)'
]

function App() {

  const [isMobile, isDesktop] = useMatchMedia(queries)
  const [toggleMenuDisplay, setToggleMenuDisplay] = useState(false)

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
  }, [isMobile])

    useEffect(() => {
    console.log(`🚀 ~ App ~ isDesktop:`, isDesktop)
  }, [isDesktop])

  const formMethods = useForm<FormValues>({
      reValidateMode: 'onSubmit',
      mode: 'onSubmit',
  })
  
  return (
    <div className="App">
      <div className="container top-container">
        <Header 
          isMobile={isMobile} 
          isDesktop={isDesktop}
          toggleMenuDisplay={toggleMenuDisplay}
          setToggleMenuDisplay={setToggleMenuDisplay}
        />
        <GetStarted />
      </div>
      <div className="container mid-container">
        <main className="app-main">
          <FormProvider {...formMethods}>
            <ShortenSection 
              isMobile={isMobile} 
              isDesktop={isDesktop}
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
