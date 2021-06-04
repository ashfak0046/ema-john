import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const singedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            setUserToken();
            return singedInUser;
        })
        .catch(error => {
            console.log(error)
            console.log(error.message)
            console.log(error.credential)
        })
}

const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        sessionStorage.setItem('token',idToken)
    }).catch(function (error) {
       
    });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signOutUser;
        })
        .catch(error => {
            console.log(error)
        })
}

export const handleFbSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    console.log('clicked')
    return firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            var token = result.credential.accessToken;
            var user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            console.log("Error", error)
            var errorCode = error.code;
            console.log("Error Code:", errorCode)
            var errorMessage = error.message;
            console.log("Error Message:", errorMessage);
            var email = error.email;
            console.log("Email Error:", email);
            var credential = error.credential;
            console.log("Credential Error:", credential)

        });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            // Signed in 
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo
            // ...
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
            // ..
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            // Signed in
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
            // ...
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User name updated successfully')
    }).catch(function (error) {
        // An error happened.
    });
}