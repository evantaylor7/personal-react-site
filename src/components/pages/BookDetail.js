import React, {useContext} from "react"
import {useParams} from "react-router-dom"
import {APIContext} from "../../APIContext"
import {useHistory} from "react-router-dom"

function BookDetail(){
    const {bookId} = useParams()
    const {bookData, handleUnread, handleRead, theme} = useContext(APIContext)
    const thisBook = bookData.find(book => book.id === bookId)
    
    let authorList = thisBook && thisBook.volumeInfo.authors && thisBook.volumeInfo.authors.join(", ")
    
    const {goBack} = useHistory()
    
    return(
        <div className={`content book-detail`}>
            {thisBook && 
                <>
                    <div className="detail-left">
                        <img 
                            className="detail-img"
                            src={thisBook.volumeInfo.imageLinks && thisBook.volumeInfo.imageLinks.thumbnail} 
                            alt=""
                        />
                        <div>
                            <button className="detail-unread" onClick={() => handleUnread(thisBook)}>
                                Want to Read
                            </button>
                            <button className="detail-read" onClick={() => handleRead(thisBook)}>
                                Read
                            </button>
                        </div>
                    </div>
                    <div className={`detail-right ${theme}-book-detail`}>
                        <h1 className="detail-element">
                            {thisBook.volumeInfo.title && thisBook.volumeInfo.title}
                        </h1>
                        <h2 className="detail-element">
                            <i>{thisBook.volumeInfo.subtitle && thisBook.volumeInfo.subtitle}</i>
                        </h2>
                        <h3 className="detail-element">
                            {thisBook.volumeInfo.authors && `Author${authorList.length > 1 ? "s" : ""}: `}
                            {authorList}
                        </h3>
                        <p className="detail-element">
                            {thisBook && thisBook.volumeInfo.description}
                        </p>
                        <p className="detail-element">
                            {
                                `${thisBook.volumeInfo.publisher ? 
                                    `Publisher: ${thisBook && thisBook.volumeInfo.publisher}` : 
                                    ""}`
                            } | {
                                thisBook && thisBook.volumeInfo.publishedDate ? 
                                    `Date published: ${thisBook.volumeInfo.publishedDate}` : 
                                    ""
                            } | <b>{thisBook && thisBook.volumeInfo.pageCount} pages</b>
                        </p>
                        <button onClick={() => goBack()}>Go Back</button>
                    </div>
                </>
            }
        </div>
    )
}

export default BookDetail