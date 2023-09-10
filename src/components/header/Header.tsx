import React, { useEffect, useState } from 'react'
import './Header.css'
import Nav from './Nav'
import { DeviceType } from '../../types/ShortenTypes'

type Props = {
  isMobile: boolean
  setIsMobile: (value: React.SetStateAction<boolean>) => void
  isDesktop: boolean
  setIsDesktop: (value: React.SetStateAction<boolean>) => void
  toggleMenuDisplay: boolean
  setToggleMenuDisplay: React.Dispatch<React.SetStateAction<boolean>>
  previousDeviceType: DeviceType
  setPreviousDeviceType: (value: React.SetStateAction<DeviceType>) => void
  currentDeviceType: DeviceType
  setCurrentDeviceType:  (value: React.SetStateAction<DeviceType>) => void
}

const Header = (props: Props) => {
  const {isMobile, setIsMobile} = props
  const {isDesktop, setIsDesktop} = props
  const {toggleMenuDisplay, setToggleMenuDisplay} = props
  const {previousDeviceType, setPreviousDeviceType} = props
  const {currentDeviceType, setCurrentDeviceType} = props

  // const listenToScroll = () => {
  //   let heightToHideFrom = 100;
  //   const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

  //   if (winScroll > heightToHideFrom) {  
  //       // console.debug(`🚀 ~ listendToScroll ~ winScroll:`, winScroll)
  //       // console.debug(`🚀 ~ listenToScroll ~ heightToHideFrom:`, heightToHideFrom)
  //       // console.debug(`🚀 ~ listenToScroll ~ toggleMenuDisplay:`, toggleMenuDisplay)
        
  //       if (toggleMenuDisplay) {
  //           setToggleMenuDisplay(false);
  //       }
  //   }
  // };

  // useEffect(() => {   
  //     window.addEventListener("scroll", listenToScroll);
  //     return () => 
  //         window.removeEventListener("scroll", listenToScroll); 
  // })

    useEffect(() => {
        console.log(`🚀 ~ useEffect ~ isDesktop:`, isDesktop)
        console.log(`🚀 ~ useEffect ~ isMobile:`, isMobile)

        setIsDesktop(isDesktop)
        setIsMobile(isMobile)
    }, [isMobile, isDesktop, setIsDesktop, setIsMobile])
  
  return (
    <header className="app-header">
      <Nav 
        isMobile={isMobile} 
        setIsMobile={setIsMobile}
        isDesktop={isDesktop}
        setIsDesktop={setIsDesktop}
        toggleMenuDisplay={toggleMenuDisplay}
        setToggleMenuDisplay={setToggleMenuDisplay}
        previousDeviceType={previousDeviceType}
        setPreviousDeviceType={setPreviousDeviceType}
        currentDeviceType={currentDeviceType}
        setCurrentDeviceType={setCurrentDeviceType}
      />
    </header>
  )
}

export default Header