import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage";
import Login from "./Login Page/Login";
import UserContext from "./Store/UserContext";
import Signup from "./Signup Page/Signup";
import HomePage from "./Home Page/HomePage";
import NavBar from "./components/NavBar/NavBar";
import BookPage from "./Book Page/BookPage";

function App(){
  const [user, setUser] = useState(null);

  const passwordCheck = password => {
    // Minimum eight characters and at least one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  }

  const confirmPasswordCheck = (password, confirm) => password.trim() === confirm.trim();
  const usernameCheck = username => username.trim().length !== 0;
  const emailCheck = email =>{
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email.trim());
  }
  
  useEffect(() =>{
    setUser(window.localStorage.getItem("user"));
  }, [])

  return (
      <Router>
        <UserContext.Provider value={{user, setUser}}>
        <NavBar />
          <Routes>
              <Route path="/" exact element={user ? <HomePage/> : <LandingPage />}/>
              <Route path="/login" exact element={<Login passwordCheck={passwordCheck} usernameCheck={usernameCheck}/>}/>
              <Route path="/signup" exact element={<Signup passwordCheck={passwordCheck} confirmPasswordCheck={confirmPasswordCheck} usernameCheck={usernameCheck} emailCheck={emailCheck}/>}/>
              <Route path="/book/:isbn" element={<BookPage />}/>
          </Routes>
        </UserContext.Provider>
      </Router>
  );
}

export default App;
