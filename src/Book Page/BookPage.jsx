import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookPage.module.css";
import Modal from "../components/Modal/Modal";
const axios = require("axios");

const BookPage = (props) =>{
    const {isbn} = useParams();
    const [bookData, setBookData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() =>{
        (async () =>{
            const book = {};

            try{
                const res = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
                console.log(res);
                book.authors = res.data.authors;
                book.publish_date = res.data.publish_date;
                book.title = res.data.title;
                book.cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
            }catch(e){
                setErrorLoading(true);
            }

            setBookData(book);    
        })();
    }, [isbn])

    const toggleModal = () => setShowModal(!showModal);
    
    return (
        (bookData && !errorLoading) ?
        <>
            {showModal && <Modal title={bookData.title} toggleModal={toggleModal}/>}

            <div className={styles.container}>
                <div className="section-one">
                    <h1>{bookData.title}</h1>
                    <p>{bookData.publish_date}</p>
                    <img src={bookData.cover} alt={bookData.title} style={{width: "20vw"}}/>
                    <button onClick={toggleModal}>Save</button> {/*todo Pop up modal
                        Status
                        Rating 
                        Favourite
                        Start Date
                        End Date 
                    */}
                </div>

                <div className="section-two">
                    <h1>Discussion:</h1>
                    {/*Input field, display comments, pagination, carousel?*/}
                </div>
            </div>
        </>
        :
        errorLoading ? <p className="error">An error occurred</p> : <p>Loading...</p>
    )
}

export default BookPage;