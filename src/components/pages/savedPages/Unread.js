import React, {useContext, useState} from "react"
import SavedPagesNav from "./SavedPagesNav"
import BookList from "../../BookList.js"
import {APIContext} from "../../../APIContext"

function Unread(){
    const {unread, handleDeleteUnread, theme} = useContext(APIContext)

    const [snackbarToggle, setSnackbarToggle] = useState(false)

    function handleDelete(item){
        handleDeleteUnread(item)
        setSnackbarToggle(true)
        setTimeout(() => setSnackbarToggle(false), 3000)
    }

    return(
        <div className="content saved-page">
            <SavedPagesNav />
            <div className="saved-books">
                <BookList 
                    bookData={unread}
                    handleDelete={handleDelete}
                    theme={theme}
                />
            </div>
            {snackbarToggle && <div className={`snackbar ${theme}-snackbar`}>Book Removed from "Want to Read"</div>}
        </div>
    )
}

export default Unread