import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from './components/HOME/Home';
import Pomodoro from './components/Pomodoro/Pomodoro';
import Login from './components/SignUP/Login';
import Signup from './components/SignUP/Signup';
import Tasks from './components/TASK/Tasks';
import TaskForm from './components/TASK/TaskForm';
import { useEffect, useState } from 'react';


function App() {
  useEffect(() => {
    const existingUsers = localStorage.getItem("users");
    if (!existingUsers) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);
  let [taskList, setTaskList] = useState([])
  const router = createBrowserRouter([
    {
      path: '/', element: <Signup />
    },
    {
      path: '/home', element: <Home taskList={taskList} setTaskList={setTaskList} />
    },
    {
      path: '/logout', element: <Login />
    },
    {
      path: '/pomodoro', element: <Pomodoro taskList={taskList} setTaskList={setTaskList} />
    },
    {
      path: '/tasks', element: <Tasks taskList={taskList} setTaskList={setTaskList} />
    },
    {
      path: '/taskform', element: <TaskForm taskList={taskList} setTaskList={setTaskList} />
    },
    {
      path: '*', element: <div>404 not found</div>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
