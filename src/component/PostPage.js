import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert, Container, Row, Col, Spinner } from 'react-bootstrap'
import { postButtonStyle, uploadImageButton, imageCloseButton } from '../style'
import { useAuth } from '../context/AuthContext'
import {db, storage} from '../firebase'
import { useHistory } from "react-router-dom"
import "../App.css"
import {ReactComponent as FacebookLogo} from '../facebookLogo.svg'
import {ReactComponent as InstaLogo} from '../instagramLogo.svg'
import {ReactComponent as TwitterLogo} from '../twitterLogo.svg'
import {ReactComponent as AddPhotoLogo} from '../addPhotoLogo.svg'
import closeLogo from '../closeLogo.svg'
import photoIcon from '../photoLibrary.svg'

export default function PostPage() {
    const imageRef = useRef()
    const titleRef = useRef()
    const textRef = useRef()
    const instagramRef = useRef()
    const timeID = Date.now()
    const [uploadLoading, setUploadLoading] = useState(false)
    const [fileType, setFileType] = useState("")
    const [uploadFile, setUploadFile] = useState([])
    const [previewFile, setPreviewFile] = useState([])
    const [base64File, setBase64File] = useState([])
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [instagramError, setInstagramError] = useState(false)
    const [checkCount, setCheckCount] = useState(0)
    const [socialList, setSocialList] = useState([])
    const { sidebarVisible, currentUser } = useAuth()
    const history = useHistory()


    function setAlert() {
        setError(false)
        setImageError(false)
        setInstagramError(false)
        setSucess(false)
    }

    function handleFile(e) { // convert image/video files into image url
        setAlert()
        if (e.target.files[0]) {
            if(e.target.files[0].type.split("/")[0] !== fileType){
                var currentFiles = [e.target.files[0]]
            } else {
                var currentFiles = [...uploadFile, e.target.files[0]]
            }
            
            const currentPreviewFiles = []
            
            setUploadFile(currentFiles)
            setFileType(e.target.files[0].type.split("/")[0])

            for (let i = 0; i < currentFiles.length; i++) {
                currentPreviewFiles.push(URL.createObjectURL(currentFiles[i])) // preview files path
            }
            setPreviewFile(currentPreviewFiles)

        }
        
    }

    function cancelImage() { // remove image/video
        setAlert()
        setUploadFile([])
        setPreviewFile([])
        setBase64File([])
        setFileType("")
        document.getElementById("upload-image").value = ""
    }

    function isChecked(e) { 
        setAlert()
        if (e.target.checked) { // if current social media is chosen, push it into the list and add 1 to checkCount
            setCheckCount(checkCount + 1)
            setSocialList(arr => [...arr, e.target.id])
        } else { // if current social media is unchosen, remove it from the list and minus 1 to checkCount 
            setCheckCount(checkCount - 1)
            setSocialList(socialList.filter(item => item !== e.target.id))
        }
    }

    function handleStorage() { // firebase image/video storage 
        const uploadTimeID = titleRef.current.value + "_" + timeID
        const storageRef = storage.ref("users/" + uploadTimeID)
        return storageRef
    }

    function handleDB() { // firebase database
        const postRef = db.ref("users") // data store path
        const fileNameList = []
        for (let i = 0; i < uploadFile.length; i++) {
            fileNameList.push(uploadFile[i].name)
        }
        const postData = { // data to store in firebase
            user: currentUser.email,
            title: titleRef.current.value,
            text: textRef.current.value,
            fileName: fileNameList,
            filePath: base64File,
            fileType: fileType,
            time: new Date().toLocaleString('en-US'),
            uploadTimeID: titleRef.current.value + "_" + timeID,
            socialMedia: socialList,
            viewers : 0
        }
        return postRef.push(postData) // push the data to userID folder in firebase realtime database 
    }

    function checkBeforeSubmit() {
        return new Promise((resolve, reject) => {
            if(uploadFile.length === 0) { // if an image is not uploaded yet
                reject("imageError")
            } else if (instagramRef.current.checked && uploadFile.length > 1) { // limit to 1 image for instagram
                reject("instagramErrorImage")
            } else if(instagramRef.current.checked && fileType === "video") {
                reject("instagramErrorVideo")
            } else if(instagramRef.current.checked && uploadFile.length == 1 && fileType === "image"){ // instagram image dimension check 
                var image = new Image()
                image.src = previewFile[0]
                if(image.width < 0.8 * image.height || image.width > 1.91 * image.height){
                    reject("instagramErrorDimension")
                }else{
                    resolve("resolve")
                }
            }else {
                resolve("resolve")
            }
        })
    }

    async function post_fetch() {
        fetch('/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: 1
            })
        }).then(res => {
            return res.json()
        }).then(data => {})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setUploadLoading(true)
            setAlert()

            await checkBeforeSubmit()
            for(const file of uploadFile) {
                await handleStorage().child(file.name).put(file)
            }
            await handleDB()
            await post_fetch()
            setSucess("Successfully uploaded the post")
        } catch(rej) {
            if (rej === "imageError") {
                setImageError("Upload Image/Video") 
            } else if (rej === "instagramErrorImage") {
                setInstagramError("Please upload 1 image for Instagram")
            } else if (rej === "instagramErrorVideo") {
                setInstagramError("Only an image is allowed to post for Instagram")
            } else if (rej == "instagramErrorDimension") {
                setInstagramError("Please upload an image that falls within a 4:5 to 1.91:1 range")
            } else {
                setError("Failed to Upload")
            }
        }

        setUploadLoading(false)
    }


    return (
        <Container id={sidebarVisible && "content"} className="d-flex align-items-center justify-content-center mt-3 mb-3" style = {{flex: "1"}}>
            <div className="w-100 ml-auto mr-auto" style={{maxWidth: '500px'}} > 
            {error && <Alert variant="danger">{error}</Alert>}
            {imageError && <Alert variant="danger">{imageError}</Alert>}
            {instagramError && 
                <Alert className="w-100" variant="danger">
                    <Alert.Heading>Instagram Post Limit</Alert.Heading>
                    <hr />
                    <p>{instagramError}</p>
                </Alert>}
            {sucess && <Alert variant="success">{sucess}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center justify-content-center">
                    <Form.Group id="title">
                        <Form.Control className="mb-1" type="text" ref={titleRef} required placeholder="Title for the post" onChange={() => {setAlert()}} style={{width: "300px", height:"40px"}}/>
                    </Form.Group>
                    </div>
                
                    <Card style={{maxHeight: "600px"}}>
                        <Card.Body className="d-flex flex-column overflow-auto" style={{flex: "1"}}>
                            <div>
                                {uploadFile.length === 0 && 
                                    (<label type="button" htmlFor="upload-image" required className="d-flex flex-column align-items-center justify-content-center" style={uploadImageButton}>
                                    <span >
                                        <img src={photoIcon} alt="photoIcon" />
                                    </span> 
                                        <h5 className="text-center mt-2" style={{color: "#BB0101"}}>Upload your photo/video</h5>
                                    </label>)}
                                {(uploadFile.length > 0 && fileType === "image") &&
                                    (<div className="overflow-auto" style={{position: "relative", width: "100%"}}>
                                        <button onClick={cancelImage} className="closeButton d-flex flex-column align-items-center justify-content-center" style={imageCloseButton}>
                                            <img src={closeLogo} alt="closeLogo" /> 
                                        </button>
                                        {previewFile.map((image) => <Card.Img className="mt-1" src={image} style={{width: "100%", height: "auto"}} />)}
                                    </div>)
                                    }
                                {(uploadFile.length > 0 && fileType === "image") && 
                                    <Button className="mt-2 w-100 d-flex align-items-center justify-content-center" variant="outline-danger" style={{padding: "0px"}}>
                                        <label className="addPhotoButton p-2 d-flex align-items-center justify-content-center w-100 h-100" type="button" htmlFor="upload-image" style={{marginBottom: "0px"}}>
                                            <AddPhotoLogo className="addPhotoLogo" style={{width: "25px", height: "25px", marginRight: "4px", fill: "#BB0101", float: "left", position: "relative", bottom: "1px"}} />
                                            <div className="addPhotoText" style={{fontSize: "16px", color: "#BB0101", fontFamily: "Roboto", fontWeight: "bold", float: "left", position: "relative", top: "2px"}}>Add Photo</div>
                                        </label>
                                    </Button>}
                                {(uploadFile.length > 0 && fileType === "video") &&
                                    (<div className="overflow-auto" style={{position: "relative", width: "100%"}}>
                                    <button onClick={cancelImage} className="closeButton d-flex flex-column align-items-center justify-content-center" style={imageCloseButton}>
                                        <img src={closeLogo} alt="closeLogo" /> 
                                    </button>
                                    <video className="w-100" height="270px" controls style={{borderRadius: "5px"}}>
                                        {previewFile.map((video) => <source src={video} />)}
                                    </video>
                                    </div>)}
                            </div>
                            
                

                            <Form.Group id="textpost">
                                <Form.Control className="border border-white overflow-auto mt-3" ref={textRef} as="textarea" required rows={10} onChange={() => {setAlert()}} placeholder="Write a caption..." style={{minHeight: "200px", maxHeight: "200px"}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="upload-image" ref={imageRef} accept="image/*, video/*" onChange={handleFile} style={{display: "none"}} />
                            </Form.Group>
                            <div className="d-flex justify-content-center mt-auto" required>
                            <Row>
                                <Col >
                                    <input id="facebookCheck" type="checkbox" class="form-check-input position-static" onChange={isChecked} required={checkCount > 0 ? false : true}/>
                                    <FacebookLogo style={{marginLeft: "10px", marginBottom: "5px"}} />
                                </Col>
                                <Col style={{margin: "0px 20px"}}>
                                    <input id="instagramCheck" type="checkbox" class="form-check-input position-static" ref={instagramRef} onChange={isChecked} required={checkCount > 0 ? false : true} />
                                    <InstaLogo style={{marginLeft: "10px", marginBottom: "5px"}}  />
                                </Col>
                                <Col>
                                    <input id="twitterCheck" type="checkbox" class="form-check-input position-static" onChange={isChecked} required={checkCount > 0 ? false : true} />
                                    <TwitterLogo style={{marginLeft: "10px", marginBottom: "5px"}} />
                                </Col>
                            </Row>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="d-flex align-items-center justify-content-center">
                        {uploadLoading ? 
                            (<Button className="mt-4 d-flex align-items-center justify-content-center" type="submit" variant="danger" disabled style={postButtonStyle}>
                                <Spinner animation="border" variant="light" />
                            </Button>) :
                            (<Button className="mt-4" type="submit" variant="danger" style={postButtonStyle}>Post</Button>)}
                    </div>
                </Form>
            </div>
        </Container>
    )
}
