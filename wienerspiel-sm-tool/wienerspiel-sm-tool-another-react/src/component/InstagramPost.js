import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

export default function InstagramPost() {
    const [likes, setLikes] = useState("")
    const [views, setViews] = useState("")
    const [reach, setReach] = useState("")
    const [comments, setComment] = useState("")

    useEffect(() => {
        setLikes(17)
        setViews(40)
        setReach(30)
        setComment(13)
    }, [])

    return (
        <div>
            <ListGroup>
                <ListGroup.Item >
                    <div style={{color: "#898989"}}>Views</div>
                    <h4 className="mt-2" style={{color: "#E1306C"}}>{views}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Likes</div>
                    <h4 className="mt-2" style={{color: "#E1306C"}}>{likes}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Comments</div>
                    <h4 className="mt-2" style={{color: "#E1306C"}}>{comments}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Accounts Reach</div>
                    <h4 className="mt-2" style={{color: "#E1306C"}}>{reach}</h4>
                </ListGroup.Item>

            </ListGroup>
        </div>
    )
}