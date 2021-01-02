import React,{useRef} from 'react'
import axios from 'axios'
export default function AssignSlot() {
    const memberIDRef=useRef()
    const slotIDRef=useRef()

  function HandleAssSlot(){
    const body={memberID:memberIDRef.current.value, numberID:slotIDRef.current.value  }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/ci/assignSlots', body)
   
   .then(res=>console.log(res.data));
   // callAPI()
}

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


                <div>
                    <input required={true} ref={slotIDRef} className="input100" name="numberID" placeholder="Slot ID" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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

