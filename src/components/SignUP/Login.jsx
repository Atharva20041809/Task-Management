import React from 'react'
import '../../styles/Login.css'
import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react';
const Login = () => {
  const navigate=useNavigate();
  let [userdata,setuserdata]=useState({email:'',password:''});
  function handelemail(event){
    let newobj={...userdata}
    newobj.email=event.target.value 
    setuserdata(newobj)
  }
  function handelpassword(event){
    let newobj={...userdata}
    newobj.password=event.target.value 
    setuserdata(newobj)
  }
  function handelclick(event){
    event.preventDefault();
    if(userdata.password.length==0 || userdata.email.length==0){
      alert("Please fill the details properly")
    }else{
      let users=JSON.parse(localStorage.getItem("users"))
      let founduser=users.find((ele)=>{
        return ele.email==userdata.email && ele.password==userdata.password
      })
      if(founduser){
        localStorage.setItem("currentUser", JSON.stringify(founduser));
        navigate('/home')
      }else{
        alert("No user such user exist")
      }
    }
  }
  return (
    <div className='login'>
      <form>
        <h2>Login</h2>
        <input type="email" placeholder='Email' onChange={handelemail}/>
        <input type="password" placeholder='Password' onChange={handelpassword}/>
        <button onClick={handelclick}>
          Login
        </button>
        <div className='login-toggle'>
          Don't have an account? <NavLink to='/'>Sign Up</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login