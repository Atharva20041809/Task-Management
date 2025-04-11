import React, { useEffect, useState } from 'react'
import '../../styles/Tasks.css'
import { Link, NavLink } from 'react-router';
import Addtask from './Addtask';
import TaskForm from './TaskForm';
const Tasks = (props) => {
  let [data,setdata]=useState([]);
  let [show,setshow]=useState(false)
  function updateUsersInLocalStorage(currentUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.username === currentUser.username);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
    } else {
      users.push(currentUser);
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  function update(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    setdata(currentUser.tasks)
    updateUsersInLocalStorage(currentUser)
  }
  useEffect(update,[])
  function handelallbutton(){
    update()
  }
  function handelpendingbutton(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    setdata(currentUser.tasks.filter((ele)=>{return !ele.state}))

  }
  function handelcompletedbutton(){
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    setdata(currentUser.tasks.filter((ele)=>{return ele.state}))
  }
  function sortbyNone(){
    update()
  }
  function sortByPriority() {
    const priorityOrder = {
      "high": 3,
      "medium": 2,
      "low": 1
    };
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    let sorted_arr= [...currentUser.tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    setdata(sorted_arr);
  }
  function sortByDueDate() {
    let currentUser=JSON.parse(localStorage.getItem("currentUser"));
    const sortedData = [...currentUser.tasks].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    setdata(sortedData);
  }
  function handelsorting(event){
    let currentUser=localStorage.getItem("currentUser")
    if (event.target.value==="priority"){
      sortByPriority()
    }else if(event.target.value==="duedate"){
      sortByDueDate()
    }else{
      sortbyNone()
    }
  }
  return (
    <div>
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
      <div className='button_container'>
        <button onClick={handelallbutton}>All</button>
        <button onClick={handelpendingbutton}>Pending</button>
        <button onClick={handelcompletedbutton}>Compeleted</button>
        <label>Sort by:</label>
        <select name="sorting" onChange={handelsorting} >
          <option value="none">None</option>
          <option value="priority">Priority</option>
          <option value="duedate">Due Date</option>
        </select>
      <button onClick={()=>{setshow(true)}}>Add Task</button>
      </div>
      {show? <TaskForm setshow={setshow} update={update}/>:null}

      <div className='tasks_container'>
      {data.length==0? "There is no such tasks":null}
      {data.map((ele, idx) => {
        const fullTaskList = JSON.parse(localStorage.getItem("currentUser")).tasks;
        const actualIndex = fullTaskList.findIndex(
          (task) => task.title === ele.title && task.description === ele.description && task.dueDate === ele.dueDate
        );
        return <Addtask title={ele.title} description={ele.description} dueDate={ele.dueDate} priority={ele.priority} edit={ele.edit} index={actualIndex} state={ele.state} update={update}/>
      }
      )}
      </div>
    </div>
  )
}
export default Tasks