import React, {useState } from 'react'
import { Navbar, Dropdown } from 'react-bootstrap'
import menuIcon from '../menuIcon.svg'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../LogoSocial.svg'
import { normalText } from '../style'
import account from "../account.svg"

export const SidebarContext = React.createContext()

export default function Topbar() {
    const history = useHistory() 
    const [error, setError] = useState("")
    const { currentUser, logout, showSidebar, setSidebarVisible, currentScreen, setCurrentScreen } = useAuth()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    function onClickUpdateEmail() {
        history.push("/update-profile");
        setCurrentScreen(window.innerWidth)
        if (currentScreen < 1300) {
            setSidebarVisible(false)
        }
    }

    function onClickUpdatePassword() {
        history.push("/update-password");
        setCurrentScreen(window.innerWidth)
        if (currentScreen < 1300) {
            setSidebarVisible(false)
        }
    }

    function onClickTopbarLogo() {
        history.push('/');
        setCurrentScreen(window.innerWidth)
        if (currentScreen < 1300) {
            setSidebarVisible(false)
        }
    }
    
    return (
        <div>
            <Navbar className="d-flex align-items-center justify-content-center" style={{boxShadow: "0 8px 6px -6px #999", zIndex: "2"}}>
                <div className="d-flex align-items-center flex-row" style={{flex: 1, marginLeft: "10px"}}><img src={menuIcon} alt="menu icon" type="button" onClick={showSidebar}/></div>
                <div className="d-flex align-items-center justify-content-center" type="button" onClick={onClickTopbarLogo} style={{margin: "auto", maxWidth: '400px', overflow: "hidden", flex: 5}}>
                    <img src={logo} alt="logo" style={{width: "125%"}} />  
                </div>
                <Dropdown className="d-flex align-items-center flex-row-reverse" style={{flex: 1, marginRight: "10px"}}>
                    <Dropdown.Toggle variant="none" id="account-dropdown" style={{padding: "0px"}}>
                        <img src={account} alt="account icon" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight="true">
                        <Dropdown.Item disabled="true"><div style={{color: "#BB0101"}}>{currentUser.email}</div></Dropdown.Item>
                        <Dropdown.Item onClick={onClickUpdateEmail}>Update Email</Dropdown.Item>
                        <Dropdown.Item onClick={onClickUpdatePassword}>Update Password</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} style={normalText}>Logout </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
            </Navbar>
        </div>
        
    )
}
