import React,{useRef} from 'react'
import axios from 'axios'
import '../styling/main.css'

export default function AddStaff() {
  const EmailRef=useRef()
  const NameRef=useRef()
  const RoleRef=useRef()
  const DayOffRef=useRef()
  const SalaryRef=useRef()
  const OfficeRef=useRef()
  const GenderRef=useRef()
  const FacultyRef=useRef()
  const DeparmentRef=useRef()

function ClearTxtfields(){
	document.getElementById('emailInput').value = ''
	document.getElementById('nameInput').value = ''
	document.getElementById('roleInput').value = ''
	document.getElementById('dayOffInput').value = ''
	document.getElementById('nameInput').value = ''
	document.getElementById('roleInput').value = ''
	document.getElementById('dayOffInput').value = ''
	document.getElementById('salaryInput').value = ''
	document.getElementById('officeInput').value = ''
	document.getElementById('genderInput').value = ''
	document.getElementById('facultyInput').value = ''
	document.getElementById('departmentInput').value = ''
}

  function HandleAddStaff(){


    const body={email:EmailRef.current.value, name:NameRef.current.value ,
        role:RoleRef.current.value, dayOff:DayOffRef.current.value ,
        salary:SalaryRef.current.value, office:OfficeRef.current.value ,
        gender:GenderRef.current.value, faculty: FacultyRef.current.value, department:DeparmentRef.current.value
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/addStaff', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>console.log(res.data));

   ClearTxtfields()

}

  return (
    <>
    <div className="addStaff">		


					<span className="login100-form-title">
						Add Staff Member
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input ref={EmailRef} className="input100" type="text" id="emailInput" placeholder="Email" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        <br/>

					</div>


                    <div>
						<input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="Name" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input required={true} ref={RoleRef} className="input100" id="roleInput" placeholder="Role" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input required={true} ref={DayOffRef} className="input100" id="dayOffInput" placeholder="Day Off" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

					
                    <div>
						<input required={true} ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="Salary" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input required={true}  ref={OfficeRef} className="input100" id="officeInput" placeholder="Office Location" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>
					 
                    <div>
						<input required={true} ref={GenderRef} className="input100" id="genderInput" placeholder="Gender" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input  ref={FacultyRef} className="input100" id="facultyInput" placeholder="Faculty" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input  ref={DeparmentRef} className="input100" id="departmentInput" placeholder="Department" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

					<div className="container-login100-form-btn">
                    <button onClick={HandleAddStaff} className="login100-form-btn">
							Add Member
						</button>
					</div>

					



	</div>

	
</>

  )
}

