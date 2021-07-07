import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Purpose of PrivateRoute : Prevent from accessing Dashboard even though we log out -> redirect to login page
export default function PrivateRoute({ component: Component, ...rest }) { // wrapper for current Route, ...rest => rest of the props that were passed to Route
    const { currentUser } = useAuth()

    return (
        <Route // customize Route
        {...rest} // keep the props 
        render={props => { // check to see if there's currentUser 
            return currentUser ? <Component {...props} /> : <Redirect to="/login" /> 
            // if there is a currentUser, then render the Component that passed into this function (in this case, Dashboard component)
            // if there is no currentUSer, then redirect to login page (cannot access Dashboard until login)
        }}>
        
        </Route>
    )
}
