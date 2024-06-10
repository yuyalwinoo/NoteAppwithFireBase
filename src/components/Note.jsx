import React from 'react'
import { FaTrash } from "react-icons/fa"

const Note = ({note,getNotes}) => {
    console.log("note")
    const {note:title,id} = note;
    const deleteNoteHandler = async()=>{
        try {
            const response = await fetch(`https://firenote-56ecc-default-rtdb.firebaseio.com/notes/${id}.json`,{
                method:'DELETE'
            });
            if(!response.ok){
                throw new Error('Failed to delete this note!')
            }
            getNotes();
        } catch(error){
            alert(error.message);
        }
    }
  return (
    <div className='card text-white'>
        <p>+ {title}</p>
        <button onClick={deleteNoteHandler}>
        <FaTrash />
        </button>
    </div>
  )
}

export default Note