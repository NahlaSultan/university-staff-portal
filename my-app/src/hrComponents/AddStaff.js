import React,{useRef,useEffect,useState} from 'react'
import axios from 'axios'
import '../styling/main.css'
import '../styling/dropDown.css'

export default function AddStaff() {
  const EmailRef=useRef()
  const NameRef=useRef()
  const SalaryRef=useRef()
  const [offices, setOffices] = useState([])
  const [faculties, setFaculties] = useState([])
  const [faculty, setFaculty] = useState("")
  const [facDepartments, setDepartments] = useState([])
  const [department, setDepartment] = useState("")
  const [dayOff, setDayOff] = useState("")
  const [role, setRole] = useState("")
  const [location, setLocation] = useState("")
  var genderRadio=""

useEffect(() => {
	// Update the document title using the browser API
	axios   
	.get('http://localhost:8000/hr/viewOffices',{ headers: { 'token': localStorage.getItem('token') } })
	.then(res => {
		setOffices(res.data)
	  });  
	
	  axios   
	  .get('http://localhost:8000/hr/viewFaculties',{ headers: { 'token': localStorage.getItem('token') } })
	  .then(res => {
		  setFaculties(res.data)
		});
	
	});
  
 function ChooseLocation(e) {
	setLocation(e.target.value)
	  console.log(Location)
  }

  function ChooseDayOff(e) {
	setDayOff(e.target.value)
  }

  function ChooseRole(e) {
	setRole(e.target.value)
  }
  function ChooseFaculties(e) {
	axios   
	.post('http://localhost:8000/hr/viewDepartments',{fac:e.target.value},{ headers: { 'token': localStorage.getItem('token') } })
	.then(res => {
		setDepartments(res.data)
		console.log(res.data)
	  });
	
	setFaculty(e.target.value)


  }
  function ChooseDepartment(e) {
	setDepartment(e.target.value)
  }
function ClearTxtfields(){
	document.getElementById('emailInput').value = ''
	document.getElementById('nameInput').value = ''
	document.getElementById('nameInput').value = ''
	document.getElementById('salaryInput').value = ''
	document.getElementById('male').checked = false
	document.getElementById('female').checked = false


}

function HandleAddStaff(){
	if (document.getElementById('male').checked) {
		genderRadio = "Male"
	  }
	  else{
		genderRadio = "Female"
	  }

    const body={email:EmailRef.current.value, name:NameRef.current.value ,
        role:role, dayOff:dayOff ,
        salary:SalaryRef.current.value, office:location ,
        gender:genderRadio, faculty: faculty, department:department
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
						<input required={true} ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="Salary" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>


             
					<div>
					<label >Gender: </label>
					<input type="radio" id="male" name="gender" value="male"/>
					<label for="male">Male</label> &nbsp;
					&nbsp;

					<input type="radio" id="female" name="gender" value="female"/>
					<label for="female">Female</label> <br/>
                        <br/>
					</div>


					<div >
					<label >Role: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseRole}>
                        <option value="">Choose Role</option>
						<option value="HR members">HR Member</option>
                        <option value="headOfdepartments">Head Of Department</option>
                        <option value="courseInstructors">Course Instructor</option>
						<option value="courseCoordinators">Course Coordinator</option>
						<option value="teachingAssistants">Teaching Assistant</option>

                    </select>
                        <br/><br/>
					</div>

				



					
                  
					<div >
					<label >Day Off: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseDayOff}>
                        <option value="">Day Off</option>
						<option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
						<option value="Tuesday">Tuesday</option>
						<option value="Wednesday">Wednesday</option>
						<option value="Thursday">Thursday</option>


                    </select>
                        <br/><br/>
					</div>
					 
					<div id="facultyDiv">
					<label >Choose an Faculty: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseFaculties}>
                        <option value="">Choose Faculty</option>
                        {faculties.map(item => (
                            <option key={item.facultyName} value={item.facultyName}>{item.facultyName}</option>
                        ))}
                    </select>
                        <br/><br/>
					</div>



					<div id="departmentDiv">
					<label >Choose a Department: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseDepartment}>
                        <option value="">Choose Department</option>
                        {facDepartments.map(item => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                        <br/><br/>
					</div>

              

					<div>
					<label >Choose an office: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseLocation}>
                        <option value="">Choose office</option>
                        {offices.map(item => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                        <br/><br/>
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

