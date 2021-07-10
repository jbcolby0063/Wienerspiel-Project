import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({ component: Component, ...rest }) { // wrapper for current Route, ...rest => rest of the props that were passed to Route
    const { currentUser, currentAdmin } = useAuth()

    return (
        <Route // customize Route
        {...rest} // keep the props 
        render={props => { // check to see if there's currentUser 
            return (currentUser && currentAdmin === "admin") ? <Component {...props} /> : <Redirect to="/login" /> 
            // if there is a currentUser, then render the Component that passed into this function (in this case, Dashboard component)
            // if there is no currentUSer, then redirect to login page (cannot access Dashboard until login)
        }}>
        
        </Route>
    )
}