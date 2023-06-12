import {useState, useEffect} from 'react'
const API_BASE = process.env.REACT_APP_API_URL

console.log(process.env.REACT_APP_API_URL)

function App() {
  const [tasks, setTasks] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newTask, setNewTask] = useState("")

  console.log("connected to: " + API_BASE)

  useEffect(() => {
    GetTasks();
  }, [])

  const GetTasks = () => {
    fetch(API_BASE + "/checklists")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error: ", err))
  }

  const completeTask = async id => {
    const data = await fetch(API_BASE + "/checklist/complete/" + id)
      .then(res => res.json())

    setTasks(tasks => tasks.map(task => {
      if (task._id === data._id){
        task.complete = data.complete
      }

      return task
    }))
  }

  const deleteTask = async id => {
    console.log(id)
    const data = await fetch(API_BASE + "/checklist/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json())

    setTasks(tasks => tasks.filter(task => 
      task._id !== data._id))
  }

  const addTask = async () => {
    console.log("awaiting fetch from " + API_BASE)
    const data = await fetch(API_BASE + "/checklist/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTask
      })
    }).then(res => res.json())

    setTasks([...tasks, data])
    setPopupActive(false)
    setNewTask("")
  }

  return (
    <div className="App">
      <h1>Checklist - MERN</h1>
      <h4>Your tasks</h4>

      <div className="checklists">
        {tasks.map(task=>(
          <div className={"task " + (task.complete ? "is-complete" : "")}
           key={task._id}>
            <div className="checkbox" onClick={() => completeTask(task._id)}></div>
            <div className="text">{task.text}</div>
            <div className="delete-task" 
              onClick={() => deleteTask(task._id)}>✕</div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
      
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => 
            setPopupActive(false)}>✕
          </div>
          <div className='content'>
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-task-input"
              onChange={e => setNewTask(e.target.value)}
              value = {newTask}
            />
            <div className="button" onClick={addTask}>Create Task</div>
          </div>
        </div>
      ) : ''}
      
    </div>
  );
}

export default App;
