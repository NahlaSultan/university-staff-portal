import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/App.css';
import { Link } from 'react-router-dom'
import SideNav from '../mainComponents/SideNav';
import Nav from '../mainComponents/Nav';
export default function StaffProfile() {
    const [message2, setMessage2] = useState("")
   
    function HandleSignOut(){
    
        axios   
        .get('http://localhost:8000/signOut', {headers:{'token':localStorage.getItem('token')}})
        
        .then(res=>setMessage2(res.data));
       
     
     }
    return (
        <>
        <Nav/>
    <SideNav/>
            
            <br></br>
            <br></br>
            <div className="buttons">
                <button onClick={HandleSignOut} className="buttons">
                    Sign Out
        </button>
        <br></br>
            <br></br>
        <r1> {message2}</r1>
        <br></br>
            <br></br>
            </div>
        </>

    )
}
