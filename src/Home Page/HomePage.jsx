import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Carousel, CarouselSlide } from "../components/Carousel/Carousel";
import Book from "../components/Book/Book";
import UserContext from "../Store/UserContext";
import { useEffect } from "react";

const HomePage = props =>{
    const {user, setUser} = useContext(UserContext);
    const [books, setBooks] = useState(null);
    const [loadFailed, setLoadFailed] = useState(false);

    const logoutHandler = async () =>{
        setUser(null);
        window.localStorage.clear();
    }
    
    const fetchBestSellers = async () =>{
        //todod hide api key
        try{
            const res = await axios.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=eAGvrTQu1g28Xm7AQMPjf8nV3p2bIyVl");
            return res.data.results;
        }catch(e){
            setLoadFailed(true);
        }
    }

    useEffect(() =>{
        (async () => {
            const res = await fetchBestSellers();
            const book = res.books;
            console.log(book);
            setBooks(book);
        })();
    }, [])
    
    //todo Search by name or isbn 
    const search = async e =>{
        e.preventDefault();
        const isbn = e.target.isbn.value;
        console.log(isbn);
        const res = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
        const book = res.data;
        console.log(book);
        //todo redirect to book page
        //* Redirect to page and make request on that page? 
    }

    return(
        <>
            {/*todo search bar*/}
            {/*https://openlibrary.org/dev/docs/api/search*/}
            <form onSubmit={search}>
                <input name="isbn" type="text" placeholder="Search by ibn"/>
                <button>search</button>
            </form>
            
            <h1>Welcome {user}</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni similique, veniam natus rerum fuga voluptate quo, tenetur, ipsa sint unde odit? Nam quibusdam a non in est magni, libero blanditiis!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni similique, veniam natus rerum fuga voluptate quo, tenetur, ipsa sint unde odit? Nam quibusdam a non in est magni, libero blanditiis!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni similique, veniam natus rerum fuga voluptate quo, tenetur, ipsa sint unde odit? Nam quibusdam a non in est magni, libero blanditiis!</p>
            <button className="btnPrimary" onClick={logoutHandler}>Logout</button>

            <h1>Popular Fiction:</h1>
            { books ?
                <Carousel>
                    <CarouselSlide>
                        {books.map(book => <Book cover={book.book_image} title={book.title} author={book.author} key={book.rank} rank={book.rank} className="carousel-img" isbn={book.isbns[0].isbn13 || book.isbns[1].isbn10}/>).slice(0, 3)}
                    </CarouselSlide>

                    <CarouselSlide>
                        {books.map(book => <Book cover={book.book_image} title={book.title} author={book.author} key={book.rank} rank={book.rank} className="carousel-img" isbn={book.isbns[0].isbn13 || book.isbns[1].isbn10}/>).slice(3, 6)}
                    </CarouselSlide>

                    <CarouselSlide>
                        {books.map(book => <Book cover={book.book_image} title={book.title} author={book.author} key={book.rank} rank={book.rank} className="carousel-img" isbn={book.isbns[0].isbn13 || book.isbns[1].isbn10}/>).slice(6, 9)}
                    </CarouselSlide>

                    <CarouselSlide>
                        {books.map(book => <Book cover={book.book_image} title={book.title} author={book.author} key={book.rank} rank={book.rank} className="carousel-img" isbn={book.isbns[0].isbn13 || book.isbns[1].isbn10}/>).slice(9, 12)}
                    </CarouselSlide>

                    <CarouselSlide>
                        {books.map(book => <Book cover={book.book_image} title={book.title} author={book.author} key={book.rank} rank={book.rank} className="carousel-img" isbn={book.isbns[0].isbn13 || book.isbns[1].isbn10}/>).slice(12, 15)}
                    </CarouselSlide>

                </Carousel>
                :
                
                <p className={"error"}>{loadFailed ? "Error loading. Please try again." : "Loading..."}</p>
            }
        </>
    )
}

export default HomePage;