import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation, Link, useHistory } from "react-router-dom";

export default function AddDepartment() {
  const DepNameRef = useRef()
  let history = useHistory()
  const [res, setRes] = useState("")
  const locationReact = useLocation();
  const [acs, setAcs] = useState([])
  const [hod, setHod] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      await
        axios
          .get('http://localhost:8000/hr/viewAC', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setAcs(res.data)
          });
    };
    fetchData();



  }, []);





  function ChooseHod(e) {
    setHod(e.target.value)
  }

  function HandleAddDep() {

    if(!DepNameRef.current.value || DepNameRef.current.value==""){
      setRes("must sepcify department name")
      return
    } 

    const body = {
      facultyName: locationReact.state.facultyName,
      departmentName: DepNameRef.current.value,
      headOfDepartment: hod
    }

    axios
      .post('http://localhost:8000/hr/addDepartment', body, { headers: { 'token': localStorage.getItem('token') } })

      .then(res => {
        console.log(res.data)
        setRes(res.data)
        if (res.data == "success") {
          history.push('/hr/faculties')
        }

      });

  }

  return (
    <>
      <div className="addStaff">
        <Link to='/hr/faculties' className="linkPrev">&laquo;</ Link> <br />


        <span className="login100-form-title">
          Add Department
					</span>




        <div>
          <input required={true} ref={DepNameRef} className="input100" id="depnameInput" placeholder="Department Name" />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
          </span>
          <br />
        </div>

        <div >
          <label >HOD:  </label>

          <select className='dropbtn' name="types" onChange={ChooseHod}>
            <option value=""> HOD ID</option>
            {acs.map(item => (
              <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
            ))}
          </select>
          <br /><br /><br />
        </div>



        <div className="container-login100-form-btn">
          <button onClick={HandleAddDep} className="login100-form-btn">
            Add Department
						</button>
        </div>

        <div class="alert">
          {res}
        </div>




      </div>


    </>

  )
}

