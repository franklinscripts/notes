import { useEffect, useState } from 'react'
import Note from './components/Note'
import axios from 'axios';
import noteServices from './services/notes'
import './App.css'
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
  
    const newObj = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
      noteServices.create(newObj)
      .then(res =>{ setNotes(notes.concat(res))  
      setNewNote('')}); 
    console.log('button clicked', event.target)
  }
  const handleChange = (event) => {
    event.preventDefault();
    setNewNote(event.target.value)

    
  }
  const handleShowAll = showAll ? notes : notes.filter(note => note.important === true)
  console.log(handleShowAll)

  useEffect(() => {
    console.log('Component mounted');
    noteServices.getAll()
    .then((initialState) => {
        if (Array.isArray(initialState)) {
          setNotes(initialState);
        }
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const toggleImportant = id => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important}
    noteServices.update(id, changeNote)
    .then(res => {
      setNotes(notes.map(n => n.id !== id ? n : res))
    })
    .catch(err => {
      alert(` The note ${note.content} was already deleted from server`)
    })
    setNotes(notes.filter(n => n.id !== id))
    console.log('note change')
  }
  return (
    <div className='note-container'>
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
        <button onClick={() => setShowAll(!showAll)}>
          show {!showAll ? 'important': 'all'}

        </button>
      </form>   
      <div>
      </div>
      <ul>
        {handleShowAll.map(note => 
          <Note key={note.id} note={note} toggleImportant={() => toggleImportant(note.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App