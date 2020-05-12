import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {withRouter} from 'react-router-dom'
import {APIContext} from "../APIContext"

function Navbar(props){
    const {theme} = useContext(APIContext)
    
    return(
        <div className={`${theme}-nav`}>
            <Link 
                className={props.location.pathname === "/" ? "nav-selected" : `${theme} ${theme}-element nav-element`} 
                to="/"
            >
            Home
            </Link>
            <Link 
                className={props.location.pathname === "/browse" ? "nav-selected" : `${theme} ${theme}-element nav-element`} 
                to="/browse"
            >
            Browse
            </Link>
            <Link 
                className={props.location.pathname === "/saved/read" || props.location.pathname === "/saved/unread" ? "nav-selected" : `${theme} ${theme}-element nav-element`} 
                to="/saved/unread"
            >
            My Books
            </Link>
            <Link 
                className={`${theme} ${theme}-element nav-title` }
                to="/"
            >
            BookMark
            </Link>
        </div>
    )
}

export default withRouter(Navbar)