import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../firebase'
import {buttonStyle, linkStyle, memberLoginText, normalText} from '../style'
import Topbar from './Topbar'
import Sidebar from './Sidebar'


export default function ChangeAdminCode() {
    const codeRef = useRef()
    const codeConfirmRef = useRef()
    const { sidebarVisible } = useAuth() // access directly to signup function from the AuthContext.Provider value
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault() // prevents any event action

        if(codeRef.current.value !== codeConfirmRef.current.value) {
            return setError('Admin codes do not match') // reason for return is to exit out of function immediately
        }

        try{
            setLoading(true)
            setError("")
            const postRef = db.ref("admin/" + "admin-code") // data store path
            const postData = { // data to store in firebase
                adminCode: codeRef.current.value
            }
            await postRef.set(postData) // push the data to userID folder in firebase realtime database 
            history.push("/update-admin")
        } catch {
            setError("Failed to update admin code")
        }

        setLoading(false)

    }
    
    return (
        <div className="d-flex flex-column" style={{height: "100vh"}}>
        <div ><Topbar current="changeAdminCodePage"  /></div>
        <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
        <Sidebar />
        <div id={sidebarVisible && "content"} className="d-flex align-items-center justify-content-center " style = {{flex: "1"}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}} >
                <Card className="shadow">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={memberLoginText}>Change Administrator Code</h2>
                        {error && <Alert variant="danger">{error}</Alert>} 
                        <Form onSubmit={handleSubmit}>
                        <Form.Group id="password">
                            <Form.Label style={ normalText }>Admin Code</Form.Label>
                            <Form.Control type="password" ref={codeRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label style={ normalText }>Admin Code Confirmation</Form.Label>
                            <Form.Control type="password" ref={codeConfirmRef} />
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
    )
}

