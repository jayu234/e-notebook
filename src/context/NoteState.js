import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const initialState = [];
  const [notes, setNotes] = useState(initialState);

  //Fetch all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Acess-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      }
    });
    const allNotes = await response.json();
    // console.log(allNotes);
    setNotes(allNotes);
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: 'POST',
      headers: {
        'Acess-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ title, description, tag })
    });

    // const json = response.json();
    // let note = {
    //   "_id": "",
    //   "user": "",
    //   "title": "",
    //   "description": "",
    //   "tag": "",
    //   "date": "",
    //   "__v": 0
    // };
    // json.then(data => Object.assign(note, data));

    const addedNote = await response.json();
    // console.log(note);
    setNotes(notes.concat(addedNote));
  }

  //Delete a Note
  const deleteNote = async (id) => {

    /* API Call */
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Acess-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      }
    });
    // const json = await response.json();
    // console.log(json);
    // const {note} = json;
    // console.log(note._id);

    //Delete Note from UI if response is OK. Do NOT make API call.
    if (response.ok) {
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
    }

  }

  //Edit a Note
  const editNote = async (title, description, tag, id) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Acess-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const updatedNote = await response.json();
    // console.log(updatedNote.note);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // console.log(newNotes.length);

    for (let index = 0; index < newNotes.length; index++) {
      const checkNote = newNotes[index];
      if (checkNote._id === id) {
        newNotes[index].title = updatedNote.note.title;
        newNotes[index].description = updatedNote.note.description;
        newNotes[index].tag = updatedNote.note.tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
