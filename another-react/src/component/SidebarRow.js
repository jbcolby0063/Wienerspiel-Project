import React from 'react'
import {menuListLogo} from '../style'
import "../App.css"

export default function SidebarRow({ Icon, title }) {
    return (
        <div className="sidebarRow d-flex align-items-center" style={{ paddingLeft:"25px", paddingTop: "17px", paddingBottom: "17px", paddingRight: "10px"}}>
            <Icon className="icon" style={ menuListLogo } />
            <h3 classNmae="title" style={{flex: "1", marginBottom: "1px", color: "#878787"}}>{title}</h3>
        </div>
    )
}
