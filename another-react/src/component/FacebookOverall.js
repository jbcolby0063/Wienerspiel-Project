import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import {Bar, Pie} from 'react-chartjs-2'

export default function FacebookOverall() {
    const [engagemnet, setEngagement] = useState("")
    const [genderData, setGenderData] = useState("")
    const [ageData, setAgeData] = useState("")

    const genderChart = {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender",
            data: genderData,
            backgroundColor: [
                "rgba(66, 103, 178, 0.3)",
                "rgba(66, 103, 178, 1)"
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
            backgroundColor: "rgba(66, 103, 178, 0.3)",
            borderColor: "rgba(66, 103, 178, 1)",
            borderWidth: "1"
          }
        ],
    };

    const graphOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    useEffect(() => {
        setEngagement(15)
        setGenderData([40, 60])
        setAgeData([14, 30, 50, 16, 15, 8, 4])
    }, [])

    return (
        <div className="overflow-auto" style={{maxHeight: "350px"}}>
            <ListGroup variant="flush">
                <ListGroup.Item style={{paddingLeft: "0px"}}>
                    <div style={{color: "#898989"}}>Weekly Engagement</div>
                    <h4 className="mt-2" style={{color: "#4267B2"}}>{engagemnet}</h4>
                </ListGroup.Item>
                <ListGroup.Item style={{paddingLeft: "0px"}}>
                    <div style={{color: "#898989"}}>Gender</div>
                    <div className="mt-2" style={{height: "200px"}}>
                        <Pie data={genderChart} options={graphOptions} />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item style={{paddingLeft: "0px"}}>
                    <div style={{color: "#898989"}}>Age</div>
                    <div className="mt-2" style={{height: "200px"}}>
                        <Bar data={ageChart} options={graphOptions} />
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}


// import React, { Component, useState, useEffect } from 'react'
// import {Bar, Line, Pie} from 'react-chartjs-2';
// import {Card} from 'react-bootstrap'

// function FacebookOverall() {
//     //const [overallViews,setOverallViews] = useState({})
//     const [gender, setGender] = useState({})
//     const [ageImpressions, setAgeImpressions] = useState({})
//     const [engagement, setEngagement] = useState(15)

//     const data = () => {
//         /*
//         setOverallViews({
//             labels: ["1/6/2021","8/6/2021","15/6/2021","22/6/2021","29/6/2021","6/7/2021","13/7/2021"],
//             datasets:[
//                 {
//                     label: 'Facebook Views Per Week',
//                     data: [10,20,30,25,35,50,55],
//                     fill: false,
//                     lineTension: 0.1,
//                     backgroundColor: "rgba(187, 1, 1, 0.3)",
//                     borderColor: "red", // The main line color
//                     borderDashOffset: 0.0,
//                     pointBackgroundColor: "white",
//                     pointHoverBorderWidth: 2,
//                     pointRadius: 4,
//                     pointHitRadius: 10,   
//                 }
//             ]
//         })
//         */

//         setGender({
//             labels: ["Men","Women"],
//             datasets:[
//                 {
//                 data: [40,60],
//                 backgroundColor: [
//                     "#3b5998","rgba(187, 1, 1, 0.5)"],
//                 borderColor: "white",
//                 },

//             ]
//         })

//         setAgeImpressions({
//             labels: ["Under 18", "18 to 25", "25 to 34", "35 to 44", "45 to 54","55 to 64","65 and above"],
//             datasets:[
//                 {
//                     label: "Views by Age",
//                     data: [14,30,50,16,15,8,4],
//                     backgroundColor: "#3b5998",
                   
//                 }
//             ]
//         })
//     }
    

//     useEffect(() => {
//         data()
//     }, [])

//     return(
//         <div className="facebook">
//             <h3 style={{textAlign: 'center', color:'grey', textDecoration:'underline'}}> Weekly Engagement: {engagement}</h3> <br></br>
//             {/* <Line
//                 data={overallViews} // this.state is object
//                 options={{
//                     responsive:false
//                 }}
//             >
//             </Line> */}
//             <Pie
//                 data={gender}
//                 options={{
//                     responsive:false,
//                     plugins: {
//                         title: {
//                             display:true,
//                             text: "Views by Gender"
//                         }
//                     }
//                 }}
//             >
//             </Pie>    
//             <br></br>
//             <Bar
//                 data={ageImpressions}
//                 options={{
//                     responsive:false,
//                     scales: {
//                         y: {
//                             min: 0,
//                             max: 50
//                         }
//                     }
//                 }}
//             ></Bar>                       
//         </div>
//     )
// }

// export default FacebookOverall
