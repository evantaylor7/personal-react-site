import React, {useContext, useState} from "react"
import {useParams} from "react-router-dom"
import {APIContext} from "../../APIContext"
import {useHistory} from "react-router-dom"

function BookDetail(){
    const {bookId} = useParams()
    const {bookData, handleUnread, handleRead, theme, unread, read} = useContext(APIContext)

    const thisBook = bookData.find(book => book.id === bookId)
    
    let authorList = thisBook && thisBook.volumeInfo.authors && thisBook.volumeInfo.authors.join(", ")
    
    const {goBack} = useHistory()

    const [popup, setPopup] = useState('')

    function handleSaveRead(){
        handleRead(thisBook)
        setPopup('read')
        setTimeout(() => setPopup(''), 2400)
    }

    function handleSaveUnread(){
        handleUnread(thisBook)
        setPopup('unread')
        setTimeout(() => setPopup(''), 2400)
    }

    function convertDate(){
        const date = thisBook.volumeInfo.publishedDate
        if(date.length === 4){
            return `Date published: ${date}`
        } else if(date.length === 7){
            const dateArr = date.split('-')
            return `Date published: ${[dateArr[1], dateArr[0]].join('/')}`
        } else {
            const dateArr = date.split('-')
            return `Date published: ${[dateArr[1], dateArr[2], dateArr[0]].join('/')}`
        }
    }
    
    return(
        <div className={`content book-detail`}>
            {
            thisBook && 
                <>
                    <div className="detail-left">
                        <img 
                            className="detail-img"
                            src={thisBook.volumeInfo.imageLinks && thisBook.volumeInfo.imageLinks.thumbnail} 
                            alt=""
                        />
                        <div className='book-buttons-container-detail'>
                            <div>
                                <p 
                                    className={`${theme}-popup popup${popup === "unread" ? "-active unread-popup" : ""}`}
                                >
                                    Saved in Want to Read!
                                </p>
                                <button 
                                    className="detail-unread" 
                                    onClick={handleSaveUnread}
                                    disabled={unread.includes(thisBook)}
                                >
                                    Want to Read
                                </button>
                            </div>
                            <div>
                                <p 
                                    className={`${theme}-popup popup${popup === "read" ? "-active read-popup" : ""}`}
                                >
                                    Saved in Read!
                                </p>
                                <button 
                                    className="detail-read" 
                                    onClick={handleSaveRead}
                                    disabled={read.includes(thisBook)}
                                >
                                    Read
                                </button>
                            </div>
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
                            {thisBook.volumeInfo.authors && `Author${authorList.split(",").length > 1 ? "s" : ""}: `}
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
                            } 
                            {((thisBook.volumeInfo.pageCount || thisBook.volumeInfo.publishedDate) && thisBook.volumeInfo.publisher) && ' | '} 
                            {
                                thisBook && thisBook.volumeInfo.publishedDate && 
                                    (convertDate())
                            }
                            {((thisBook.volumeInfo.publisher || thisBook.volumeInfo.publishedDate) && thisBook.volumeInfo.pageCount) && ' | '} 
                            <b>
                                {
                                thisBook && thisBook.volumeInfo.pageCount && 
                                    `${thisBook.volumeInfo.pageCount} pages`
                                }
                            </b>
                        </p>
                        <button onClick={() => goBack()}>Go Back</button>
                    </div>
                </>
            }
        </div>
    )
}

export default BookDetail