import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth() // access directly to signup function from the AuthContext.Provider value
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault() // prevents any event action

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match') // reason for return is to exit out of function immediately
        }

        try {
            setError('')
            setLoading(true) // make the Sign Up button disabled to prevent user from clicking it multiple times
            await signup(emailRef.current.value, passwordRef.current.value) // wait until signup is finished
            history.push('/') // bring us to dashboard once sign up success
        } catch { // if signup fails 
            setError('Failed to create an account')
        }

        setLoading(false)
    }
    
    return (
    <>
         <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>} 
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
         </Card>   
         <div className="w-100 text-center mt-2">
             Already have an account? <Link to="/login">Log In</Link>
         </div>
    </>
    )
}
