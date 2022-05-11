import React, { RefObject } from "react"
import './ShortenResultCard.css'

const ShortenResultCard = (props : { 
    key: string,
    targetUrl: string, 
    shortUrl: string, 
    refProp: RefObject<HTMLDivElement> | null
}) => {

    function copyUrl(event: any) {
        const buttonElem = event.target
        const initButtonValue = buttonElem.textContent
        const initClassName = buttonElem.className

        navigator.clipboard.writeText(props.shortUrl)
            .then(value => {
                buttonElem.textContent = 'Copied!'
                buttonElem.className += ' click'
                setTimeout(function() {
                    buttonElem.textContent = initButtonValue
                    buttonElem.className = initClassName
                }, 2000)
            })
    }

    return (
        <div className="shorten-result-card" ref={props.refProp}>
            <span className="target-url">{props.targetUrl}</span>
            <span className="short-url">{props.shortUrl}</span>
            <button className="copy-btn" onClick={copyUrl}>Copy</button>
        </div>
    )
}

export default ShortenResultCard