import React,{useRef} from 'react'
import axios from 'axios'
import './main.css';

export default function AddStaff() {
  const EmailRef=useRef()
  const NameRef=useRef()
  const RoleRef=useRef()
  const DayOffRef=useRef()
  const SalaryRef=useRef()
  const OfficeRef=useRef()
  const GenderRef=useRef()

  function HandleAddStaff(){


    const body={email:EmailRef.current.value, name:NameRef.current.value ,
        role:RoleRef.current.value, dayOff:DayOffRef.current.value ,
        salary:SalaryRef.current.value, officeLocation:OfficeRef.current.value ,
        gender:GenderRef.current.value
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/addStaff', body)
   
   .then(res=>console.log(res.data));
   // callAPI()
}

  return (
    <>
  <div >
    <div className="addStaff">		


					<span className="login100-form-title">
						Add Staff Member
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input ref={EmailRef} className="input100" type="text" name="email" placeholder="Email" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        <br/>

					</div>


                    <div>
						<input required={true} ref={NameRef} className="input100" name="name" placeholder="Name" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input required={true} ref={RoleRef} className="input100" name="role" placeholder="Role" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input required={true} ref={DayOffRef} className="input100" name="dayOff" placeholder="Day Off" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>
					
                    <div>
						<input required={true} ref={SalaryRef} className="input100" name="salary" type='number' placeholder="Salary" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input required={true}  ref={OfficeRef} className="input100" name="office" placeholder="Office Location" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>
					 
                    <div>
						<input required={true} ref={GenderRef} className="input100" name="gender" placeholder="Gender" />
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

    </div>
	
</>






    // <div>
    //  Name:
    // <input ref={NameRef} type="text"/>
    // <br></br>
    // Email:
    // <input ref={EmailRef} type="text"/>
    // <br></br>
    // Role:
    // <input ref={RoleRef} type="text"/>
    // <br></br>
    // Day Off:
    // <input ref={DayOffRef} type="text"/>
    // <br></br>
    // Salary:
    // <input ref={SalaryRef} type="text"/>
    // <br></br>
    // Office number:
    // <input ref={OfficeRef} type="text"/>
    // <br></br>
    // Gender:
    // <input ref={GenderRef} type="text"/>
    // <br></br>
    // <button onClick={HandleAddStaff}> Add </button>
    // </div>
  )
}

