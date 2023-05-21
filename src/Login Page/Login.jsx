import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Forms/Form";
import FormInput from "../components/Forms/FormInput";
import styles from "./Login.module.css";
import UserContext from "../Store/UserContext";
const axios = require("axios");

const Login = props =>{
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const {usernameCheck, passwordCheck} = props; 

    const [hasError, setHasError] = useState(false);

    const formSubmitHandler = async e =>{
        e.preventDefault();
        
        const username = e.target.username.value;
        const password  = e.target.password.value;

        try{
            const res = await axios.post(`${api}/login`, {
                username, 
                password
            })

            setHasError(false);
            setUser(res.data.user.username);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user.username);
            navigate("/");
        }catch(e){
            setHasError(true);
        }
    }

    const api = process.env.REACT_APP_API_URL;

    return(
        <>            
            <div className={styles.imageContainer}>
              <img className={styles.loginImage} src="https://images.unsplash.com/photo-1520467795206-62e33627e6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt=""/>
            </div>
            
            <Form initialValues={{username: "", password: ""}} onSubmit={formSubmitHandler} action={`${api}/signup`}>
                {hasError && <p>Invalid credentials. Please try again.</p>}
                <FormInput label="Username" type="text" name="username" validCheck={usernameCheck}/>
                <FormInput label="Password" type="password" name="password" validCheck={passwordCheck}/>
            </Form>
        </>
    )
}

export default Login;