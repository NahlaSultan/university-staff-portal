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
  <div class="mainDiv">
    <div class="addStaff">		

				<form class="login100-form validate-form">

					<span class="login100-form-title">
						Add Staff Member
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input ref={EmailRef} class="input100" type="text" name="email" placeholder="Email" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        <br/>

					</div>


                    <div>
						<input ref={NameRef} class="input100" name="name" placeholder="Name" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input ref={RoleRef} class="input100" name="role" placeholder="Role" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input ref={DayOffRef} class="input100" name="dayOff" placeholder="Day Off" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
						</span>
                        <br/>
					</div>
					
                    <div>
						<input ref={SalaryRef} class="input100" name="salary" type='number' placeholder="Salary" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
						</span>
                        <br/>
					</div>

                    <div>
						<input ref={OfficeRef} class="input100" name="office" placeholder="Office Location" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
						</span>
                        <br/>
					</div>
					 
                    <div>
						<input ref={GenderRef} class="input100" name="gender" placeholder="Gender" />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
						</span>
                        <br/>
					</div>

					<div class="container-login100-form-btn">
                    <button onClick={HandleAddStaff} class="login100-form-btn">
							Add Member
						</button>
					</div>

					


				</form>

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

