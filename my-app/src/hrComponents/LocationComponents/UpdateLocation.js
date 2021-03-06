import React,{useRef,useState,useEffect} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


export default function UpdateLocation() {
  const NameRef=useRef()
  const CapacityRef=useRef()
  const locationReact = useLocation();
  let history = useHistory();
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
},[]);

  function HandleUpdateLocation(){

 
    const body={name: locationReact.state.loc.name,
        newName: NameRef.current.value,
        capacity: CapacityRef.current.value
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/updateLocation', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>{
    console.log(res.data)
    setRes(res.data)
    if (res.data == "success") {
      history.push('/hr/locations')
    }

  });



}

  return (
    <>
  <div >
    <div className="addStaff">		


					<span className="login100-form-title">
						Update {locationReact.state.loc.name}
					</span>

	

                    <div>
						<input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="New Name" />
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
                        <button onClick={HandleUpdateLocation} className="login100-form-btn">
                        Update  </button>
					</div>

	        <div class="alert">
          {res}
        </div>


	</div>

    </div>
	
</>

  )
}

