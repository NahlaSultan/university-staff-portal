import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";

export default function UpdateCourse() {

    const NameRef = useRef()
    const SlotNoRef = useRef()
    let history = useHistory()
    const [newDep, setNewDep] = useState("")
    const [facDepartments, setDepartments] = useState([])
    const locationReact = useLocation();
    const facultyName = locationReact.state.facultyName
    const departmentName = locationReact.state.departmentName
    const courseName = locationReact.state.courseName
    const [res, setRes] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            await
                axios
                    .post('http://localhost:8000/hr/viewDepartments', { fac: facultyName }, { headers: { 'token': localStorage.getItem('token') } })
                    .then(res => {
                        setDepartments(res.data)
                        console.log(res.data)
                    });
        };
        fetchData();




    }, []);

    function backtodep() {
        console.log("back to dep")
        history.push({
            pathname: '/hr/departmentsPage',
            state: { facultyName: facultyName }
        })
    }

    function ChooseDepartment(e) {
        setNewDep(e.target.value)
    }


    function HandleUpdateCourse() {

        const body = {
            facultyName: facultyName,
            departmentName: departmentName,
            courseName: courseName,
            newName: NameRef.current.value,
            teachingSlotsNumber: SlotNoRef.current.value,
            newDepartment: newDep

        }

        console.log(body)

        axios
            .post('http://localhost:8000/hr/updateCourse', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                if (res.data == "success")
                history.push({
                    pathname: '/hr/departmentsPage',
                    state: { facultyName: facultyName }
                })
                setRes(res.data)


            });

    }

    return (
        <>
            <div className="addStaff">
                <br />
                <button onClick={backtodep} className="linkPrev">
                    <Link  >&laquo;</ Link>
                </button>

                <br />

                <span className="login100-form-title">
                    Update {courseName}
                </span>



                <div>
                    <input ref={NameRef} className="input100" id="nameInput" placeholder="new name" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>


                <div>
                    <input ref={SlotNoRef} type='number' className="input100" id="slotNoInput" placeholder="Number of Teaching Slots" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>

                <label >Department: {departmentName} </label>
                <select className='dropbtn' name="types" onChange={ChooseDepartment}>
                    <option value="">Choose New Department</option>
                    {facDepartments.map(item => (
                        <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                </select>



                <div className="container-login100-form-btn">
                    <button onClick={HandleUpdateCourse} className="login100-form-btn">
                        Update </button>
                </div>

                <div className="alert">
                    {res}
                </div>


            </div>


        </>

    )
}

