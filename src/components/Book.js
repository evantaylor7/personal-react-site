import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"
import { APIContext } from "../APIContext"

function Book(props){
    const{
        item,
        item: {
            id,
            volumeInfo: {
                title,
                subtitle,
                imageLinks,
                authors
            }
        },
        theme,
        handleRead,
        handleUnread,
        handleDelete
    } = props
    const {unread, read} = useContext(APIContext)

    const authorList = authors && authors.join(", ")

    const [popup, setPopup] = useState('')

    function handleSaveRead(){
        handleRead(item)
        setPopup('read')
        setTimeout(() => setPopup(''), 2400)
    }

    function handleSaveUnread(){
        handleUnread(item)
        setPopup('unread')
        setTimeout(() => setPopup(''), 2400)
    }

    return (
        <div className={`${theme}-book-container book-container`}>
            <Link className="book-link" to={`/book/${id}`}>
                <div className={`${theme}-book-title book-title`}>
                    <h2 className="title-elements book-titles">{title}</h2>
                    <h3 className="title-elements book-titles"><i>{subtitle}</i></h3>
                    <img 
                        className="title-elements"
                        src={imageLinks && imageLinks.thumbnail} 
                        alt=""
                    />
                </div>
            </Link>
            <p>
                {authorList && `Author${authorList.split(",").length > 1 ? "s" : ""}: `}
                {authorList}
            </p><br/>
            {
            handleRead &&
                <div className='book-buttons-container'>
                    <div>
                        <p 
                            className={`${theme}-popup popup${popup === "unread" ? "-active unread-popup" : ""}`}
                        >
                            Saved in Want to Read!
                        </p>
                        <button 
                            className="detail-unread" 
                            onClick={handleSaveUnread}
                            disabled={unread.includes(item)}
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
                            disabled={read.includes(item)}
                        >
                            Read
                        </button>
                    </div>
                </div>
            }
            {
            handleDelete &&
                <>
                    <button onClick={() => handleDelete(item)}>Remove</button> 
                </>
            }
        </div>
    )
}

export default Book