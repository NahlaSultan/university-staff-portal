import React,{useRef,useEffect,useState} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import '../../styling/dropDown.css'
import { useLocation,useHistory } from "react-router-dom";


export default function UpdateStaff() {
  const EmailRef=useRef()
  const NewNameRef=useRef()
  const AnnualLeavesRef=useRef()
  const PasswordRef=useRef() 
  const [offices, setOffices] = useState([])
  const [faculties, setFaculties] = useState([])
  const [faculty, setFaculty] = useState("")
  const [facDepartments, setDepartments] = useState([])
  const [department, setDepartment] = useState("")
  const [dayOff, setDayOff] = useState("")
  const [location, setLocation] = useState("")
  var genderRadio=""

  const locationReact = useLocation();


useEffect(() => {
    const fetchOffices = async () => {
		await axios   
		.get('http://localhost:8000/hr/viewOffices',{ headers: { 'token': localStorage.getItem('token') } })
		.then(res => {
			setOffices(res.data)
		  });  
	  };
	  fetchOffices();

	  const fetchFacs = async () => {
		await   axios   
		.get('http://localhost:8000/hr/viewFaculties',{ headers: { 'token': localStorage.getItem('token') } })
		.then(res => {
			setFaculties(res.data)
		  });
	  };
	  fetchFacs();

	
	
	},[]);
  
 function ChooseLocation(e) {
	setLocation(e.target.value)
	  console.log(Location)
  }

  function ChooseDayOff(e) {
	setDayOff(e.target.value)
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
	// document.getElementById('emailInput').value = ''
    // document.getElementById('nameInput').value = ''
    // document.getElementById('pass').value = ''
	// document.getElementById('salaryInput').value = ''
	// document.getElementById('male').checked = false
	// document.getElementById('female').checked = false


}

function HandleUpdateStaff(){
	if (document.getElementById('male').checked) {
		genderRadio = "Male"
	  }
	  else{
		genderRadio = "Female"
	  }
    

    const body={id:locationReact.state.memberID 
        ,email:EmailRef.current.value, name:NewNameRef.current.value ,
        password: PasswordRef.current.value ,dayOff:dayOff ,
        annualLeavesBalance: AnnualLeavesRef.current.value,  
        office:location ,
        gender:genderRadio, faculty: faculty, department:department
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/updateStaff', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>console.log(res.data));

   ClearTxtfields()

}



  return (
    <>
    <div className="addStaff">		
 

					<span className="login100-form-title">
						Update {locationReact.state.memberID}
					</span>
                    <h5>  email: {locationReact.state.email}  </h5>
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input ref={EmailRef} className="input100" type="text" id="emailInput" placeholder="new email" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        <br/>

					</div>

                    <h5>  name: {locationReact.state.name}  </h5>
                    <div>
						<input required={true} ref={NewNameRef} className="input100" id="nameInput" placeholder="Name" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>
                    <h5>  Annual leaves balance: {locationReact.state.annualLeavesBalance}  </h5>
					<div>
						<input required={true} ref={AnnualLeavesRef} className="input100" id="salaryInput" type='number' placeholder="Annual Leaves Balance" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

					<div>
						<input required={true} ref={PasswordRef} className="input100" id="salaryInput"  placeholder="new password" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <h5>  gender: {locationReact.state.gender}  </h5>             
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
                    <h5>  Day Off: {locationReact.state.dayOff}  </h5>

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
                    <h5>  Faculty: {locationReact.state.fac}  </h5>

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


                    <h5>  Department: {locationReact.state.dep}  </h5>

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

                    <h5>  Office: {locationReact.state.office}  </h5>

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
                    <button onClick={HandleUpdateStaff} className="login100-form-btn">
							Update
						</button>
					</div>



					



	</div>

	
</>

  )
}

