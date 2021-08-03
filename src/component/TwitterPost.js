import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

export default function TwitterPost({data}) {
    const [likes, setLikes] = useState("")
    const [views, setViews] = useState("")
    const [retweet, setRetweet] = useState("")
    const [reply, setReply] = useState("")
    const [hashtags, setHashtags] = useState("")

    useEffect(() => {
        setViews(data.twitterViews)
        setLikes(data.twitterLikeCount)
        setRetweet(data.retweetCount)
        setReply(data.replyCount)
        setHashtags(data.hashtags)
        }
    , [])

    return (
        <div>
            <ListGroup>
                <ListGroup.Item >
                    <div style={{color: "#898989"}}>Views</div>
                    <h4 className="mt-2" style={{color: "#1DA1F2"}}>{views}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Retweets</div>
                    <h4 className="mt-2" style={{color: "#1DA1F2"}}>{retweet}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Likes</div>
                    <h4 className="mt-2" style={{color: "#1DA1F2"}}>{likes}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Reply</div>
                    <h4 className="mt-2" style={{color: "#1DA1F2"}}>{reply}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Used Hashtags</div>
                    <div className="mt-2">
                        {hashtags ? hashtags.map((ht) => <h5 style={{color: "#1DA1F2"}}>{ht}</h5>) : <h3 style={{color: "#1DA1F2"}}>No Hashtags</h3>}
                    </div>
                </ListGroup.Item>        
            </ListGroup>
        </div>
    )
}