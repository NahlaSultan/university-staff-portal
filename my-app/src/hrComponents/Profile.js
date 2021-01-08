import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';

export default function Profile() {
    const [staff, setStaff] = useState([])


    async function getStaff() {
        await axios
            .post('http://localhost:8000/getStaffFromToken', { token: localStorage.getItem('token') })
            .then(res => {
                console.log("res")
                setStaff(res.data)
                console.log(res.data)
            });
    }
    useEffect(() => {

        getStaff()


    }, [])
    console.log("method")

    console.log(staff)


    return (
        <div>
            <h1>   </h1>
            <h1> Name: {staff[0].name}</h1>
            <h1> ID: {staff[0].memberID}</h1>
            <h1> Roles: {staff[0].role}</h1>
            <h1>Salary:  {staff[0].salary} EGP</h1>
            <h1> Email: {staff[0].email}</h1>



        </div>
    )
}


