import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export function Signup() {
    const [username,setUsername]=useState("")
    const [password,setpassword]=useState("")
    const [firstName,setfirstName]=useState("")
    const [lastName,setlastName]=useState("")
    const [profession,setprofession]=useState("")

    const navigate=useNavigate()
  return (
    <div className='justify-center'>
      <input onChange={(e) => {
            setUsername(e.target.value);
        }} type="text" placeholder="username" /><br></br>
        <input onChange={(e) => {
            setpassword(e.target.value);
        }} type="password" placeholder="password" /><br></br>
        <input onChange={(e) => {
            setfirstName(e.target.value);
        }} type="firstName" placeholder="firstName" /><br></br>
        <input onChange={(e) => {
            setlastName(e.target.value);
        }} type="lastName" placeholder="lastName" /><br></br>
        <input onChange={(e) => {
            setprofession(e.target.value);
        }} type="profession" placeholder="profession" /><br></br>
        <button onClick={async () => {
            await axios.post("http://localhost:3000/signup", {
                username,
                password,
                firstName,
                lastName,
                profession
            });
        navigate("/BlogList")
        }}>Submit</button>
    </div>
  )
}
