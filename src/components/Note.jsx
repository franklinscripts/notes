import { useState } from 'react'
import './Note.css'

const Note = ({ note , toggleImportant}) => {
  const label = note.important ? 'Make not important' : 'Make important'
  return (
    <div className='container'>
    <li>{note.content}</li>
    <button onClick={toggleImportant} style={{backgroundColor: `${note.important ? '#1270ebe8' : '#af320c'} `}}>{label}</button>
    </div>
  )
}

export default Note