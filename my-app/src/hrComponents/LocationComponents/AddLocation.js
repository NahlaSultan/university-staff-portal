import React,{useRef,useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';

export default function AddLocation() {
  const [type, setType] = useState([])
  const NameRef=useRef()
  const CapacityRef=useRef()
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
},[]);

  function ClearTxtfields(){
    document.getElementById('nameInput').value = ''
    document.getElementById('capacityInput').value = ''
  }

  function ChooseType(e){
    setType(e.target.value)
      
  }

  function HandleAddLocation(){
    if(!NameRef.current.value || NameRef.current.value==""){
      setRes("must sepcify a locaition name")
      return
    } 

    if(!CapacityRef.current.value || CapacityRef.current.value==""){
      setRes("must sepcify capacity")
      return
    } 

    if (type == "") {
      setRes("must specify type")
      return;
  }

    const body={type:type,
        name: NameRef.current.value,
        capacity: CapacityRef.current.value
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/addLocation', body, { headers: { 'token': localStorage.getItem('token') } })
   
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
						Add Location
					</span>

					<div >
					<label >Type: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseType}>
                        <option value="">Choose Type</option>
					            	<option value="hall">Hall</option>
                        <option value="lab">Lab</option>
                        <option value="office">Office</option>

                    </select>
                        <br/><br/>
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

	        <div class="alert">
          {res}
        </div>


	</div>

    </div>
	
</>

  )
}

