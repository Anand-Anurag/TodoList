import { useState, useEffect } from 'react'
import Header from './components/header'
import Tasks from './components/tasks'
import AddTask from './components/addTask'
import About from './components/About'
import './App.css'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }
  
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task));
  }

  const dropDown = () => {
    setShowAddTask(!showAddTask)
  }

  return (
      <div className="App">
        < Header onAdd={ dropDown } showAdd={ showAddTask } />
        { showAddTask && < AddTask onAdd={ addTask } /> }
        { tasks.length ? < Tasks className={'allTasks'} tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : <p>No Tasks to Show</p> }
        < About />
      </div>
  );
}

export default App;
