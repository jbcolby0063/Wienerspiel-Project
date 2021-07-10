import React, { useRef, useState, useEffect }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../firebase'
import {buttonStyle, linkStyle, memberLoginText, normalText, buttonStyle_ver2} from '../style'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

export default function UpdateAdmin() {
    const adminCodeRef = useRef()
    const [adminCode, setAdminCode] = useState("") // admin verification code
    const [adminStatus, setAdminStatus] = useState(null) 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { sidebarVisible, currentUser, currentAdmin, setCurrentAdmin } = useAuth() // access directly to signup function from the AuthContext.Provider value
    const history = useHistory()

    function adminCodeCheck() { // check whether admin code is correct
        setAdminStatus(null)
        if (adminCode === null) {
            setAdminStatus(true)
        }
        if (adminCode !== null && adminCodeRef.current.value.length === 0) {
            setAdminStatus(null)
        } else if (adminCode !== null && adminCodeRef.current.value.length > 0 && adminCodeRef.current.value === adminCode) {
            setAdminStatus(true)
        } else if (adminCode !== null && adminCodeRef.current.value.length > 0 && adminCodeRef.current.value !== adminCode) {
            setAdminStatus(false)
        }
    }

    async function disableAdmin(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")

            await currentUser.updateProfile({
                displayName: ""
            })
            setCurrentAdmin("")
        } catch {
            setError('Failed to update administrator status')
        } 

        setLoading(false)
        setAdminStatus(null)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")

            await currentUser.updateProfile({
                displayName: "admin"
            })
            setCurrentAdmin("admin")
        } catch {
            setError('Failed to update administrator status')
        } 

        setLoading(false)
        setAdminStatus(null)
    }

    useEffect(() => {
        const postRef = db.ref("admin/" + "admin-code")

        postRef.on('value', (snapshot) => { // get all post data from realtime db
            const data = snapshot.val()
            if (data !== null) {
                setAdminCode(data.adminCode)
            } else {
                setAdminCode(null)
            }
            
        })
    }, [])


    return (
        <div className="d-flex flex-column" style={{height: "100vh"}}>
        <div ><Topbar current="setAdminPage"  /></div>
        <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
        <Sidebar />
        <div id={sidebarVisible && "content"} className="d-flex align-items-center justify-content-center " style = {{flex: "1"}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}} >
                <Card className="shadow">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={memberLoginText}>Set Administrator</h2>
                        {error && <Alert variant="danger">{error}</Alert>} 
                        {(currentAdmin === "admin") ? 
                        (
                        <div>
                            <Alert variant="success" className="mt-5 mb-5">You are currently administrator!</Alert>
                            <Link className="w-100" to="/change-admin-code"><Button disabled={(loading) && true} className="w-100 mb-2" type="button" variant="light" style={ buttonStyle_ver2 }><div style={{color: "white"}}>Change Admin Code</div></Button></Link>
                            <Button disabled={(loading) && true} className="w-100" type="button" variant="danger" onClick={disableAdmin} style={ buttonStyle }>Disable Administrator</Button>
                        </div>
                        ) 
                        :
                        (<Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label style={ normalText }>Administrator Code</Form.Label>
                                <Form.Control type="password" ref={adminCodeRef} onChange={adminCodeCheck} isValid={(adminStatus === true) && true} isInvalid={(adminStatus === false) && true} />
                                <Form.Control.Feedback type="valid">
                                    Admin code is correct!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Admin code is incorrect
                                </Form.Control.Feedback>
                            </Form.Group>
                                <Button disabled={(adminStatus !== true || loading) && true} className="w-100" type="submit" variant="danger" style={ buttonStyle }>Update</Button>
                        </Form>)}
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
