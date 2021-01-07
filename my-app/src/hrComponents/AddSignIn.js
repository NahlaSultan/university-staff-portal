import React,{useRef,useEffect,useState} from 'react'
import axios from 'axios'
import '../styling/main.css'
import '../styling/dropDown.css'

export default function AddSignIn() {

  const IdRef=useRef()
  const [date, setDate] = useState("")
  const[record,setRecord ] = useState([])
  const[id, setId] = useState("")

// useEffect(() => {
// 	// Update the document title using the browser API
// 	axios   
// 	.get('http://localhost:8000/hr/viewOffices',{ headers: { 'token': localStorage.getItem('token') } })
// 	.then(res => {
// 		setOffices(res.data)
// 	  });  
	
// 	  axios   
// 	  .get('http://localhost:8000/hr/viewFaculties',{ headers: { 'token': localStorage.getItem('token') } })
// 	  .then(res => {
// 		  setFaculties(res.data)
// 		});
	
// 	});

  function HandleDate(e){
      setDate(e.target.value)

  }

  function ClearTxtfields(){
	document.getElementById('idInput').value = ''

}
//   "id": "ac-3",
//   "month": 12,
//   "day": 5,
//   "year": 2020,
//   "hour": 5,
//   "minute": 10


function HandleAddSignIn(){

    const year =  parseInt(date.substring(0, 4));
    const month =  parseInt(date.substring(5, 7));
    const day =  parseInt(date.substring(8, 10));
    const hour =  parseInt(date.substring(11, 13));
    const minute =  parseInt(date.substring(14, 16));
    const memberID = IdRef.current.value

    console.log("memberID")
    console.log(memberID)
    const body={id:memberID,
        year:year, month:month , day:day, hour:hour ,
        minute:minute
     }
     console.log("body")
    console.log(body)

   axios   
   .post('http://localhost:8000/hr/addSignIn', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>
    console.log(res.data));

console.log(document.getElementById('dateInput').value)

    axios   
    .post('http://localhost:8000/hr/viewAttendanceRec', {id: memberID}, { headers: { 'token': localStorage.getItem('token') } })
    .then(res=>
    setRecord(res.data));
console.log(record)

   ClearTxtfields()

}



  return (

    <div className="addStaff">		


					<span className="login100-form-title">
						Add SignIn
					</span>


                    <div>
						<input required={true} ref={IdRef} className="input100" id="idInput" placeholder="Staff Member ID ac-xx hr-xx"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>

          

                    <label for="start">Start date:</label>

                    <input type="datetime-local"  id="dateInput" name="trip-start"
                        value="2021-01-01" 
                        min="2020-01-01" max="2021-12-31" onChange={HandleDate}/>

					{/* <div >
					<label >Year: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseYear}>
                        <option value="">Choose Year</option>
						<option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                        <br/><br/>
					</div>

                    <label >Month: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseYear}>
                        <option value="">Choose Month</option>
						<option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                        <br/><br/>
					</div>
       
					<div >
					<label >Day: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseDay}>
                        <option value="">Choose Day </option>
						<option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option> */}
                        

					 
					<div className="container-login100-form-btn">
                    <button onClick={HandleAddSignIn} className="login100-form-btn">
							Add SignIn Record
						</button>
					</div>

                <div>   
                <ul >
                {record.map((item, i) => {
                return <li key={i}>
                <ul> signIn: {item.signInTime} </ul>
                <br/>
                </li>
                })}
                </ul>
                </div>  

	    </div>

	

  )
}
