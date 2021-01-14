import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/App.css';
import { Link } from 'react-router-dom'
import SideNav from '../mainComponents/SideNav';
import Nav from '../mainComponents/Nav';
export default function SignIn() {
    const [message, setMessage] = useState("")
    function HandleSignIn(){
    
       axios   
       .get('http://localhost:8000/signIn', {headers:{'token':localStorage.getItem('token')}})
       
       .then(res=>setMessage(res.data));
      
    
    }
   
    return (
        <>
        <Nav/>
    <SideNav/>
            <div className='App'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <div className="buttons`">
                <button onClick={HandleSignIn} className="buttons">
                    Sign In
        </button> */}
         <button className="btn" onClick={HandleSignIn} style={{height: "50px"}} >Sign In </button>
                      
        <br></br>
            <br></br>
        <r1> {message}</r1>
            </div>
            
            {/* </div> */}
        </>

    )
}
