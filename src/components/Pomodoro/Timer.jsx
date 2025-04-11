import React from 'react'
import { useEffect, useState } from 'react';
const Timer = (props) => {
    let currentUser=JSON.parse(localStorage.getItem("currentUser"))
    function handelclick(){
        props.update()
    }
    const [secondsLeft, setSecondsLeft] = useState(1500); // 25 minutes in seconds
    let [pause,setpause]=useState(false)
    let a;
    useEffect(()=>{
        if(pause){
            clearTimeout(a)
        }else{
        a=setTimeout(()=>{
            if(secondsLeft!=0){
                setSecondsLeft(secondsLeft-1)
            }
        },1000)
        }
    },[secondsLeft,pause])
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
  return (
    <div className='timer'>
        {currentUser.tasks[props.option].title}
        <div className='content'>
        <h1>{formatTime(secondsLeft)}</h1>
        <button className={pause} onClick={()=>{setpause(!pause)}}>{pause? "Resume":"Pause"}</button>
        <button onClick={handelclick}>Reset</button>
        </div>
    </div>
  )
}

export default Timer