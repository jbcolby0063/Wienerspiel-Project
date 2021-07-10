import React, { useRef, useState, useEffect }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
// import { adminAuth } from '../firebaseAdmin'
import { Link, useHistory } from 'react-router-dom'
import { buttonStyle, linkStyle, memberLoginText, postList } from '../style'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

// useEffect(() => {
//     const usersData = []

    
//     adminAuth.listUsers().then((userRecords) => {
//         userRecords.users.forEach((user) => {
//             console.log(user.toJSON());
//         });
//     }).catch((err) => {
//         setError(err);
//     });
// }, [])



export default function AccountList() {
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, currentAdmin, sidebarVisible} = useAuth() // access directly to signup function from the AuthContext.Provider value
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [accountList, setAccountList] = useState([])
    const history = useHistory()






    return (
        <div className="d-flex flex-column" style={{height: "100vh"}}>
        <div ><Topbar current="accountListPage"  /></div>
        <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
        <Sidebar />
        <div id={sidebarVisible && "content"} className="d-flex align-items-center justify-content-center " style = {{flex: "1"}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}} >
                <Card className="shadow">
                    <Card.Header><h2 className="text-center mt-2" style={memberLoginText}>Account List</h2></Card.Header>
                    <Card.Body className="overflow-auto" style={{height: "600px"}}>
                        <Card.Text>
                            <div className="mt-3">
                            
                                {accountList ? accountList.map((account) => 
                                <button type="button" className="postListButton overflow-auto" onClick={() => {}} style={postList}>
                                    {account.email}
                                </button>) : ""}
                            </div>
                            
                        </Card.Text>
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
