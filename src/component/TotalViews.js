import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import Constants from '../constants'

export default function TotalViews() {
    const [horizLabels, setHorizLabels] = useState([])
    const [fbViews, setFbViews] = useState([])
    const [igViews, setIgViews] = useState([])
    
    useEffect(() => {
        fetch(`${Constants.API_ENDPOINT}/analytics`).then(res => res.json()).then(data => {
            setHorizLabels(data.fb_x_labels)
            setFbViews(data.fb_y_labels)
            setIgViews(data.ig_y_labels)
        })
    }, [])

    const totalViewsData = {
        labels: horizLabels,
        datasets: [
            {
                label: 'Facebook',
                data: fbViews,
                fill: false,
                borderColor: "#4267B2",
                tension: "0.1"
            }, 
            {            
                label: 'Instagram',
                data: igViews,
                fill: false,
                borderColor: "#E1306C",
                tension: "0.1"
            }
        ]
    }
    /*
    const totalViewsData = {
        labels: ['Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25'],
        datasets: [
          {
            label: 'Facebook',
            data: [30, 76, 80, 130, 110, 101, 79],
            fill: false,
            borderColor: "#4267B2",
            tension: "0.1"
          },
          {
            label: 'Instagram',
            data: [50, 30, 70, 100, 130, 140, 160],
            fill: false,
            borderColor: "#E1306C",
            tension: "0.1"
          },
        ],
    };
    */

    const totalViewsOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    return (
        <div style={{height: "250px"}}>
            <Line data={totalViewsData} options={totalViewsOptions} />
        </div>
    )
}


//npm install create-react-app reactcharts
//create-react-app reactcharts
//npm install react-chartjs-2
//npm i bootstrap react-bootstrap
//npm install react-router-dom

/*

class TotalViews extends Component {

    constructor(props) { // run when component is initialized
        super(props);
    
        this.state = { // to keep data (an object)
            barChartData: props.barChartData, // from main file
        }
    }
    

    render() {
        return (
            <div className="chart">
                <Bar
                  data={this.state.barChartData} // this.state is object
                  options={{
                      responsive:false
                  }}
                >
                </Bar>
            </div>
        )
    }
}
*/