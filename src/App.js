//import logo from './logo.svg';
import './App.css';
import { useState } from 'react'


function App() {

  //default tasks
  const defaultTasks = [
  { status: "active", task: 'Create Theme' },
  { status: "active", task: 'Work on WordPress' },
  { status: "active", task: 'Organize office main department' },
  { status: "active", task: 'Error solve in HTML template' }];

  //hooks for new tasks
  const [taskList, setTaskList] = useState(defaultTasks);
  const [typedTask, setTypedTask] = useState("");

  // hook for status based conditional rendering
  const [show, setShow] = useState("all");

  return (
    <div className="App">
      <h1>Here's your TODO List</h1>
      <div className="addTask-grid">
        <div className="addTask">
          <input placeholder="Enter the TASK" value={typedTask} onChange={(event) => setTypedTask(event.currentTarget.value)} />
          <button className="button" onClick={() => { 
            if(typedTask !== "") { 
              setTaskList([...taskList, {status: "active", task: typedTask}]);
              setTypedTask("");
            } else {
              alert("Enter task to add"); 
            }
          }}>Add</button>
        </div>
      </div>
      <div className="status-and-tasks-grid">
        <div className="taskStatus">
          <button onClick={() => { setShow("all") }}>All</button>
          <button onClick={() => { setShow("active") }}>Active</button>
          <button onClick={() => { setShow("completed") }}>Completed</button>
        </div>
        <div className="tasks">
          {taskList.map(({status, task}, index)=>{
            if(show === "all" || show === status) {
              return (
                <Task id={index} status={status} task={task} updateTaskList={setTaskList} />
              )
            } else {
              return <></>
            }
          })}
        </div>
      </div>
    </div>
  );
}

//function to render the tasks
function Task({ status, task, id, updateTaskList }) {

  const removeTask = (id) => {
    updateTaskList((taskList)=> taskList.filter((task, index) => index !== id));
  };
  
  const updateTaskStatus = (id, updatedStatus) => {
    updateTaskList((taskList)=> taskList.map((task, index) => {
        if(index === id) {
          task.status = updatedStatus;
        }
        return task;
      })
    );
  };

  console.log("rendering");

  return (
    <>
      { <div className='task'>
          <input type="checkbox" checked={status === "completed"} onChange={(e) => {
            if (e.currentTarget.checked) {
              updateTaskStatus(id, "completed");
            } else {
              updateTaskStatus(id, "active");
            }
          }} />

          {(status === "completed") 
            ? <span><strike>{task}</strike></span> 
            : <span>{task}</span>}

          <button onClick={() => removeTask(id)}>Remove</button>

        </div>
      }
    </>
  );

}





export default App;
