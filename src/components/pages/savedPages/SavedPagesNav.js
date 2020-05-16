import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {withRouter} from 'react-router-dom'
import {APIContext} from "../../../APIContext"

function SavedPagesNav(props){
    const {theme} = useContext(APIContext)
    const {location: {pathname}} = props

    return(
        <div className={`${theme}-search-form saved-nav`}>
            <h2>Collections:</h2><br/>
            <div className='saved-links-container'>
                <Link 
                    className={pathname === "/saved/unread" ? "saved-selected" : `${theme}-saved-link saved-link`} 
                    to="/saved/unread"
                >
                    Want to Read
                </Link>
                <br/><br/>
                <Link 
                    className={pathname === "/saved/read" ? "saved-selected" : `${theme}-saved-link saved-link`} 
                    to="/saved/read"
                >
                    Read
                </Link>
            </div>
        </div>
    )
}

export default withRouter(SavedPagesNav)