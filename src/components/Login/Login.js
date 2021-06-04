import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import './Login.css';
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  initializeLoginFramework()
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res)
        setLoggedInUser(res)
        console.log(res)
        history.replace(from)
      })
  }
  const googleSignOut = () => {
    handleSignOut()
      .then(res => {
        setUser(res)
        setLoggedInUser(res)
      })
  }
  const FbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
    })
  }
  
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email ,user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res => {
        setUser(res)
        setLoggedInUser(res)
        history.replace(from)
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res => {
        setUser(res)
        setLoggedInUser(res)
        history.replace(from)
      })
    }
    e.preventDefault();

  }
  // const signedInCondition = user.isSignedIn ? <div>
  //   <p>Welcome, {user.name} </p>
  //   <p>Your email: {user.email}</p>
  //   <img src={user.photo} alt="" />
  // </div> : <p>User Couldn't Find...Please Sign in with valid email</p>;

  return (
    <div className="login-container">
      
         <button onClick={googleSignIn}>Sign in</button>
      
      {/* 
        user.isSignedIn && <div>
        <p>Welcome, {user.name} </p>
        <p>Your email: {user.email}</p>
        <img src={user.photo} alt="" />
      </div> 
       */}
      {/* {
        signedInCondition
      } */}
      <br />
      <button onClick={FbSignIn}>Facebook Login</button>

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      {/* Created Email and Sign Up  */}
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" placeholder="Enter Your Name" />}
        <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Your Email" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter Your Password" required />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>
      }
    </div>
  );
}

export default Login;
