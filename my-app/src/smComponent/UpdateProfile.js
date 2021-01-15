import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [gender, setGender] = useState("")
    const [message, setMessage] = useState("")


    let history = useHistory()

    useEffect(() => {
        const checkToken = async () => {
            if (localStorage.getItem('token')) {
                console.log("TOKENS")

            }
            else {
                console.log("NOT TOKENS")
                history.push('/')

            }

        }
        checkToken()
    }, []);
    async function HandleGender(e) {
        await setGender(e.target.value)
        console.log(gender)
    }
    function HandleUpdate() {
        const body = { email: emailRef.current.value, password: passwordRef.current.value, gender: gender }
        //  console.log(body)

        axios
            .post('http://localhost:8000/updateProfile', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res => setMessage(res.data));
        // callAPI()
    }

    return (
        <>
            <div >
                <div className="updateProfile">


                    <span className="login100-form-title">
                        Update Profile
      </span>


                    <div>
                        <input required={true} ref={emailRef} className="input100" name="email" placeholder="Email" />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        </span>
                        <br />
                    </div>
                    <br></br>
                    <br></br>

                    <div>
                        <input required={true} ref={passwordRef} className="input100" name="password" placeholder="Password" />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        </span>
                        <br />
                    </div>
                </div>
                <label className='textDown'> Gender: </label>
                <select className='dropbtn' name="types" id="type" onChange={HandleGender}>
                    <option value="">Choose gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <br></br>
                <br></br>
                <r1> {message}</r1>
                <br></br>
                <br></br>
                <br></br>
                <div className="buttons">
                    <button onClick={HandleUpdate} className="buttons">
                        Update
        </button>
                </div>

            </div>

        </>
    )

}

