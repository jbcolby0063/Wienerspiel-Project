import React, { useState, useEffect } from 'react'
import { Card, Alert, Tab, Tabs, Spinner, Modal, Button, Carousel } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { db, storage } from '../firebase'
import "../App.css"
import FacebookPost from './FacebookPost'
import InstagramPost from './InstagramPost'
import TwitterPost from './TwitterPost'
import {ReactComponent as PostDetailLogo} from '../postDetailLogo.svg'
import {ReactComponent as DeleteLogo} from '../deleteLogo.svg'


export default function PostDetail({data, show, onHide}) {
    const idL = data.id
    const userL = data.user
    const titleL = data.title
    const textL = data.text
    const timeL = data.time
    const uploadTimeIDL = data.uploadTimeID
    const fileTypeL = data.fileType
    const viewerL = data.viewers
    const socialL = data.socialMedia
    const fileNameL = data.fileName
    const filePathL = data.filePath
    const [fileL, setFileL] = useState([])
    const [fileError, setFileError] = useState(false)
    const [fileLoading, setFileLoading] = useState(true)
    const [deleteShow, setDeleteShow] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    const { setPostDetailVisible, currentUser, currentAdmin } = useAuth()

    function cancelImage() {
        setPostDetailVisible(false)
    }

    async function deletePost() { // delete post data from firebase
        const dbRef = db.ref("users").child(idL)
        const storageRef = storage.ref("users/" + uploadTimeIDL)

        try {
            setDeleteError(false)
            await dbRef.remove()
            await storageRef.listAll().then(function(res){
                res.items.forEach(function(itemRef){
                    itemRef.delete()
                })
            })
        } catch(err) {
            setDeleteError(err)
        } finally {
            onHide()
        }
        
    }



    async function getImage() { // firebase image retrieve 
        const storageRef = storage.ref("users/" + uploadTimeIDL)
        const imageURLList = []
        try {
            for(const file of fileNameL) { // async getDownloadURL for each image
                await storageRef.child(file).getDownloadURL().then(function(url) {
                    imageURLList.push(url)
                })
            }
            setFileL(imageURLList)
        } catch(err) {
            setFileError(err)
        }
        setFileLoading(false)
    }


    useEffect(() => {
        setFileError(false)
        setFileLoading(true)
        getImage()
        
    }, [])

    return (
        <div>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <PostDetailLogo style={{width: "37px", height: "37px", marginRight: "6px", float: "left", fill: "#BB0101", position: "relative", bottom: "2px"}} />
                    <Modal.Title><h3 style={{color: "#BB0101", marginBottom: "0px"}}>Post Detail</h3></Modal.Title>
                </Modal.Header>

                <Modal.Body className="overflow-auto" style={{maxHeight: "700px"}}>
                    <div>
                        <Card className="postDetailImage d-felx align-items-center justify-content-center">
                            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
                            {deleteShow && 
                                <Alert className="w-100" variant="danger">
                                    <Alert.Heading>Delete Post</Alert.Heading>
                                    <p>Are you sure you want to delete this post?</p>
                                    <hr />
                                    <div className="d-flex justify-content-end">
                                        <div className="mr-2">
                                            <Button variant="outline-danger" onClick={deletePost}>Delete</Button>
                                        </div>
                                        <div>
                                            <Button variant="outline-secondary" onClick={() => setDeleteShow(false)}>Cancel</Button>
                                        </div>
                                    </div>
                                </Alert>}
                            {fileError && <Alert variant="danger">{fileError}</Alert>}
                            <Card.Body className="w-100" style={{paddingTop: "0px", paddingLeft: "10px", paddingBottom: "10px", paddingRight: "10px"}}>
                                <Card.Title>
                                    <h3>{titleL}</h3>
                                </Card.Title>
                                <Card.Subtitle>
                                    <div style={{color: "#898989"}}>{userL} posted at {timeL}</div>
                                </Card.Subtitle>
                                <div className="mt-3 mb-2">
                                {fileLoading && 
                                    <div className="w-100 d-flex align-items-center justify-content-center">
                                        <Spinner animation="border" variant="danger" />
                                    </div>}
                                {(!fileLoading && fileTypeL === "image" && fileL.length === 1) &&      
                                    fileL.map((image) => <Card.Img src={image} style={{width: "100%", height: "auto"}} />)}
                                {(!fileLoading && fileTypeL === "image" && fileL.length > 1) &&      
                                    <Carousel>
                                        {fileL.map((image) => 
                                            <Carousel.Item>
                                                <div className="w-100 overflow-hidden d-flex align-items-center justify-content-center" style={{height: "300px", backgroundColor: "lightgray", borderRadius: "5px", textAlign: "center"}}>
                                                    <img src={image} style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} />
                                                </div>
                                            </Carousel.Item>)}
                                    </Carousel>}
                                {(!fileLoading && fileTypeL === "video") &&
                                    <video className="w-100" height="300px" controls style={{borderRadius: "5px"}}>
                                        {fileL.map((video) => <source src={video} />)}
                                    </video>}
                                </div>
                                <Card.Text>
                                    <div style={{color: "#898989"}}>{textL}</div>
                                    <div className="mt-4 mb-4">
                                    <Tabs className="m-1">
                                        {socialL.includes("facebookCheck") && 
                                        <Tab eventKey="facebook" title="Facebook" className="overflow-auto ml-1 mr-1" style={{height: "400px"}}>
                                            <FacebookPost />
                                        </Tab>}

                                        {socialL.includes("instagramCheck") && 
                                        <Tab eventKey="instagram" title="Instagram" className="overflow-auto ml-1 mr-1" style={{height: "400px"}}>
                                            <InstagramPost />
                                        </Tab>}

                                        {socialL.includes("twitterCheck") && 
                                        <Tab eventKey="twitter" title="Twitter" className="overflow-auto ml-1 mr-1" style={{height: "400px"}}>
                                            <TwitterPost />
                                        </Tab>}
                                    </Tabs>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Modal.Body>    

                <Modal.Footer>
                    <Button variant="danger" style={{backgroundColor: "#BB0101", fontFamily: "Roboto", fontWeight: "bold", width: "150px", height:"40px"}} onClick={() => {setDeleteShow(true)}} >
                        <div className="d-flex align-items-center justify-content-center">
                            <div><DeleteLogo style={{width: "23px", height: "23px", marginRight: "3px", fill: "white", float: "left"}} /></div>
                            <div style={{fontSize: "16px", float: "left", position: "relative", top: "2px"}}>Delete</div>
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
