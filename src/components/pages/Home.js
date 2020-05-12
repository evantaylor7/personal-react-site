import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {APIContext} from "../../APIContext"

function Home(){
    const {theme} = useContext(APIContext)
    
    return(
        <div className={`${theme} content title-page`}>
            <h1><i>welcome to</i></h1><br/>
            <h1 className="title">BookMark</h1>
            <h1>Discover new books.</h1><br/><br/>
            <h1>Save your books.</h1><br/>
            <div>
                <Link to="/browse"><button className="start-button">Start here</button></Link>
            </div>
        </div>
    )
}

export default Home