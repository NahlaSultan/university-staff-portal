import React,{useRef,useEffect,useState} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import '../../styling/dropDown.css'

export default function AddHr() {
  const EmailRef=useRef()
  const NameRef=useRef()
  const SalaryRef=useRef()
  const [offices, setOffices] = useState([])
  const [location, setLocation] = useState("")
  var genderRadio=""

useEffect(() => {
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



function ClearTxtfields(){
	document.getElementById('emailInput').value = ''
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
        role:"HR members", dayOff:"Saturday" ,
        salary:SalaryRef.current.value, office:location ,
        gender:genderRadio
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
						Add HR Member
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
					<label >Day Off: </label>
                    <label> Saturday</label> 
                        <br/><br/><br/>
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
						<br/><br/><br/>

					</div>



					



	</div>

	
</>

  )
}

