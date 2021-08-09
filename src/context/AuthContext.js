import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() { // access to AuthContext provider through useAuth()
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentAdmin, setCurrentAdmin] = useState("") // current user admin status
    const [currentProfilePic, setCurrentProfilePic] = useState(null) // user profile picture
    const [loading, setLoading] = useState(true)
    const [sidebarVisible, setSidebarVisible] = useState(true)
    const [currentScreen, setCurrentScreen] = useState(window.innerWidth)
    const [postDetailData, setPostDetailData] = useState(false)

    function showSidebar() {
        return setSidebarVisible(!sidebarVisible)
    }

    function signup(email, password) { // create user email and password
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email) // sends password reset instructions to user email
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => { // set the user in currentUser once the user is created
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setCurrentAdmin(user.displayName)
            setCurrentProfilePic(user.photoURL)
            setLoading(false) // after the verification of the user, we stop the loading
            if (window.innerWidth < 1300) {
                setSidebarVisible(false)
            }
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        currentAdmin,
        currentProfilePic,
        setCurrentProfilePic,
        setCurrentAdmin,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        showSidebar,
        sidebarVisible,
        setSidebarVisible,
        currentScreen,
        setCurrentScreen,
        postDetailData,
        setPostDetailData
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
