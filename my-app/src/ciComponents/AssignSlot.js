import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
export default function AssignSlot() {
    const memberIDRef=useRef()
   // const slotIDRef=useRef()
   const [slots, setSlots] = useState([])
   const [chosenSlot, setChosenSlot] = useState()
   const [message, setMessage] = useState("")
   async function HandleSlots(e) {
       await setChosenSlot(e.target.value)
       //console.log(Location)
   }
  function HandleAssSlot(){
    const body={memberID:memberIDRef.current.value, numberID:chosenSlot  }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/ci/assignSlots', body, {headers:{'token':localStorage.getItem('token')}})
   
   .then(res=>setMessage(res.data));
   // callAPI()
}
axios
.get('http://localhost:8000/ci/loadSlots', {headers:{'token':localStorage.getItem('token')}})
.then(res => {
    setSlots(res.data)
    //console.log(res.data)

});
  return (
    <>
        <div >
            <div className="assignSlot">


                <span className="login100-form-title">
                    Assign Slot
      </span>


                <div>
                    <input required={true} ref={memberIDRef} className="input100" name="memberID" placeholder="Member ID" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>
                <br></br>
          <br></br>
          <label className='textDown'>Choose a Slot: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleSlots}>
                        <option value="">Choose a Slot</option>
                        {slots.map(item => (<>
                        {item.map(s =>(
                        <option key={s.numberID} value={s.numberID}>{s.numberID}</option>
                        ))}
                      </>
                        ))}
                  
                    </select>
                   
                {/* <div>
                    <input required={true} ref={slotIDRef} className="input100" name="numberID" placeholder="Slot ID" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div> */}
            </div>
            <br></br>
          <br></br>
          <r1> {message}</r1>
          <br></br>
          <br></br>
          <br></br>
            <div className="buttons">
                <button onClick={HandleAssSlot} className="buttons">
                    Assign Slot
        </button>
            </div>

        </div>

    </>
)

}

