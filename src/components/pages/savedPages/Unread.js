import React, {useContext} from "react"
import SavedPagesNav from "./SavedPagesNav"
import BookList from "../../BookList.js"
import {APIContext} from "../../../APIContext"

function Unread(){
    const {unread, handleDeleteUnread, theme} = useContext(APIContext)

    return(
        <div className="content saved-page">
            <SavedPagesNav />
            <div className="book-page">
                <BookList 
                    bookData={unread}
                    handleDelete={handleDeleteUnread}
                    theme={theme}
                />
            </div>
        </div>
    )
}

export default Unread