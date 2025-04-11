import React from 'react'
import '../../styles/Home.css'
import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react';
import TaskForm from '../TASK/TaskForm';
const Home = ({taskList,setTaskList}) => {
  let [show,setshow]=useState(false)
  let navigate=useNavigate();
  return (
    <div className='home'>
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
      <div className='main'>
        <div className='facilities'>
          <button className="addtask" onClick={()=>{setshow(true)}}>
            <div className='plus-sign'>+</div>
            <span>
              Add Task
            </span>
          </button>
          <button className="start-pomodoro" onClick={()=>{navigate('/pomodoro')}}>
          <div className='play-sign'>▶</div>
            <span>
              Start Pomodoro
            </span>
          </button>
        </div>


        {show? <TaskForm taskList={taskList} setTaskList={setTaskList} show={show} setshow={setshow}/>:null}
        <div className='first-video'>
          {/* <div className='title'>1.How to add Task</div> */}
            <video controls autoPlay muted loop > 
              <source src='./addtaskvid.mp4' type='video/mp4' />
            </video>
        </div>
        <div className='second-video'>
          {/* <div className='title'>2.How to start Pomodoro</div> */}
          <video controls autoPlay muted loop> 
              <source src='./startpomodoro.mp4' type='video/mp4'/>
            </video>
        </div>
      </div>
    </div>
  )
}

export default Home