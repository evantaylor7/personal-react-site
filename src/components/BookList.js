import React from "react"
import Book from "./Book.js"

function BookList(props){
    const {bookData} = props
    const book = bookData && bookData.map(item => (
        <Book 
            key={item.id}
            item={item}
            {...props}
        />
    ))

    return(
        <>
            {book}
        </>
    )
}

export default BookList