import styles from "./Modal.module.css";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";

const Modal = props =>{
    const onFormSubmit = e =>{
        console.log(e);
    }

    return (
        <div className={styles.modal}>
            <h1>{props.title}</h1>
            <Form initialValues={{rating: 0}} onSubmit={onFormSubmit} action={"POST"} method="/">
                <FormInput label="Rating" type="number" name="rating" min={0} max={10}/>
            </Form>
            <button onClick={props.toggleModal}>Close</button>
        </div>
    )
}

export default Modal;