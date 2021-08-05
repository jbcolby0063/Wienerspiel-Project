import React, { useState, useEffect }from 'react'
import { Card } from 'react-bootstrap'
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
import TotalViews from './TotalViews'
import FacebookOverall from './FacebookOverall'
import InstagramOverall from './InstagramOverall'

// Border Red: #BB0101
// Background Red: rgba(187, 1, 1, 0.3)

// Facebook Blue - #4267B2
// Instagram Pink - #E1306C
// Instagram Purple - rgba(138, 58, 185, 0.8)
// Twitter Blue - #1DA1F2


export default function Analytics() {
    const { currentUser, sidebarVisible, postDetailData, setPostDetailData, currentAdmin } = useAuth() // access directly to the values from the AuthContext.Provider 
    const [dataList, setDataList] = useState()
    const [modalShow, setModalShow] = useState(false)
    const [individualPostAnalytics, setIndividualPostAnalytics] = useState({})
    const [analyticsData, setAnalyticsData] = useState("")
    
    
    /* {'post1_1627856581476': {'postImpressions': 5, 'engagedUsers': 6, 'reactionsByType': 7, 'reactionLikes': 8, 'retweetCount': 9, 'twitterLikeCount': 10, 'replyCount': 11, 'twitterViews': 12, 'hashtags': ['#abc',
    '#bcd'], 'instagramViews': 13, 'commentCount': 14, 'instagramLikeCount': 15, 'accountReach': 16}, 'hey_1627928281964': {'postImpressions': 10, 'engagedUsers': 12, 'reactionsByType': 7, 'reactionLikes': 8, 'retweetCount': 9, 
    'twitterLikeCount': 10, 'replyCount': 11, 'twitterViews': 12, 'hashtags': ['#abc', '#bcd'], 'instagramViews': 13, 'commentCount': 14, 'instagramLikeCount': 15, 'accountReach': 16}} */
    //#fetch('/analytics').then(res => res.json()).then(data => data.post_analytics) //Retrieves dict-of-dicts from back-end

    const last2Weeks = Date.now() - 12096e5
    let data_string = "TITLE".padEnd(15) + "DATE".padEnd(15) + "SOCIAL MEDIA".padEnd(15) + "VIEWERS"

    function postDetailVisible(data1, data2) {
        setPostDetailData(data1) // for each post, set postDetailData and pass into PostDetail.js below
        setIndividualPostAnalytics(data2)
        setModalShow(true) // once true, yarn 
    }

    useEffect(() => {
        const postList = db.ref("users") // where posts are stored

        fetch('/analytics').then(res => res.json()).then(data => { // get post_analytics data (you can set all analytics data here)
            setAnalyticsData(data.post_analytics)
        })
    
        postList.on('value', (snapshot) => { // get all post data from realtime db
            const data = snapshot.val() // array of firebase post data
            const getData = [] // update with new array

            for (let id in data) {
                getData.push({ id, ...data[id] }) // dataList stores ids of different posts
            }
            getData.sort((a, b) => {
                if (a.uploadTimeID.split("_")[1] < b.uploadTimeID.split("_")[1]) return -1
                if (a.uploadTimeID.split("_")[1] > b.uploadTimeID.split("_")[1]) return 1
            })

            
            if(currentAdmin === "admin") {
                setDataList(getData)
            } else {
                setDataList(getData.filter(da => (da.user === currentUser.email && da.uploadTimeID.split("_")[1] >= last2Weeks)))
            }
            
        })

    }, [])

    return (
    <>
    <div>
        {modalShow && <PostDetail data={postDetailData} postData = {individualPostAnalytics} show={modalShow} onHide={() => setModalShow(false)} />} {/*if true, give post detail*/}
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <div ><Topbar /></div>
            <div className="page d-flex align-content-stretch" style={{flex: "1"}}>
            <Sidebar current="analyticspage" />
            <div id={sidebarVisible && "content"} className="content d-flex w-100 p-5 overflow-auto" style={{flex: "1"}}>
                <div className="d-flex flex-row flex-wrap" style={{margin: "auto"}}>
                    <div className="d-flex flex-column mr-4" style={{width: "780px"}}>
                        {analyticsData}
                        <Card className="shadow mt-3" style={{width: "780px", height: "350px"}}>
                            <Card.Body>
                                <Card.Title><TotalViewsLogo style={analyticsIcons} /><h3 style={{color: "#BB0101"}}>Total Viewers</h3></Card.Title>
                                <Card.Subtitle className="mb-2" style={{color:"#878787"}}>Last 7 Days</Card.Subtitle>
                                <Card.Text>
                                    <TotalViews />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div className="d-flex flex-row">
                            <Card className="shadow mt-3" style={{width: "385px", height: "450px", marginRight: "10px"}}>
                                <Card.Body>
                                    <Card.Title><FacebookLogo style={analyticsIcons} /><h3 style={{color: "#BB0101"}}>Facebook</h3></Card.Title>
                                    <Card.Subtitle className="mb-2" style={{color:"#878787"}}>Overall Analytics</Card.Subtitle>
                                    <Card.Title>
                                        <FacebookOverall />
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <Card className="shadow mt-3" style={{width: "385px", height: "450px"}}>
                                <Card.Body>
                                    <Card.Title><InstaLogo style={{width: "25px", height: "25px", marginTop:"5px", marginRight: "9px", float: "left", fill: "#BB0101"}} /><h3 style={{color: "#BB0101"}}>Instagram</h3></Card.Title>
                                    <Card.Subtitle className="mb-2" style={{color:"#878787"}}>Overall Analytics</Card.Subtitle>
                                    <Card.Title>
                                        <InstagramOverall />
                                    </Card.Title>
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
                                        {dataList ? dataList.map((data) => // data can be any name, representing element in dataList array / 1 post
                                        <button type="button" className="postListButton overflow-auto" onClick={() => {postDetailVisible(data, analyticsData[data.uploadTimeID])}} style={postList}>
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
    </div>
    </>
    )
}
