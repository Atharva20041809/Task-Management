import React, { useState } from 'react'
import '../../styles/Addtask.css'
import TaskForm from './TaskForm'

const Addtask = (props) => {
  function getCurrentDateTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60 * 1000);
    return localTime.toISOString().slice(0, 16);
  }
  let [taskdetails,settaskdetails]=useState({title:props.title,description:props.description,dueDate:props.dueDate,priority:props.priority,state:false,edit:false})


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
  function handeledit(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks[props.index].edit=true;
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    props.update()
  }
  function handelchange(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks[props.index]=taskdetails;
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    props.update()
  }
  function handelremove(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks=currentUser.tasks.filter((ele,idx)=>{return idx!=props.index})
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    props.update()
  }
  function handelcheckbox(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    currentUser.tasks[props.index].state=!currentUser.tasks[props.index].state
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    props.update()
  }



























  if (props.edit==true){
    return <div className='taskform-tasks'>
      <form action="">
        <label>Title</label><input type="text" placeholder='Enter your tasks name' onChange={handeltitle} defaultValue={props.title}/>
        <label>Description</label><input type="text" placeholder='Details about the task' onChange={hadeldescription} defaultValue={props.description}/>
        <label >Due Date:</label><input type="datetime-local" onChange={handelduedate} defaultValue={props.dueDate}/>
        <label>Priority</label>
        <label ><input type='radio' name='priority' value='high' onChange={handelpriority} defaultChecked={props.priority=="high"}/>High</label>
        <label ><input type='radio' name='priority'  value='medium' onChange={handelpriority} defaultChecked={props.priority=="medium"}/>Medium</label>
        <label ><input type='radio' name='priority'  value='low' onChange={handelpriority} defaultChecked={props.priority=="low"}/>Low</label>
      </form>
      <div className='btn'>
        <button onClick={handelchange}>
          Change
        </button>
      </div>
    </div>
  }else{
    return (
      <div className='task'>
        <h1>{props.title}
          <div>
          <button className='edit' onClick={handeledit}>
          Edit
        </button>
        <button className='delete' onClick={handelremove}>
          Remove
        </button>
          </div>
        
        </h1>
        <p>Description: {props.description}</p>
        <div className='date'>
        <p>
          Due Date: {(new Date(props.dueDate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{" "}
          {(new Date(props.dueDate)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        </div>
        <div className={props.priority}>
        Priority: {props.priority}
        </div>
        {/* {new Date(props.dueDate)<new Date()? "Missed":null} */}
        <div className={props.state ? "status completed" : "status inprogress"}>
          {props.state?"Completed":"In Progress"}
          <input type="checkbox" checked={props.state} onChange={handelcheckbox} />
        </div>
      </div>
    )
  }
}
export default Addtask