import React from "react"
import {Link} from "react-router-dom"

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
    const authorList = authors && authors.join(", ")

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
                    <>
                        <button className="detail-unread" onClick={() => handleUnread(item)}>Want to Read</button>
                        <button className="detail-read" onClick={() => handleRead(item)}>Read</button>
                    </>
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