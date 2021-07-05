import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import {ReactComponent as LogoutLogo} from '../logout.svg'
import {ReactComponent as Post} from '../post.svg'
import {ReactComponent as Analytics} from '../analytics.svg'
import SidebarRow from './SidebarRow'
import "../App.css"

export default function Sidebar({current}) {
    const [error, setError] = useState("")
    const { logout, sidebarVisible, setSidebarVisible, currentScreen, setCurrentScreen } = useAuth()
    const history = useHistory()

    const sidebarFalseHere = () => {
        setCurrentScreen(window.innerWidth)
        if (currentScreen > 1300 && window.innerWidth < 1300) {
            setSidebarVisible(false)
        }
        
    }
    const smallScreenSetSidabar = () => {
        setCurrentScreen(window.innerWidth)
        if (currentScreen < 1300) {
            setSidebarVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", sidebarFalseHere)
        return () => {
          window.removeEventListener("resize", sidebarFalseHere)
        }
    })

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div className={sidebarVisible ? "menu" : "menu nonactive"}>
           {error && <Alert variant="danger">{error}</Alert>} 
           <div style={current === "postpage" ? {backgroundColor: "#DADADA"} : {}}><Link to="/" style={{textDecoration: "none"}} onClick={smallScreenSetSidabar}><SidebarRow Icon={Post} title="Post"/></Link></div>
           <div style={current === "analyticspage" ? {backgroundColor: "#DADADA"} : {}}><Link to="/analytics" style={{textDecoration: "none"}} onClick={smallScreenSetSidabar}><SidebarRow Icon={Analytics} title="Analytics" /></Link></div>
           <div type="button" onClick={handleLogout}><SidebarRow Icon={LogoutLogo} title="Logout" /></div>
        </div>
    )
}
