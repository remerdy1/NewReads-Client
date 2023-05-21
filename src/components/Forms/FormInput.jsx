import { useState } from "react";
import { useContext } from "react";
import { FormContext } from "./Form";

import styles from "./Form.module.css"

const FormInput = props =>{
    
    const {form, handleFormChange} = useContext(FormContext);
    const [isClicked, setIsClicked] = useState(false);

    const onBlurHandler = e =>{
        setIsClicked(true);

        if(props.name === "confirmPassword" && props.setIsValid) props.setIsValid(props.validCheck(e.target.value, form.password));
        else if(props.setIsValid) props.setIsValid(props.validCheck(e.target.value));
    }

    return(
        <div className={styles.formSection}>
            <label>{props.label}:</label>
            <input className={styles.formInput} type={props.type} value={form[props.name]} onChange={handleFormChange} name={props.name} onBlur={onBlurHandler} min={props.min} max={props.max}/>
            {props.isValid === false && isClicked && <p className={styles.errorText}><strong>{props.label} is invalid</strong></p>}
        </div>
    )
}

export default FormInput