import { useState } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [addedTasks, setAddedTasks] = useState([]);

  //To add a new task.
  const handleAdd = () => {
    setAddedTasks([...addedTasks, { id: uuidv4(), task, isCompleted: false }]);
    setTask("");
  };

  //To empty input field after the task is added.
  const handleChange = (work) => {
    setTask(work.target.value);
  };

  //To check-out the completed tasks.
  const handleCheckBox = (work) => {
    let id = work.target.name;

    let index = addedTasks.findIndex((item) => {
      return item.id === id;
    });

    //It is must to get a new array and set checked tasks.
    let newAddedTask = [...addedTasks]; 

    //To toggle the completed task for line-through component.
    newAddedTask[index].isCompleted = !newAddedTask[index].isCompleted;
    
    setAddedTasks(newAddedTask);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet min-h-screen">
        <div className="">
          <div className="addToDo">
            <h2 className="text-xl font-semibold my-1">Add a Task</h2>
            <input
              onChange={handleChange}
              value={task}
              type="text"
              className="w-1/3"
            />
            <button
              onClick={handleAdd}
              className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-7"
            >
              Add
            </button>
          </div>
          <h2 className="text-xl font-semibold my-5">Your Tasks</h2>

          <div className="todos">
            {/* To map all the added tasks and display them in your task section */}
            {addedTasks.map((item) => {
              return (
                <>
                  <div key={item.id} className="todo flex justify-between my-2">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      value={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.task}{" "}
                    </div>
                    <div className="buttons">
                      <button className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2">
                        Edit
                      </button>
                      <button className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2">
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
