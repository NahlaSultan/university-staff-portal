import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';
import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

function Location({loc}) {
    let history = useHistory();
    function HandleDeleteLocation(){

        const body = {name: loc.name}
       axios   
       .post('http://localhost:8000/hr/deleteLocation',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res=>console.log(res.data));
    
    }

    function HandleUpdateLocation(){
        history.push({
        pathname: '/hr/updateLocation',
        state: { loc: loc }
       })

    }

    return (
        <div>
            <h3> {loc.name} </h3>
                <ul> type: {loc.type} </ul>
                <ul> capacity: {loc.capacity} </ul> 
                <ul> office Members: {loc.officeMembers} </ul> 
                <button className = 'btn' onClick={HandleDeleteLocation}>   Delete </button> 
                <button className = 'btn' onClick={HandleUpdateLocation}>   Update  </button> 
                <br/>                <br/>


        </div>
    )
}

export default Location
