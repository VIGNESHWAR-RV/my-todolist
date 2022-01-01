//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'


function App() {

  //default tasks
  const defaultTasks = [{check:false,task:'Create Theme'},
                      {check:false,task:'Work on WordPress'},
                      {check:false,task:'Organize office main department'},
                      {check:false,task:'Error solve in HTML template'}];
 
  //hooks for new tasks
  const [taskList,addTask] = useState(defaultTasks);  
  const [typedTask,adding]=useState({});
  
  //conditional rendering for conditional rendering
const [show,setShow] = useState(true);
const [show1,setShow1] = useState(false);
const [show2,setshow2] = useState(false);

 
//function to render the tasks
function Display({check , task , type , id , remove}){
  const [strike,striking] = useState(check);
  const style = {display:(strike)?"none":"block"};
  const style1 = {display:(strike)?"block":"none"};

  const removing=(id)=>{
      const removedList = taskList.filter((task,index)=>index!==id);
      remove(removedList);
  }


return(
  <div className="tasks">
 
        
   {(type==="filter") 
     ? (check===false)
           ?<div style={style} className="task">
               <input type="checkbox" onClick={()=>{striking(!strike); 
                                              for(let i in taskList){
                                                if(i === id){
                                                    taskList(i).check = true;
                                                }};}}/>
                <span>{task}</span>
            </div>
           : (check===true)
              ?<div style={style1} className="task">
                <input type="checkbox" defaultChecked onClick={()=>{striking(!strike); 
                                               for(let i in taskList){
                                                 if(i === id){
                                                  taskList(i).check = true;
                                                 }};}}/>
                 <span><strike>{task}</strike></span></div>
           :""
     :  (check)  
              ? <div classname="task"><input type="checkbox" defaultChecked onClick={()=>{striking(!strike); 
                                               for(let i in taskList){
                                                 if(i === id){
                                                  taskList(i).check = !strike;
                                                 }};}}/>
                {(strike)?<span><strike>{task}</strike></span>:<span>{task}</span>}
                <button onClick={()=>removing(id)}>Remove</button></div>
              : <div className="task"><input type="checkbox" onClick={()=>{striking(!strike); 
                                                 for(let i in taskList){
                                                 if(i === id){
                                                  taskList(i).check = !strike;
                                                 }};}}/>
               {(strike)?<span><strike>{task}</strike></span> :<span>{task}</span>}
               <button onClick={()=>removing(id)}>Remove</button></div>} 
  </div>);}

  return (
    <div className="App">
      <h1>Here's your TODO List</h1>
      <div className="addTask-grid">
      <div className="addTask">
       <input placeholder="Enter the TASK" onChange={(event)=>adding({check:false, task:(event.target.value)})}/>
       <button className="button" onClick={()=>{(typedTask.task!==undefined)?addTask([...taskList,typedTask]):alert("Enter task to add")}}>Add</button>
       </div>
      </div>
       <div className="status-and-tasks-grid">
         <div className="taskStatus">
       <button onClick={()=>{setShow(true);setShow1(false);setshow2(false)}}>All</button>
       <button onClick={()=>{setShow(false);setShow1(true);setshow2(false)}}>Active</button>
       <button onClick={()=>{setShow(false);setShow1(false);setshow2(true)}}>Completed</button>
         </div>
         {(show) ? (taskList.map(({check,task},index)=><Display key={index} id={index} check={check} task={task} remove={addTask} type="All" />)) : ""}

         {(show1) ? (taskList.filter((task)=>{return(task.check===false)}).map(({task,check},index)=><Display key={index} check={check} task={task} type="filter" />)) :""}
         
         {(show2) ? (taskList.filter((task)=>{return(task.check===true)}).map(({task,check},index)=><Display key={index} check={check} task={task} type="filter"/>)) :""}
       </div>
    </div>
  );
}




export default App;
