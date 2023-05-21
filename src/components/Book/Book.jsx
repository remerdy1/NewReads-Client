import { Link } from "react-router-dom";

const Book = props =>{
    return (
        props.isbn ?
        <Link to={`/book/${props.isbn}`} state={{test: "test"}}>
            <img src={props.cover} alt={props.title} key={props.rank} className={props.className}/>
        </Link>
        :
        <img src={props.src} alt={props.title} key={props.rank} className={props.className}/>
    )
}

export default Book;