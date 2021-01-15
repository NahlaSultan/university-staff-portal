import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";




export default function UpdateDepartment() {
    const NameRef = useRef()
    const [hod, setHod] = useState("")
    const [newFac, setNewFac] = useState("")
    const [faculties, setFaculties] = useState([])
    const [acs, setAcs] = useState([])
    const locationReact = useLocation();
    const facultyName = locationReact.state.facultyName
    const departmentName = locationReact.state.dep.name
    const dep = locationReact.state.dep
    let history = useHistory()
    const [res, setRes] = useState("")

    useEffect(() => {

        const checkToken = async()=>{
            if(localStorage.getItem('token')){
              console.log("TOKENS")
              await axios
              .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
              .then(res => {
              if(!res.data.includes('HR members')) {
                history.push('/error')
              } 
              });
            }
            else{
              console.log("NOT TOKENS")
              history.push('/')
        
            }
      
        }
        checkToken()
        
        const fetchData = async () => {
            await
                axios
                    .get('http://localhost:8000/hr/viewFaculties', { headers: { 'token': localStorage.getItem('token') } })
                    .then(res => {
                        setFaculties(res.data)
                    });
        };
        fetchData();

        const fetchStaff = async () => {
            await
                axios
                    .get('http://localhost:8000/hr/viewAC', { headers: { 'token': localStorage.getItem('token') } })
                    .then(res => {
                        setAcs(res.data)
                    });
        };
        fetchStaff();




    }, []);




    function backtodep() {
        console.log("back to dep")
        history.push({
            pathname: '/hr/departmentsPage',
            state: { facultyName: facultyName }
        })
    }

    function ChooseHod(e) {
        setHod(e.target.value)
    }

    function ChooseFac(e) {
        setNewFac(e.target.value)
    }

    async function HandleUpdateDepartment() {

        const body = {
            facultyName: facultyName,
            departmentName: departmentName,
            newName: NameRef.current.value,
            hod: hod,
            newFaculty: newFac
        }

        console.log(body)

        await axios
            .post('http://localhost:8000/hr/updateDepartment', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                if (res.data == "success")
                    history.push('/hr/faculties')
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
                    Update {departmentName}
                </span>



                <div>
                    <input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="new name" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>

                <div >
                    <label >HOD: {dep.headOfDepartment} </label>

                    <select className='dropbtn' name="types" onChange={ChooseHod}>
                        <option value="">New HOD</option>
                        {acs.map(item => (
                            <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                        ))}
                    </select>
                    <br /><br /><br />
                </div>


                <label >Faculty: {facultyName} </label>
                <select className='dropbtn' name="types" onChange={ChooseFac}>
                    <option value="">New Faculty</option>
                    {faculties.map(item => (
                        <option key={item.facultyName} value={item.facultyName}>{item.facultyName}</option>
                    ))}
                </select>



                <div className="container-login100-form-btn">
                    <button onClick={HandleUpdateDepartment} className="login100-form-btn">
                        Update </button>
                </div>



                <div className="alert">
                    {res}
                </div>

            </div>


        </>

    )
}

