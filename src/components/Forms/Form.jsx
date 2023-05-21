import React, {useState} from "react";

export const FormContext = React.createContext({
    form: {},
    handleFormChange: () =>{}
})

const Form = props =>{
    const {children} = props;

    const [form, setForm] = useState(props.initialValues);

    const handleFormChange = e => {
        const updatedForm = {...form};

        updatedForm[e.target.name] = e.target.value;

        setForm(updatedForm);
    };

    const onSubmit = e => {
        props.onSubmit(e);
        setForm(props.initialValues);
    }
    
    return(
        <form onSubmit={onSubmit} autoComplete="off" action={props.action} method={props.method}>
            <FormContext.Provider value={{form, handleFormChange}}>
                {children}
            </FormContext.Provider>
            <button className="btnPrimary" type="submit" disabled={props.isValid === false}>Submit</button>
        </form>
    )
}

export default Form;