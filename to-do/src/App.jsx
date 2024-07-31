import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import TaskInput from "./component/TaskInput";
import TaskList from "./component/TaskList";
import SearchBar from "./component/SearchItem";

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

  const query = useQuery();
  const navigate = useNavigate();
  const searchTask = query.get("search") || "";

  useEffect(() => {
    const taskString = localStorage.getItem("addedTasks");
    if (taskString) {
      const loadedTasks = JSON.parse(taskString);
      setAddedTasks(loadedTasks);
    }
  }, []);

  const saveTask = () => {
    localStorage.setItem("addedTasks", JSON.stringify(addedTasks));
    console.log("Tasks saved:", addedTasks); // Debugging line
  };

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
        { id: uuidv4(), task, description, timestamp, isCompleted: false },
      ]);
    }
    setTask("");
    setDescription("");
    saveTask();
  };

  const handleCheckBox = (work) => {
    const id = work.target.name;
    const newAddedTasks = addedTasks.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setAddedTasks(newAddedTasks);
    saveTask();
  };

  const handleChangeTask = (event) => {
    setTask(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDelete = (id) => {
    const newAddedTasks = addedTasks.filter((item) => item.id !== id);
    setAddedTasks(newAddedTasks);
    saveTask();
  };

  const handleEdit = (id) => {
    const taskToEdit = addedTasks.find((item) => item.id === id);
    setTask(taskToEdit.task);
    setDescription(taskToEdit.description);
    setIsEdit(true);
    setEventId(id);
  };

  const toggleFinish = () => {
    setShowFinish(!showFinish);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    navigate(`?search=${value}`);
  };

  const filteredTasks = addedTasks.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTask.toLowerCase()) &&
      (showFinish || !item.isCompleted)
  );

  const toggleExpand = (id) => {
    setExpandedTask(expandedTask === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-11 my-5 rounded-xl p-5 bg-violet min-h-screen">
        <div className="font-bold text-center text-3xl text-brown">
          To-do : Manage your tasks.
        </div>
        <TaskInput
          task={task}
          description={description}
          handleChangeTask={handleChangeTask}
          handleChangeDescription={handleChangeDescription}
          handleAddOrSave={handleAddOrSave}
          isEdit={isEdit}
        />
        <SearchBar
          searchTask={searchTask}
          handleSearchChange={handleSearchChange}
          toggleFinish={toggleFinish}
          showFinish={showFinish}
        />
        <h2 className="text-xl font-semibold mt-9 mb-2 text-brown">Your Tasks</h2>
        <TaskList
          filteredTasks={filteredTasks}
          handleCheckBox={handleCheckBox}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleExpand={toggleExpand}
          expandedTask={expandedTask}
          showFinish={showFinish}
        />
      </div>
    </>
  );
}

export default App;
