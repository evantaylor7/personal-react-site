import React, {useContext} from "react"
import BookList from "../BookList.js"
import {APIContext} from "../../APIContext"

function Browse(){
    const {bookData, 
        search, 
        genre, 
        sort, 
        searchChange, 
        genreChange, 
        sortChange, 
        page, 
        lastPage,
        handlePageChange, 
        handleRead, 
        handleUnread,
        theme} 
        = useContext(APIContext)

    return (
        <div className="content browse-page">
            <form className={`${theme}-search-form search-form`} onSubmit={e => e.preventDefault()}>
                <h3 className="search-by">Search by title/author/keyword:</h3>
                <input 
                    value={search} 
                    className="search-input" 
                    onChange={searchChange} 
                    placeholder="start typing to see results"
                />
                <br/><br/><hr/><br/>
                <h3>Refine search by:</h3>
                <br/>
                <label>Genre: </label>
                <select className="genre-input" onChange={genreChange} value={genre}>
                    <option></option>
                    <option value="subject:nonfiction">Non-Fiction</option>
                    <option value="+subject:fiction">Fiction</option>
                    <option value="+subject:classics">Classics</option>
                    <option value="+subject:fantasy">Fantasy</option>
                    <option value="+subject:mystery">Mystery</option>
                    <option value="+subject:historical+fiction">Historical Fiction</option>
                    <option value="+subject:history">History</option>
                    <option value="+subject:romance">Romance</option>
                    <option value="+subject:science+fiction">Science Fiction</option>
                    <option value="+subject:poetry">Poetry</option>
                    <option value="+subject:self+help">Self-Help</option>
                </select>
                <br/><br/>
                <label>Sort by: </label>
                <select className="order-input" onChange={sortChange} value={sort}>
                    <option value="&orderBy=relevance">Relevance</option>
                    <option value="&orderBy=newest">Newest</option>
                </select>
            </form>
            <div className="book-page">
                <BookList 
                    bookData={bookData} 
                    handleRead={handleRead} 
                    handleUnread={handleUnread} 
                    theme={theme}
                />
            </div>
            <div className="page-change-container">
                <button 
                    className="page-button" 
                    onClick={() => handlePageChange("first")} 
                    disabled={page === 0}
                >
                    First
                </button>
                <button 
                    className="page-button" 
                    onClick={() => handlePageChange("decrement")} 
                    disabled={page === 0}
                >
                    Previous
                </button>
                <button 
                    className="page-button" 
                    onClick={() => handlePageChange("increment")} 
                    disabled={page > (lastPage - 12)}
                >
                    Next
                </button>
                <p>{search === "" ? "" : `Page ${(page / 12) + 1}`}</p>
            </div>
        </div>
    )
}

export default Browse