import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
     axios.get("http://localhost:3000/api/notes").then((response)=>{
    console.log(response);
    
    setNotes(response.data.notes)
  })
  }
 
  useEffect(()=>{
    fetchNotes()
  },[])

 const handleSUbmit = (e) => {
  e.preventDefault();

  const { title, description } = e.target.elements;

  axios.post("http://localhost:3000/api/notes", {
    title: title.value,
    description: description.value
  }).then((response) => {
    console.log(response.data);
    fetchNotes();
    e.target.reset(); // optional but clean UX
  }).catch(err => {
    console.log(err);
  })
}

const handleDelete = (noteId) => { 
  console.log(noteId);
  axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((response) => {
    console.log(response.data);
    fetchNotes();
    
  })
 
}

const handleEdit = (note) => {
  const newDescription = prompt("Enter new description", note.description);

  if (!newDescription) {
    console.log("No description entered");
    return;
  }

  axios.patch(`http://localhost:3000/api/notes/${note._id}`, {
    description: newDescription
  })
  .then((response) => {
    console.log("PATCH RESPONSE 👉", response.data);
    fetchNotes();
  })
  .catch(err => {
    console.log("PATCH ERROR 👉", err);
  });
};
  return (
    <>
    <form className='note-create-form' onSubmit={handleSUbmit}>
      <input type="text" name='title' placeholder="Enter note title" />
      <input type="text" name='description' placeholder="Enter note description" />
      <button>submit</button>
    </form>
      <div className="notes">
      {
        notes.map((note ,index) => {
          return (
             <div className="note" key={index}>
          <h1>{note.title}</h1>
          <p>{note.description}
          </p>
          <button onClick={() => {handleDelete(note._id)}}>Delete</button>
          <button onClick={()=>handleEdit(note)}>edit Title</button>
        </div>
          )
        })
      }
       
      </div>
    </>
  )
}

export default App