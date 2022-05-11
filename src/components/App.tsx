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

function App() {
  const isDesktop = useMediaQuery({query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })
  const [toggleMenuDisplay, setToggleMenuDisplay] = useState(false)

  const listenToScroll = () => {
    let heightToHideFrom = 100;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {  
        console.log('toggleMenuDisplay = ' + toggleMenuDisplay)
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


  const toggleMobileMenu = () => {
      setToggleMenuDisplay((prevValue) => !prevValue) 
  }

   
  return (
    <div className="App">
      <header className="app-header">
        <Nav 
          isMobile={isMobile} 
          isDesktop={isDesktop}
          toggleMenu={toggleMenuDisplay} 
          toggleMenuFun={setToggleMenuDisplay}
          toggleMobileMenuFun={toggleMobileMenu} />
        <GetStarted />
      </header>
      <main className="app-main">
        <ShortenSection />
        <Statistics />
      </main>
      <footer className="app-footer">
        <BoostLinks />
        <Footer />
      </footer>
    </div>
  );
}

export default App;
