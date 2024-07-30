import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [addedTasks, setAddedTasks] = useState([]);
  const [showFinish, setShowFinish] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Not to lose data on reload.
  useEffect(() => {
    const taskString = localStorage.getItem("addedTasks");
    if (taskString) {
      const loadedTasks = JSON.parse(taskString);
      setAddedTasks(loadedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever addedTasks changes.
  useEffect(() => {
    localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
  }, [addedTasks]);

  // To add a new task or save an edited task.
  const handleAddOrSave = () => {
    if (isEditing) {
      setAddedTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === editId ? { ...item, task } : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setAddedTasks((prevTasks) => [
        ...prevTasks,
        { id: uuidv4(), task, isCompleted: false },
      ]);
    }
    setTask("");
  };

  // To empty input field after the task is added.
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  // To check-out the completed tasks.
  const handleCheckBox = (event) => {
    const id = event.target.name;
    setAddedTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  // Delete the task permanently.
  const handleDelete = (id) => {
    setAddedTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  // Edit the selected task.
  const handleEdit = (id) => {
    const taskToEdit = addedTasks.find((item) => item.id === id);
    setTask(taskToEdit.task);
    setIsEditing(true);
    setEditId(id);
  };

  // Toggle showing finished tasks.
  const toggleFinish = () => {
    setShowFinish(!showFinish);
  };

  // Handle search term change.
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered tasks based on search term and showFinish flag.
  const filteredTasks = addedTasks.filter((item) =>
    item.task.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (showFinish || !item.isCompleted)
  );

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
              onClick={handleAddOrSave}
              disabled={task.length < 3}
              className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-7 disabled:bg-disable"
            >
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
          <div className="my-4">
            <input
              onChange={handleSearchChange}
              value={searchTerm}
              type="text"
              placeholder="Search tasks..."
              className="w-1/3 p-2"
            />
          </div>
          <input
            onChange={toggleFinish}
            type="checkbox"
            checked={showFinish}
          />
          <label htmlFor=""> Show completed</label>
          <h2 className="text-xl font-semibold my-5">Your Tasks</h2>

          <div className="todos">
            {filteredTasks.length === 0 && (
              <div className="m-4">No Tasks to display</div>
            )}

            {/* To map all the added tasks and display them in your task section */}
            {filteredTasks.map(
              (item) => (
                <div key={item.id} className="todo flex justify-between my-2">
                  <div className="flex gap-3 ">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
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
                      onClick={() => handleDelete(item.id)}
                      className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
