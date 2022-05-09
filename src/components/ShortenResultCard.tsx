import React from "react"
import './ShortenResultCard.css'

const ShortenResultCard = (props : { 
    key: string,
    targetUrl: string, 
    shortUrl: string, 
    shareLink: string
}) => {

    const shareLink = props.shareLink
    function copyUrl(event: any) {
        const buttonElem = event.target
        const initButtonValue = buttonElem.textContent
        const initClassName = buttonElem.className

        navigator.clipboard.writeText(shareLink)
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
        <div className="shorten-result-card">
            <span className="target-url">{props.targetUrl}</span>
            <span className="short-url">{props.shortUrl}</span>
            <button className="copy-btn" onClick={copyUrl}>Copy</button>
        </div>
    )
}

export default ShortenResultCard