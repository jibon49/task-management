import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { app } from "../../firebase-config";


export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            const userEmail = currentUser?.email || user?.email;
            const loggedEmail = { email: userEmail }
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        })
        
        return unSubscribe;
    }, [user?.email])



    const updateProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        });
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }


    
    

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        signOut(auth)
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const userInfo = {
        user,
        createUser,
        logIn,
        loading,
        logOut,
        updateProfile
    }



    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProviders.propTypes = {
    children: PropTypes.object
};

export default AuthProviders;