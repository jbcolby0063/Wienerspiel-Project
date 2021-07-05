import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import {buttonStyle, linkStyle, memberLoginText, normalText} from '../style'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

export default function UpdateProfile() {
    const emailRef = useRef()
    const { currentUser, updateEmail, sidebarVisible } = useAuth() // access directly to signup function from the AuthContext.Provider value
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault() // prevents any event action

        const promises = []
        setLoading(true) // disable submit button until promise finish
        setError("")
        if (emailRef.current.value !== currentUser.email) { // if email changes, push that promise to promises array
            promises.push(updateEmail(emailRef.current.value)) 
        }

        Promise.all(promises).then(() => { // if promises are successful
            history.push('/')
        }).catch(() => { // if fails
            setError("Failed to update account")
        }).finally(() => { 
            setLoading(false)
        })
    }
    
    return (
    <>
    <div className="d-flex flex-column" style={{height: "100vh"}}>
        <div ><Topbar  /></div>
        <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
        <Sidebar />
        <div id={sidebarVisible && "content"} className="content d-flex align-items-center justify-content-center " style = {{flex: "1"}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}} >
                <Card className="shadow">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={memberLoginText}>Update Email</h2>
                        {error && <Alert variant="danger">{error}</Alert>} 
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label style={ normalText }>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit" variant="danger" style={ buttonStyle }>Update</Button>
                        </Form>
                    </Card.Body>
                </Card>   
                <div className="w-100 text-center mt-2">
                    <Link to="/" style={linkStyle}>Cancel</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    )
}
