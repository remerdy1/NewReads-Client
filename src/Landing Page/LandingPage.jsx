import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css";
import {Carousel, CarouselSlide} from "../components/Carousel/Carousel";
import Book from "../components/Book/Book";

const LandingPage = () =>{
    return(
        <>  
            <div className={styles.container}>
                <div className={styles.section}>
                    <img className={styles.image} src="./landing-page-books.avif" alt="pile of books" />
                </div>

                <div className={styles.section}>
                    <h1>Welcome To NewReads</h1>
                    <br />
                    <p>
                        Explore the books that you love with NewReads, a new web app that allows you to track, rate and comment on thousands of books from across the world. 
                        NewReads aims to support beginner and veteran readers alike with a simple, easy to use UI that allows you to find every feature you're looking for  
                        with minimal effort. Create an account to get started today.
                    </p>
                    <br />
                    <div className={styles.buttonContainer}>
                        <Link to="/login">
                            <button className="btnSecondary">Log-In</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btnPrimary">Sign-Up</button>
                        </Link>
                    </div>
                </div>
            </div>  
            
            <div className={styles.popularReads}>
                <h1>Popular Reads:</h1>

                
                <Carousel>
                    <CarouselSlide>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/81m1s4wIPML.jpg`} alt="book 1"/>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/71QKQ9mwV7L.jpg`} alt="book 2"/>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/71N+1tUQeoL.jpg`} alt="book 3"/>
                    </CarouselSlide>
                    <CarouselSlide>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/91qQRhs0mlS.jpg`} alt="book "/>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/81tadC4LSVL.jpg`} alt="book "/>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/1847941834.01._SCLZZZZZZZ_SX500_.jpg`} alt="book 4"/>
                    </CarouselSlide>
                    <CarouselSlide>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/51dFVDHybrL.jpg`} alt="book 5"/>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/91I42NPJC7L.jpg`} alt="book 6"/>
                        <Book className="carousel-img" src={`${process.env.PUBLIC_URL}/images/916hBZ8777L.jpg`} alt="book 7"/>
                    </CarouselSlide>
                </Carousel>
            </div>
        </>
    )
}

export default LandingPage;