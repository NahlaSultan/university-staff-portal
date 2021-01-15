import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';
import '../../styling/dropDown.css'

export default function AddHr() {
	const EmailRef = useRef()
	const NameRef = useRef()
	const SalaryRef = useRef()
	const [offices, setOffices] = useState([])
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


	});

	function ChooseLocation(e) {
		setLocation(e.target.value)
		console.log(Location)
	}




	function HandleAddStaff() {
	

		if(!EmailRef.current.value || EmailRef.current.value==""){
			setRes("must sepcify an email")
			return
		  } 

		if(!NameRef.current.value || NameRef.current.value==""){
			setRes("must sepcify a name")
			return
		}
		else{
			if(NameRef.current.value.length<2){
				setRes("the name must be at least 2 charachters long")
				return
			}
		} 
	  
		
		  if(!SalaryRef.current.value || SalaryRef.current.value==""){
			setRes("must sepcify the salary")
			return
		  } 
	  
		  if (location == "") {
			setRes("must specify an office")
			return;
		}

	

		if (!document.getElementById('male').checked && !document.getElementById('female').checked) {
			setRes("must specify gender")
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
			role: "HR members", dayOff: "Saturday",
			salary: SalaryRef.current.value, 
			office: location,
			gender: genderRadio
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
		<>
			<div className="addStaff">
				<Link to='/hr/staffs' className="linkPrev">&laquo;</ Link> <br />



				<span className="login100-form-title">
					Add HR Member
					</span>

				<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
					<input ref={EmailRef} className="input100" type="text" id="emailInput" placeholder="Email" />
					<span className="focus-input100"></span>
					<span className="symbol-input100">
						<i className="fa fa-envelope" aria-hidden="true"></i>
					</span>
					<br />

				</div>


				<div>
					<input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="Name" />
					<span className="focus-input100"></span>
					<span className="symbol-input100">
					</span>
					<br />
				</div>

				<div>
					<input required={true} ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="Salary" />
					<span className="focus-input100"></span>
					<span className="symbol-input100">
					</span>
					<br />
				</div>



				<div>
					<label >Gender: </label>
					<input type="radio" id="male" name="gender" value="male" />
					<label for="male">Male</label> &nbsp;
					&nbsp;

					<input type="radio" id="female" name="gender" value="female" />
					<label for="female">Female</label> <br />
					<br />
				</div>



				<div >
					<label >Day Off: </label>
					<label> Saturday</label>
					<br /><br /><br />
				</div>


				<div>
					<label >Choose an office: </label>
					<select className='dropbtn' name="types" onChange={ChooseLocation}>
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

				</div>

				<div class="alert">
					{res}
				</div>

				<br /><br />





			</div>


		</>

	)
}

