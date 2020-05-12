import React, {useState, useEffect} from "react"
import axios from "axios"
import dotENV from ".../../dotenv"
dotENV.config()

export const APIContext = React.createContext()

export default function APIContextProvider(props){
    const initialInputs = {
        bookData: [],
        search: localStorage.getItem('search') || "",
        genre: "",
        sort: "",
        page: 0,
        read: [],
        unread: [],
        theme: "light"
    }
    const [inputs, setInputs] = useState(initialInputs)
    const {search, genre, sort, page} = inputs

    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}${genre}${sort}&key=${apiKey}&startIndex=${page}&maxResults=12`)
            .then(response => {
                setInputs(prevInputs => ({
                    ...prevInputs,
                    bookData: response.data.items
                }))
                setInputs(prevInputs => ({
                    ...prevInputs,
                    lastPage: response.data.totalItems
                }))
            })
    }, [search, genre, sort, page, apiKey])

    function searchChange(e){
        const value = e.target.value
        localStorage.setItem("search", value)
        setInputs(prevInputs => ({
            ...prevInputs,
            search: value,
            page: 0
        }))
    }

    function genreChange(e){
        const value = e.target.value
        setInputs(prevInputs => ({
            ...prevInputs,
            genre: value
        }))
    }

    function sortChange(e){
        const value = e.target.value
        setInputs(prevInputs => ({
            ...prevInputs,
            sort: value
        }))
    }

    function handlePageChange(e){
        window.scrollTo(0, 0)
        setInputs(prevInputs => ({
            ...prevInputs,
            page: e === "decrement" ? prevInputs.page - 12 : e === "increment" ? prevInputs.page += 12 : 0
        }))
    }

    function handleRead(item){
        const thisBook = inputs.read.find(book => book.id === item.id) 
        if(thisBook){
            alert("Already saved in 'read'!")
        } else {
            alert("Book saved in 'read'!")
            setInputs(prevInputs => ({
                ...prevInputs,
                read: [...prevInputs.read, item]
            }))
        }
    }

    function handleUnread(item){
        const thisBook = inputs.unread.find(book => book.id === item.id) 
        if(thisBook){
            alert("Already saved in 'want to read'!")
        } else {
            alert("Book saved in 'want to read'!")
            setInputs(prevInputs => ({
                ...prevInputs,
                unread: [...prevInputs.unread, item]
            }))
        }
    }

    function handleDeleteRead(item){
        setInputs(prevInputs => ({
            ...prevInputs,
            read: prevInputs.read.filter(book => book.id !== item.id)
        }))
    }

    function handleDeleteUnread(item){
        setInputs(prevInputs => ({
            ...prevInputs,
            unread: prevInputs.unread.filter(book => book.id !== item.id)
        }))
    }

    function switchTheme(){
        setInputs(prevInputs => ({
            ...prevInputs,
            theme: prevInputs.theme === "light" ? "dark" : "light"
        }))
    }

    return(
        <APIContext.Provider value=
            {{
            ...inputs,
            searchChange, 
            genreChange, 
            sortChange, 
            handlePageChange, 
            handleRead, 
            handleUnread, 
            handleDeleteRead,
            handleDeleteUnread,
            switchTheme
            }}
        >
            {props.children}
        </APIContext.Provider>
    )
}