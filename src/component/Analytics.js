import React, { useState, useEffect }from 'react'
import { Card } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'
import { useAuth } from '../context/AuthContext'
import { postList, analyticsIcons } from '../style'
import PostList from "./PostList"
import PostDetail from './PostDetail'
import { db } from '../firebase'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import {ReactComponent as FacebookLogo} from '../facebookLogo.svg'
import {ReactComponent as InstaLogo} from '../instagramLogo.svg'
import {ReactComponent as RecentPostLogo} from '../recentPostLogo.svg'
import {ReactComponent as TotalViewsLogo} from '../totalViewsLogo.svg'
import "../App.css"
import FacebookOverall from './FacebookOverall'
import InstagramOverall from './InstagramOverall'

//Border Red: #BB0101
//Background Red: rgba(187, 1, 1, 0.3)

//Facebook Blue - #3B5998



export default function Analytics() {
    const { currentUser, sidebarVisible, postDetailVisible, setPostDetailVisible } = useAuth() // access directly to the values from the AuthContext.Provider 
    const [dataList, setDataList] = useState()
    let data_string = "TITLE".padEnd(15) + "DATE".padEnd(15) + "SOCIAL MEDIA".padEnd(17) + "VIEWERS"
    useEffect(() => {
        const userID = currentUser.email.split("@")[0]
        const postList = db.ref("users/" + userID)
        postList.on('value', (snapshot) => {
            const data = snapshot.val()
            const getData = []
            for (let id in data) {
                getData.push(data[id])
            }
            setDataList(getData)
        })
    }, [])
    
    const totalViewsData = {
        labels: ['Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25'],
        datasets: [
          {
            label: 'Total Views',
            data: [30, 76, 80, 130, 110, 101, 79],
            fill: true,
            backgroundColor: "rgba(187, 1, 1, 0.3)",
            borderColor: '#BB0101',
            tension: "0.1"
          }, 
        ],
    };

    const totalViewsOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    return (
    <>
    {postDetailVisible && <PostDetail data={postDetailVisible} />}
    
    <div id={postDetailVisible && "analyticsBg"} className="d-flex flex-column" style={{height: "100vh"}}>
        <div ><Topbar /></div>
        <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
        <Sidebar current="analyticspage" />
        <div id={sidebarVisible && "content"} className="content d-flex w-100 p-5 overflow-auto" style={{flex: "1"}}>
            <div className="d-flex flex-row flex-wrap" style={{margin: "auto"}}>
                <div className="d-flex flex-column mr-4" style={{width: "780px"}}>
                    <Card className="shadow mt-3" style={{width: "780px", height: "350px"}}>
                        <Card.Body>
                            <Card.Title><TotalViewsLogo style={analyticsIcons} /><h3 style={{color: "#BB0101"}}>Total Viewers</h3></Card.Title>
                            <Card.Subtitle className="mb-2" style={{color:"#878787"}}>Last 7 Days</Card.Subtitle>
                            <Card.Text><div style={{height: "250px"}}><Line data={totalViewsData} options={totalViewsOptions} /></div></Card.Text>
                        </Card.Body>
                    </Card>
                    <div className="d-flex flex-row">
                        <Card className="shadow mt-3" style={{width: "385px", height: "650px", marginRight: "10px"}}>
                            <Card.Body>
                                <Card.Title><FacebookLogo style={analyticsIcons} /><h3 style={{color: "#BB0101"}}>Facebook</h3></Card.Title>
                                <Card.Text><FacebookOverall /></Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="shadow mt-3" style={{width: "385px", height: "650px"}}>
                            <Card.Body>
                                <Card.Title><InstaLogo style={{width: "25px", height: "25px", marginTop:"5px", marginRight: "9px", float: "left", fill: "#BB0101"}} /><h3 style={{color: "#BB0101"}}>Instagram</h3></Card.Title>
                                <Card.Text>
                                    <InstagramOverall />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div>
                    <Card className="shadow overflow-auto mt-3" style={{width: "520px", height:"816px"}}>
                        <Card.Body>
                            <Card.Title><RecentPostLogo style={analyticsIcons} /><h3 style={{color: "#BB0101"}}>Recent Posts</h3></Card.Title>
                            <Card.Text>
                                <div className="mt-3">
                                    <div style={{paddingTop: "10px", paddingLeft: "20px"}}><pre style={{color: "#C93030"}}>{data_string}</pre></div>
                                
                                    {dataList ? dataList.map((data) => 
                                    <button type="button" className="postListButton overflow-auto" onClick={() => {setPostDetailVisible(data)}} style={postList}>
                                        <PostList data={data} />
                                    </button>) : ""}
                                </div>
                                
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    )
}
