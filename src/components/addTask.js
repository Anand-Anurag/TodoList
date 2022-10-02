import React from 'react'
import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text) {
      alert("Please Add a Task")
      return
    }
    console.log(text)
    onAdd({ text, day, reminder })
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <div className='flex'>
      <div className='form-class'>
      <form className='add-form' onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="task">Task :</label>
          <input type="text" id='task' placeholder='Add Task' value={text} onChange={ (e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="day">Day :</label>
          <input type="text" id='day' placeholder='Date' value={day} onChange={ (e) => setDay(e.target.value)} />
        </div>
        <div className="form-control flex">
          <label>Set Reminder :</label>
          <input type="checkbox" checked={reminder} value={reminder} onChange={ (e) => setReminder(e.currentTarget.checked)} />
        </div>
        <button type="submit" value='Save Task' className='btn btn-block'>Add</button>
      </form>
    </div>
    </div>
  )
}

export default AddTask