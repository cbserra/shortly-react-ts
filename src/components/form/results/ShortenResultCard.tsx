import React, { RefObject } from "react"
import './ShortenResultCard.css'

const ShortenResultCard = (props : { 
    targetUrl: string, 
    shortUrl: string, 
    refProp: RefObject<HTMLDivElement> | null
}) => {
    const targetUrl = props.targetUrl
    const shortUrl = props.shortUrl
    const refProp = props.refProp

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
        <div className="shorten-result-card" ref={refProp}>
            <div className="target-url">{targetUrl}</div>
            <div className="short-url">
                <span>{shortUrl}</span>
                <button className="copy-btn" onClick={copyUrl}>Copy</button>
            </div>
        </div>
    )
}

export default ShortenResultCard