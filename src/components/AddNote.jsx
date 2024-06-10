import React, { useState } from 'react'

const AddNote = ({getNotes}) => {
    const [note,setNote] = useState('');
    const addNoteHandler = async(e) => {console.log("first")
        e.preventDefault();
        if(note.trim().length === 0){
            alert('Enter a valid note.');
        }else{
            try {
                await fetch('https://firenote-56ecc-default-rtdb.firebaseio.com/notes.json',{
                    method:'POST',
                    body: JSON.stringify(note),
                    headers: {
                        "Content-Type" : "application/json"
                    }
                });
                setNote('')
                getNotes();
            } catch(error) {
                alert('Something went wrong! Please try later.')
            }
        }
    }
  return (
    <section>
        <form className='card' onSubmit={addNoteHandler}>
            <input type='text' 
                    placeholder='Add not here' 
                    value={note}
                    onChange={e=>setNote(e.target.value)}
                    className='w-full mr-3 py-3 px-2 text-lg ring-0 focus:outline-none rounded-lg bg-white'/>
            <button type='submit' className='px-4 py-3 bg-white text-blue-400 rounded-lg text-lg font-bold'>Add</button>
        </form>
    </section>
  )
}

export default AddNote