import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"
import APIContextProvider from "./APIContext"

import App from "./App"
import "./style.css"

ReactDOM.render(
    <Router>
        <APIContextProvider>
            <App />
        </APIContextProvider>
    </Router>,
    document.getElementById("root")
)