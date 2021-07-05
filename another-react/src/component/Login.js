import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { heartText, memberLoginText, buttonStyle, linkStyle } from '../style'
import heart from '../heart-1.png'
import circle from '../Subtract.svg'
import logo from '../LogoSocial.svg'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth() // access directly to login function from the AuthContext.Provider value
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault() // prevents any event action

        try {
            setError('')
            setLoading(true) // make the Sign Up button disabled to prevent user from clicking it multiple times
            await login(emailRef.current.value, passwordRef.current.value) // wait until signup is finished
            history.push('/') // bring us to dashboard once login success
        } catch { // if signup fails 
            setError('Failed to sign in')
        }

        setLoading(false)
    }  

    return (
        <Container 
        className="d-flex align-items-center justify-content-center" // align-items-center: vertical center, justify-content-center: horizontal center
        style = {{ minHeight: "100vh"}}> 
        <Row className="w-100 align-items-center justify-content-center" style={{maxWidth: '900px'}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}}>  
            <Col className="mb-4">
                <div className="w-100 center text-center" style={{ maxWidth: "400px"}}>
                <img src={heart} alt="heart" style={{width: "300px", height: "300px"}}/>
                </div>
                <div className="w-100 center text-center" style={ heartText }>
                    We love all of our pets!
                </div>
            </Col>
            </div>
            
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}}>  
            <Col className="mt-2">
                <Card className="shadow">
                    <div className="d-flex align-items-center justify-content-center mt-3" style={{margin: "auto", paddingLeft: "20px", paddingRight: "20px", overflow: "hidden"}}>
                        <img src={logo} alt="logo" style={{width: "125%"}} />  
                    </div>
                    <Card.Body className="mt-3">
                        <h2 className="text-center mb-4" style={ memberLoginText }>
                            Member Login
                        </h2>
                        {error && <Alert variant="danger">{error}</Alert>} 
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email" className="mb-4">
                                <Form.Control type="email" ref={emailRef} placeholder="Email/Username" required/>
                            </Form.Group>
                            <Form.Group id="password" className="mb-5">
                                <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mb-3" type="submit" variant="danger" style={ buttonStyle }>
                                Log In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password" style={ linkStyle }>
                                Forgot Password?
                            </Link>
                        </div>
                    </Card.Body>
                </Card>   
                <div className="w-100 text-center mt-3" style={ linkStyle }>
                    New? <Link to="/signup" style={{color: "#BB0101"}}> Sign Up</Link>
                </div>
            </Col>
            </div>
            <img src={circle} alt ="Quarter Circle" style={{position: "absolute", top: 0, right: 0, zIndex: -1}} />
         </Row>
    </Container>
    )
}
