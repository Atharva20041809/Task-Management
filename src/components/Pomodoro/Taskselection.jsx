import React, { useState } from 'react'

const Taskselection = (props) => {
    let currentUser=JSON.parse(localStorage.getItem("currentUser"))
    function handelcheck(idx){
        props.settingoption(idx)
    }
    function handelstart(){
        props.update()
    }
    if(currentUser.tasks.length==0){
        return <div className='no_task'>
            Please create few tasks to start pomodoro technique.
        </div>
    }else{
        return (
            <div className='taskcontainer'>
                <p>Please select a Task to start</p>
                {currentUser.tasks.map((ele,idx)=>{
                    return <div className='select_task'>
                        <label> <input type="radio" name="select" value={ele.title} onChange={()=>{handelcheck(idx)}}/>{ele.title}</label>
                    </div>
                })}
                <button onClick={handelstart}>Start</button>
            </div>
                )
        }
}

export default Taskselection