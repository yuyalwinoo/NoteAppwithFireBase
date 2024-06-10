import { useEffect, useState } from 'react'
import './App.css'
import AddNote from './components/AddNote'
import Note from './components/Note'
import Navbar from './components/Navbar'
import Intro from './components/Intro'

function App() {
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{
    getNotes();
  },[])
  const getNotes = async()=>{
    setLoading(true);
    try {
      const response = await fetch('https://firenote-56ecc-default-rtdb.firebaseio.com/notes.json');
      
      if(!response.ok){
        throw new Error ('Cannot connect to Firebase!')
      }
      const notesObj = await response.json();
      
      const modifiedNote = [];

      for(const key in notesObj)
      {
        modifiedNote.push({
          id : key,
          note : notesObj[key]
        });
      }

      setNotes(modifiedNote);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar getNotes={getNotes}/>
      {
        loading && !error && <p className='text-center font-semibold text-xl my-4'>Loading ...</p>
      }
      {
        error && !loading && <p className='text-center font-semibold text-red-500 my-4'>{error}</p>
      }
      {
        !loading && !error && (
          <>
          
            <AddNote getNotes={getNotes}/>
           {
              notes.length > 0 ?
              <>
                <p className='text-slate-400 text-sm font-semibold card bg-white justify-end my-2 p-3'>Total rows - {notes.length}</p>
                {
                  notes.map((note)=>{
                    return(
                      <Note key={note.id} note={note} getNotes={getNotes}/>
                    )
                  })
                }
              </>
              
             : <Intro/>
            }
          </>
        )
      }
      
    </>
  )
}

export default App
