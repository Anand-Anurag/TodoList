import React from 'react'
import Button from './button'

const header = ({onAdd, showAdd}) => {
  return (
    <header>
      <h1 style={{ display: 'inline-block', margin: '0 1rem' }}>Task Tracker</h1>
      < Button text={ !showAdd ? 'Add' : 'Close' } color={ !showAdd ? 'rgb(60, 255, 0)' : 'red' } onClick={onAdd}/>
    </header>
  )
}

export default header