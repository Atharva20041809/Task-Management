import React from 'react'
import '../../styles/Pomodoro.css'
import { Link, NavLink } from 'react-router';
import { useEffect, useState } from 'react'
import Taskselection from './Taskselection';
import Timer from './Timer';

const Pomodoro = () => {
  let [selectask,setselectask]=useState(true)
  let [option,setoption]=useState(null)
  function update(){
    if (option===null){
      alert("Please select a task")
    }else{
      setselectask(!selectask)
    }
  }
  function settingoption(idx){
    setoption(idx)
  }
  return (
    <div className='container'>
      <div className="navbar">
        <h1>Task Management</h1>
        <ul className='routes'>
          <li>
            <NavLink to='/home'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>Tasks</NavLink>
          </li>
          <li>
            <NavLink to='/pomodoro'>Pomodoro</NavLink>
          </li>
          <li>
            <NavLink to='/logout' /* onClick={idhar handleLogout aayega} */ >Logout</NavLink>
          </li>
        </ul>
      </div>
    
    <div className="taskquery">
      {selectask? <Taskselection update={update} settingoption={settingoption}/>:<Timer update={update} option={option}/>}
    </div>
    </div>
  )
}

export default Pomodoro