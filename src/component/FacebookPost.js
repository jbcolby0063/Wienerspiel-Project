import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'

export default function FacebookPost({data}) {
    const [likes, setLikes] = useState("")
    const [views, setViews] = useState("")
    const [engagedUsers, setEngagedUsers] = useState("")
    const [reactionData, setReactionsData] = useState("")

    const reactionChart = {
        labels: ["Likes", "Love", "Wow", "Haha", "Sorry", "Anger"],
        datasets: [
          {
            label: "Reactions by Type",
            data: reactionData,
            backgroundColor: [
                "rgb(54, 162, 235)",
                "rgba(240, 1, 159, 0.67)",
                "rgba(149, 1, 240, 0.56)",
                "rgba(1, 240, 25, 0.66)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)"
            ]
          }
        ],
        hoverOffset: 4
    };

    const reactionOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    useEffect(() => {
        if (typeof data !== "undefined") {
            setLikes(data.reactionLikes)
            setViews(data.postImpressions)
            setEngagedUsers(data.engagedUsers)
            setReactionsData(data.reactionsByType)
            //setReactionsData([5 ,1, 1, 4, 2, 6])
        }
    }, [])

    return (
        <div>
           
            {/* <h1>{data.likes}</h1> */}
            <ListGroup>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Views</div>
                    <h4 className="mt-2" style={{color: "#4267B2"}}>{views}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Likes</div>
                    <h4 className="mt-2" style={{color: "#4267B2"}}>{likes}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Engaged Users</div>
                    <h4 className="mt-2" style={{color: "#4267B2"}}>{engagedUsers}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Reaction Chart</div>
                    <div className="mt-2" style={{height: "350px"}}>
                        <Doughnut data={reactionChart} options={reactionOptions} />
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
