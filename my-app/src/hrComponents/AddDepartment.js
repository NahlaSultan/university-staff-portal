import React,{useRef} from 'react'
import axios from 'axios'
import '../styling/main.css'


export default function AddDepartment() {
  const FacNameRef=useRef()
  const DepNameRef=useRef()
  const HodRef=useRef()

  function ClearTxtfields(){
    document.getElementById('depnameInput').value = ''
    document.getElementById('facnameInput').value = ''
    document.getElementById('hodInput').value = ''
  }

  function HandleAddDep(){

    const body={
        facultyName: FacNameRef.current.value,
        departmentName: DepNameRef.current.value,
        headOfDepartment:  HodRef.current.value        
     }

   axios   
   .post('http://localhost:8000/hr/addDepartment', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>console.log(res.data));

   ClearTxtfields()
}

  return (
    <>
    <div className="addStaff">		


					<span className="login100-form-title">
						Add Department
					</span>



            <div>
              <input required={true} ref={FacNameRef} className="input100" id="facnameInput" placeholder="Faculty Name" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
              </span>
              <br/>
					  </div>

          <div>
            <input required={true} ref={DepNameRef} className="input100" id="depnameInput" placeholder="Department Name" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br/>
					</div>

          <div>
            <input required={true} ref={HodRef} className="input100" id="hodInput" placeholder="HOD ID" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br/>
					</div>

            

					<div className="container-login100-form-btn">
              <button onClick={HandleAddDep} className="login100-form-btn">
							Add Department
						</button>
					</div>

	


	</div>

	
</>

  )
}

