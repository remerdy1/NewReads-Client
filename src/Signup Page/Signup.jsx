import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Store/UserContext";
import Form from "../components/Forms/Form";
import FormInput from "../components/Forms/FormInput";
const axios = require("axios");

const Signup = props =>{
    const {usernameCheck, passwordCheck, emailCheck, confirmPasswordCheck} = props;
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const onFormSubmit = async e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if(usernameCheck(username) && passwordCheck(password) && emailCheck(email) && confirmPasswordCheck(confirmPassword, password)){
            try{
                const res = await axios.post(`${api}/signup`,{
                    email,
                    username,
                    password,
                    confirmPassword
                })

                setUser(res.data.user.username);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", res.data.user.username);
                navigate("/");
            }catch(e){
                alert(e.message + ": " + e.response.data.message);
                setEmailIsValid(false);
                setUsernameIsValid(false);
                setPasswordIsValid(false);
                setConfirmPasswordIsValid(false);
            }
        }

    }
    
    const api = process.env.REACT_APP_API_URL;
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
    let formIsValid = emailIsValid && usernameIsValid && passwordIsValid && confirmPasswordIsValid;

    return(
        <>
            <Form initialValues={{email: "", username: "", password: "", confirmPassword: ""}} onSubmit={onFormSubmit} action={`${api}/signup`} method="POST" isValid={formIsValid}>
                <FormInput label="Email" name="email" type="email" validCheck={emailCheck} setIsValid={setEmailIsValid} isValid={emailIsValid}/>
                <FormInput label="Username" name="username" type="text" validCheck={usernameCheck} setIsValid={setUsernameIsValid} isValid={usernameIsValid}/>
                <FormInput label="Password" name="password" type="password" validCheck={passwordCheck} setIsValid={setPasswordIsValid} isValid={passwordIsValid}/>
                <p>At least eight characters and one number</p>
                <FormInput label="Confirm Password" name="confirmPassword" type="password" validCheck={confirmPasswordCheck} setIsValid={setConfirmPasswordIsValid} isValid={confirmPasswordIsValid}/>
            </Form>
        </>
    )
}

export default Signup;