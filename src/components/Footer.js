import React, {useContext} from "react"
import {APIContext} from "../APIContext"

function Footer(){
    const {theme, switchTheme} = useContext(APIContext)

    return(
        <div className={`${theme}-footer`}>
            <p className="footer-text">This website was made possible by the Google Books API</p>
            <p className="signature">Evan Taylor — 2020</p>
            <button 
                className={`${theme}-theme-button theme-button`}
                onClick={switchTheme}
            >
                {theme === "light" ? "Dark" : "Light"} Theme
            </button>
        </div>
    )
}

export default Footer