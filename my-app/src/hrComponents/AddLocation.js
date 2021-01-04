import React,{useRef} from 'react'
import axios from 'axios'
import '../styling/main.css'

export default function AddLocation() {
  const TypeRef=useRef()
  const NameRef=useRef()
  const CapacityRef=useRef()

  function ClearTxtfields(){
    document.getElementById('typeInput').value = ''
    document.getElementById('nameInput').value = ''
    document.getElementById('capacityInput').value = ''
  }

  function HandleAddLocation(){


    const body={type:TypeRef.current.value,
        name: NameRef.current.value,
        capacity: CapacityRef.current.value
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/addLocation', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>console.log(res.data));

   ClearTxtfields()
}

  return (
    <>
  <div >
    <div className="addStaff">		


					<span className="login100-form-title">
						Add Location
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input ref={TypeRef} className="input100" type="text" id="typeInput" placeholder="Location Type" />
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
						<input required={true} ref={CapacityRef} type='number' className="input100" id="capacityInput" placeholder="Capacity" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

            

					<div className="container-login100-form-btn">
                        <button onClick={HandleAddLocation} className="login100-form-btn">
                        Add Location </button>
					</div>

	


	</div>

    </div>
	
</>

  )
}

