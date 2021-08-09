import React, { useRef, useState, useEffect }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { storage } from '../firebase'
import {buttonStyle, linkStyle, memberLoginText } from '../style'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import account from "../account.svg"
import account_nonadmin from "../account_nonadmin.svg"

export default function UpdateProfilePic() {
    const imageRef = useRef()
    const [filePic, setFilePic] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [previewFilePic, setPreviewFilePic] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [sucess, setSucess] = useState("")
    const { sidebarVisible, currentUser, currentAdmin, currentProfilePic, setCurrentProfilePic } = useAuth() // access directly to signup function from the AuthContext.Provider value
    const history = useHistory()

    function handleFile(e) { // convert image files into image url
        if (e.target.files[0]) {
            setError("")
            setSucess("")
            setDeleteStatus(false)
            setFilePic(e.target.files[0])
            setPreviewFilePic(URL.createObjectURL(e.target.files[0]))
        }
        
    }

    function deleteProfilePic() {
        setError("")
        setSucess("")
        setDeleteStatus(true)
        setFilePic(null)
        document.getElementById("upload-image").value = ""
        if (currentAdmin === "admin") {
            setPreviewFilePic(account)
        } else {
            setPreviewFilePic(account_nonadmin)
        }
    }

    async function handleStorage() { // firebase image storage 
        const storageRef = storage.ref("profile_pic/" + currentUser.email).put(filePic)
        setCurrentProfilePic(previewFilePic)
        storageRef.on(
            "state_changed",
            snapshot => {},
            error => {
                setError(error)
            },
            () => {
                storage.ref("profile_pic/" + currentUser.email).getDownloadURL().then(url => { // get image url 
                    currentUser.updateProfile({
                        photoURL: url
                    })
                })
            }
        )
        
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            setSucess("")

            if (deleteStatus) { // if user clicked "delete picture"
                const storageRef = storage.ref("profile_pic/" + currentUser.email)

                storageRef.delete().then(() => {
                    setCurrentProfilePic(null)
                    currentUser.updateProfile({
                        photoURL: null
                    })
                })
                
                
            } else { // if not
                await handleStorage()
            }
        } catch(err) {
            setError("Failed to update profile picture")
        } finally {
            setSucess("Successfully updated profile picture")
        }

        setLoading(false)
        setDeleteStatus(false)
        setFilePic(false)
    }


    useEffect(() => {
        if (currentProfilePic === null && currentAdmin === "admin") {
            setPreviewFilePic(account)
        } else if (currentProfilePic === null && currentAdmin !== "admin") {
            setPreviewFilePic(account_nonadmin)
        } else if (currentProfilePic !== null) {
            setPreviewFilePic(currentProfilePic)
        }
    }, [])

    return (
        <div className="d-flex flex-column" style={{height: "100vh"}}>
        <div ><Topbar current="updateProfilePic"  /></div>
        <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
        <Sidebar />
        <div id={sidebarVisible && "content"} className="d-flex align-items-center justify-content-center " style = {{flex: "1"}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '400px'}} >
                <Card className="shadow">
                    <Card.Body>
                        <h2 className="text-center mb-4" style={memberLoginText}>Update Profile Picture</h2>
                        {error && <Alert variant="danger">{error}</Alert>} 
                        {sucess && <Alert variant="success">{sucess}</Alert>} 
                
                        <img src={previewFilePic} alt="account icon" style={{width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%", display: "block", marginLeft: "auto", marginRight: "auto"}} />
                        <Form onSubmit={filePic !== false && handleSubmit}>
                            <Form.File id="upload-image" ref={imageRef} accept="image/*" onChange={handleFile} style={{display: "none"}} />
                            <Button className="w-100 mt-3 mb-1" variant="outline-primary" style={{padding: "0px"}}>
                                <label className="updateProfilePicButton p-2 w-100 h-100" type="button" htmlFor="upload-image" style={{marginBottom: "0px"}}>
                                    <div className="addPhotoText">Choose different picture</div>
                                </label>
                            </Button>
                            <Button className="w-100 mt-1 mb-3" variant="outline-secondary" onClick={deleteProfilePic}>
                                Delete Profile Picture
                            </Button>
                            
                            
                            <Button className="w-100" disabled={loading} type="submit" variant="danger" style={ buttonStyle }>Update</Button>
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
