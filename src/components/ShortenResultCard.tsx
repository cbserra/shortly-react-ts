import React from "react"
import './ShortenResultCard.css'

const ShortenResultCard = (props : { targetUrl: string, shortUrl: string}) => {
    return (
        <div className="shorten-result-card">
            <span className="target-url">{props.targetUrl}</span>
            <span className="short-url">{props.shortUrl}</span>
            <button className="copy-btn">Copy</button>
        </div>
    )
}

export default ShortenResultCard