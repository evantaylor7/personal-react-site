import React, {useContext} from "react"
import SavedPagesNav from "./SavedPagesNav"
import BookList from "../../BookList.js"
import {APIContext} from "../../../APIContext"

function Read(){
    const {read, handleDeleteRead, theme} = useContext(APIContext)

    return(
        <div className="content saved-page">
            <SavedPagesNav />
            <div className="book-page">
                <BookList 
                    bookData={read}
                    handleDelete={handleDeleteRead}
                    theme={theme}
                />
            </div>
        </div>
    )
}

export default Read