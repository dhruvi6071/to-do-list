import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [addedTasks, setAddedTasks] = useState([]);
  const [showFinish, setShowFinish] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  // const [searchTask, setSearchTask] = useState("");

  const query = useQuery();
  const navigate = useNavigate();
  const searchTask = query.get("search") || "";

  //Not to lose data on reload.
  useEffect(() => {
    let taskString = localStorage.getItem("addedTasks");
    if (taskString) {
      let addedTasks = JSON.parse(localStorage.getItem("addedTasks"));
      setAddedTasks(addedTasks);
    }
  }, []);

  const saveTask = () => {
    localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
  };

  // To add a new task or save an edited task.
  const handleAddOrSave = () => {
    const timestamp = new Date().toLocaleString();
    if (isEdit) {
      setAddedTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === eventId ? { ...item, task, description, timestamp } : item
        )
      );
      setIsEdit(false);
      setEventId(null);
    } else {
      setAddedTasks((prevTasks) => [
        ...prevTasks,
        { id: uuidv4(), task,description, timestamp, isCompleted: false },
      ]);
    }
    setTask("");
    setDescription(""); // Clear description input box
    saveTask();
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
    saveTask();
  };
  // Handle task input change
  const handleChangeTask = (event) => {
    setTask(event.target.value);
  };

  // Handle description input change
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  //Delete the task permenantly
  const handleDelete = (word, id) => {
    let newAddedTask = addedTasks.filter((item) => {
      return item.id !== id;
    });

    setAddedTasks(newAddedTask);
    saveTask();
  };

  //Edit the selected task.
  const handleEdit = (id) => {
    const taskToEdit = addedTasks.find((item) => item.id === id);
    setTask(taskToEdit.task);
    setDescription(taskToEdit.description); // Load description into input box
    setIsEdit(true);
    setEventId(id);
  };

  //To see only remaining tasks.
  const toggleFinish = () => {
    setShowFinish(!showFinish);
  };

  // Handle search term change and update URL.
  const handleSearchChange = (event) => {
    const value = event.target.value;
    navigate(`?search=${value}`);
  };

  // Filtered tasks based on search term and showFinish flag.
  const filteredTasks = addedTasks.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTask.toLowerCase()) &&
      (showFinish || !item.isCompleted)
  );

  const toggleExpand = (id) => {
    setExpandedTask(expandedTask === id ? null : id);
  };

  // Given condition is applied to only show remaining tasks only.
  return (
    <>
      <Navbar />
      <div className="container mx-11 my-5 rounded-xl p-5 bg-violet min-h-screen">
        <div className="font-bold text-center text-3xl text-brown">
          {" "}
          To-do : Manage your tasks.{" "}
        </div>
        <div className="addToDo">
          <h2 className="text-xl  font-semibold my-5 text-brown">Add a Task</h2>
          <div className="">
          <input
            onChange={handleChangeTask}
            value={task}
            type="text"
            placeholder="Add task"
            className="w-1/3 p-3 rounded-md "
          />
          </div >
          <div className="mt-3">
          <input
            onChange={handleChangeDescription}
            value={description}
            type="text"
            placeholder="Description"
            className="w-1/3 p-3 rounded-md"
          />
          </div>
          <button
            onClick={handleAddOrSave}
            disabled={task.length < 3}
            className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-7 disabled:bg-disable mt-5 ml-1"
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
        <div className="my-4">
          <input
            onChange={handleSearchChange}
            value={searchTask}
            type="text"
            placeholder="Search tasks..."
            className="w-1/3 p-2"
          />
        </div>
        <input onChange={toggleFinish} type="checkbox" checked={showFinish} />
        <label htmlFor=""> Show completed</label>
        <h2 className="text-xl font-semibold mt-9 mb-2 text-brown">
          Your Tasks
        </h2>

        <div className="todos">
          {filteredTasks.length === 0 && (
            <div className="m-4">No Tasks to display</div>
          )}

          {/* To map all the added tasks and display them in your task section */}
          {filteredTasks.map((item) => {
            return (
              (showFinish || !item.isCompleted) && (
                <>
                  <div key={item.id} className="todo flex justify-between my-2">
                    <div className="flex gap-3 ">
                      <input
                        name={item.id}
                        onChange={handleCheckBox}
                        type="checkbox"
                        checked={item.isCompleted}
                      />
                      <div
                        className={`${
                          item.isCompleted ? "line-through" : ""
                        } cursor-pointer`}
                        onClick={() => toggleExpand(item.id)}
                      >
                        {item.task}
                      </div>
                    </div>

                    <div className="buttons flex">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(work) => handleDelete(work, item.id)}
                        className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {expandedTask === item.id && (
                    <div className="ml-8 mt-2 text-gray-700">
                      <div>Description: {item.description}</div>
                      <div>Last updated: {item.timestamp}</div>
                    </div>
                  )}
                </>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
