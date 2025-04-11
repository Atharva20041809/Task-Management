import React, { useEffect } from 'react'
import '../../styles/Taskform.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
const TaskForm = (props) => {

  function getCurrentDateTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60 * 1000);
    return localTime.toISOString().slice(0, 16);
  }
  let [taskdetails,settaskdetails]=useState({title:"",description:"",dueDate:getCurrentDateTime(),priority:"",state:false,edit:false})
  let navigate=useNavigate();
  function handeltitle(event){
    let newobj={...taskdetails}
    newobj.title=event.target.value.trim()
    settaskdetails(newobj)
  }
  function hadeldescription(event){
    let newobj={...taskdetails}
    newobj.description=event.target.value.trim()
    settaskdetails(newobj)
  }
  function handelduedate(event){
    let newobj={...taskdetails}
    newobj.dueDate=event.target.value
    settaskdetails(newobj)
  }
  function handelpriority(event){
    let newobj={...taskdetails}
    newobj.priority=event.target.value
    settaskdetails(newobj)
  }
  function handelclick(event){
    if (!taskdetails.title || !taskdetails.description || !taskdetails.priority) {
      alert("Please fill in details correctly");
    }else{
      props.setshow(false)
      let currentUser=JSON.parse(localStorage.getItem("currentUser"));
      currentUser.tasks.push(taskdetails)
      localStorage.setItem("currentUser",JSON.stringify(currentUser))
      console.log(JSON.parse(localStorage.getItem("currentUser")))
      if (!props.taskList){
        console.log(currentUser)
        props.update()
      }
      navigate('/tasks')
      // At this step the data of taskList must have been changed and the in Tasks section the updated taskList must get render.
      // We have used the useEffect, but issue wasn't resolved
    }
  }
  
  return (
    <div className='taskform'>
      <form action="">
        <label>Title</label><input type="text" placeholder='Enter your tasks name' onChange={handeltitle} />
        <label>Description</label><input type="text" placeholder='Details about the task' onChange={hadeldescription}/>
        <label >Due Date:</label><input type="datetime-local" defaultValue={getCurrentDateTime()} onChange={handelduedate} />
        <label>Priority</label>
        <label ><input type='radio' name='priority' value='high' onChange={handelpriority}/>High</label>
        <label ><input type='radio' name='priority'  value='medium' onChange={handelpriority}/>Medium</label>
        <label ><input type='radio' name='priority'  value='low' onChange={handelpriority}/>Low</label>
      </form>
      <div className='btn'>
        <button onClick={handelclick}>
          Create
        </button>
      </div>
    </div>
  )
}

export default TaskForm