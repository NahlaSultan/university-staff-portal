import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'
import '../../styling/main.css';
import '../../styling/dropDown.css'

export default function AddStaff() {
	const EmailRef = useRef()
	const NameRef = useRef()
	const SalaryRef = useRef()
	const [offices, setOffices] = useState([])
	const [faculties, setFaculties] = useState([])
	const [faculty, setFaculty] = useState("")
	const [facDepartments, setDepartments] = useState([])
	const [department, setDepartment] = useState("")
	const [dayOff, setDayOff] = useState("")
	const [role, setRole] = useState("")
	const [location, setLocation] = useState("")
	var genderRadio = ""
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
		
		// Update the document title using the browser API
		const fetchOffices = async () => {
			await
				axios.get('http://localhost:8000/hr/viewOffices', { headers: { 'token': localStorage.getItem('token') } })
					.then(res => {
						setOffices(res.data)
					});
		};
		fetchOffices();

		const fetchFacs = async () => {
			await
				axios.get('http://localhost:8000/hr/viewFaculties', { headers: { 'token': localStorage.getItem('token') } })
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

	function ChooseRole(e) {
		setRole(e.target.value)
	}
	function ChooseFaculties(e) {
		axios
			.post('http://localhost:8000/hr/viewDepartments', { fac: e.target.value }, { headers: { 'token': localStorage.getItem('token') } })
			.then(res => {
				setDepartments(res.data)
				console.log(res.data)
			});

		setFaculty(e.target.value)


	}
	function ChooseDepartment(e) {
		setDepartment(e.target.value)
	}


	function HandleAddStaff() {
		if (!EmailRef.current.value || EmailRef.current.value == "") {
			setRes("must sepcify an email")
			return
		}

		if (!NameRef.current.value || NameRef.current.value == "") {
			setRes("must sepcify a name")
			return
		}
		else {
			if (NameRef.current.value.length < 2) {
				setRes("the name must be at least 2 charachters long")
				return
			}
		}
		if (!SalaryRef.current.value || SalaryRef.current.value == "") {
			setRes("must sepcify the salary")
			return
		}

		if (!document.getElementById('male').checked && !document.getElementById('female').checked) {
			setRes("must specify gender")
			return;
		}
		if (role == "") {
			setRes("must specify role")
			return;
		}
		if (dayOff == "") {
			setRes("must specify day off")
			return;
		}
	
		if (faculty == "") {
			setRes("must specify a faculty")
			return;
		} if (department == "") {
			setRes("must specify a department")
			return;
		} 

		if (location == "") {
			setRes("must specify an office")
			return;
		}




		if (document.getElementById('male').checked) {
			genderRadio = "Male"
		}
		else {
			genderRadio = "Female"
		}

		const body = {
			email: EmailRef.current.value, name: NameRef.current.value,
			role: role, dayOff: dayOff,
			salary: SalaryRef.current.value, office: location,
			gender: genderRadio, faculty: faculty, department: department
		}
		//  console.log(body)

		axios
			.post('http://localhost:8000/hr/addStaff', body, { headers: { 'token': localStorage.getItem('token') } })

			.then(res => {
				console.log(res.data)
				setRes(res.data)
				if (res.data == "success") {
					history.push('/hr/staffs')
				}

			});


	}



	return (
		<div className="addStaff">
			<Link to='/hr/staffs' className="linkPrev">&laquo;</ Link> <br />


			<span className="login100-form-title">
				Add Staff Member
					</span>

			<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
				<input ref={EmailRef} required='required' className="input100" type="text" id="emailInput" placeholder="Email" />
				<span className="focus-input100"></span>
				<span className="symbol-input100">
					<i className="fa fa-envelope" aria-hidden="true"></i>
				</span>
				<br />

			</div>


			<div>
				<input minlength="2" required='required' ref={NameRef} className="input100" id="nameInput" placeholder="Name" />
				<span className="focus-input100"></span>
				<span className="symbol-input100">
				</span>
				<br />
			</div>

			<div>
				<input required='required' ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="Salary" />
				<span className="focus-input100"></span>
				<span className="symbol-input100">
				</span>
				<br />
			</div>



			<div>
				<label >Gender: </label>
				<input required='required' type="radio" id="male" name="gender" value="male" />
				<label for="male">Male</label> &nbsp;
					&nbsp;

					<input type="radio" id="female" name="gender" value="female" />
				<label for="female">Female</label> <br />
				<br />
			</div>


			<div >
				<label >Role: </label>
				<select required=' required' className='dropbtn' onChange={ChooseRole}>
					<option value="">Choose Role</option>
					<option value="headOfdepartments">Head Of Department</option>
					<option value="courseInstructors">Course Instructor</option>
					<option value="courseCoordinators">Course Coordinator</option>
					<option value="teachingAssistants">Teaching Assistant</option>

				</select>
				<br /><br /><br />
			</div>







			<div >
				<label >Day Off: </label>
				<select required=' required' className='dropbtn' onChange={ChooseDayOff}>
					<option value="">Day Off</option>
					<option value="Saturday">Saturday</option>
					<option value="Sunday">Sunday</option>
					<option value="Monday">Monday</option>
					<option value="Tuesday">Tuesday</option>
					<option value="Wednesday">Wednesday</option>
					<option value="Thursday">Thursday</option>

				</select>
				<br /><br /><br />
			</div>

			<div>

				<li className='listInline'>
				<select required='required' className='dropbtn' onChange={ChooseFaculties}>
						<option value="">Choose Faculty</option>
						{faculties.map(item => (
							<option key={item.facultyName} value={item.facultyName}>{item.facultyName}</option>
						))}
					</select>

					<select required='required' className='dropbtn' onChange={ChooseDepartment}>
						<option value="">Choose Department</option>
						{facDepartments.map(item => (
							<option key={item.name} value={item.name}>{item.name}</option>
						))}
					</select>

				



				</li>
				<br /><br />
			</div>







			<div>
				<label >Choose an office: </label>
				<select required='required' className='dropbtn' name="types" onChange={ChooseLocation}>
					<option value="">Choose office</option>
					{offices.map(item => (
						<option key={item.name} value={item.name}>{item.name}</option>
					))}
				</select>
				<br /><br />
			</div>


			<div className="container-login100-form-btn">
				<button onClick={HandleAddStaff} className="login100-form-btn">
					Add Member
						</button>

				<div class="alert">
					{res}
				</div>
				<br /><br /><br />

			</div>






		</div>




	)
}

