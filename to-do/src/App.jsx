import { useState } from 'react';
import Navbar from './component/Navbar';


function App() {
  const[task, setTask] = useState("");
  const[addedTaks, setAddedTasks] = useState([]);
  
  //To add a new task.
  const handleAdd = () => {
    setAddedTasks([...addedTaks, {task, isCompleted: false}]);
    setTask("")
  }

  //To empty input field after the task is added.
  const handleChange = (work) => {
    setTask(work.target.value);
  }

  return (
    <>
    <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-5 bg-violet min-h-screen'>
        <div className=''>
          <div className="addToDo">
            <h2 className='text-xl font-semibold my-1'>Add a Task</h2>
            <input onChange={handleChange} value={task} type="text" className='w-1/3'/>
            <button onClick={handleAdd} className='bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-7'>Add</button>
          </div>
          <h2 className='text-xl font-semibold my-5'>Your Tasks</h2>

          <div className="todos">
            <div className="todo flex">
              <div className="text">My Tasks </div>
                <div className="buttons">
                  <button className='bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2'>Edit</button>
                  <button className='bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2'>Delete</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
