import React, { useState, useEffect } from 'react'
import { ListGroup } from'react-bootstrap'
import { Bar, Pie, Line } from 'react-chartjs-2'

export default function InstagramOverall() {
    const [reachData, setReachData] = useState("")
    const [genderData, setGenderData] = useState("")
    const [ageData, setAgeData] = useState("")

    const reachChart = {
        labels: ['Jun 14', 'Jun 21', 'Jun 28', 'Jul 5', 'Jul 12'],
        datasets: [
            {
                label: 'Accounts Reached (Weekly)',
                data: reachData,
                backgroundColor: "rgba(138, 58, 185, 0.3)",
                borderColor: "rgba(138, 58, 185, 1)",
                borderWidth: "1"
            }
        ]
    }

    const followerChart = {
        labels: ['Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25'],
        datasets: [
          {
            label: 'Followers',
            data: [10, 14, 20, 21, 29, 29, 29],
            fill: true,
            borderColor: "rgba(138, 58, 185, 0.8)",
            backgroundColor: "rgba(138, 58, 185, 0.3)",
            tension: "0.1"
          }
        ]
    };

    const genderChart = {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender",
            data: genderData,
            backgroundColor: [
                "rgba(138, 58, 185, 0.3)",
                "rgba(138, 58, 185, 1)"
            ]
          }
        ],
        hoverOffset: 4
    };

    const ageChart = {
        labels: ["Under 18", "18-25", "25-34", "35-44", "45-54","55-64","65 and above"],
        datasets: [
          {
            label: "Age",
            data: ageData,
            backgroundColor: "rgba(138, 58, 185, 0.3)",
            borderColor: "rgba(138, 58, 185, 1)",
            borderWidth: "1"
          }
        ],
    };

    const graphOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    const percentageCompare = (reachData[4] - reachData[3]) / reachData[3] * 100

    useEffect(() => {
        setReachData([10, 13, 15, 20, 12])
        setGenderData([25, 15])
        setAgeData([4, 10, 15, 16, 10, 7, 4])
    }, [])
    
    return (
        <div className="overflow-auto" style={{maxHeight: "350px"}}>
            <ListGroup variant="flush">
                <ListGroup.Item style={{paddingLeft: "0px"}}>
                    <div style={{color: "#898989"}}>Weekly Reach</div>
                    <div style={{height: "200px"}}>
                        <Bar className="mt-2" data={reachChart} options={graphOptions} />
                    </div>
                    <div className="mt-2 mb-2" style={{textAlign: "center", color: "rgba(138, 58, 185, 0.8)"}}>{percentageCompare < 0 ? "" : "+"}{percentageCompare}% vs last week</div>
                </ListGroup.Item>
                <ListGroup.Item style={{paddingLeft: "0px"}}>
                    <div style={{color: "#898989"}}>Followers Count</div>
                    <div style={{height: "200px"}}>
                        <Line className="mt-2" data={followerChart} options={graphOptions} />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Gender</div>
                    <div className="mt-2" style={{height: "200px"}}>
                        <Pie data={genderChart} options={graphOptions} />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div style={{color: "#898989"}}>Age</div>
                    <div className="mt-2" style={{height: "200px"}}>
                        <Bar data={ageChart} options={graphOptions} />
                    </div>
                </ListGroup.Item>
              
            </ListGroup>
        </div>
    )
}
