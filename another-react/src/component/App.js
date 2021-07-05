import React from "react"
import SignUp from "./SignUp"
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import Analytics from "./Analytics"

// https://getbootstrap.com/docs/4.1/utilities/flex/
// npm i bootstrap react-bootstrap 
// npm install react-router-dom
// npm i firebase
// npm install --save react-chartjs-2 chart.js

function App() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} /> 
              <PrivateRoute path="/analytics" component={Analytics} /> 
              <PrivateRoute path="/update-profile" component={UpdateProfile} /> 
              <PrivateRoute path="/update-password" component={UpdatePassword} /> 
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App;
