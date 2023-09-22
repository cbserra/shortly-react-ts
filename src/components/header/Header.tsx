import React, {  } from 'react'
import './Header.css'
import Nav from './Nav'

type Props = {
  isMobile: boolean
  isDesktop: boolean
  toggleMenuDisplay: boolean
  setToggleMenuDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = (props: Props) => {
  const {isMobile, isDesktop} = props
  const {toggleMenuDisplay, setToggleMenuDisplay} = props

  return (
    <header className="app-header">
      <Nav 
        isMobile={isMobile} 
        isDesktop={isDesktop}
        toggleMenuDisplay={toggleMenuDisplay}
        setToggleMenuDisplay={setToggleMenuDisplay}
      />
    </header>
  )
}

export default Header