import React, { useState, useContext, useRef, useEffect } from 'react';
import alertContext from '../context/alertContext';
import noteContext from '../context/noteContext';
import NoteItem from './NotesItem';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    
    const a_context = useContext(alertContext);
    const {showAlert} = a_context;

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ editedTitle: '', editedDescription: '', editedTag: ''});


    useEffect(() => {
      getNotes();
      // eslint-disable-next-line
    }, []);
    
    const onChange = (e) => { 
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleOnClick = (e) => {
        if (note.editedTag.length === 0) { note.editedTag = "Personal"; };
        editNote(note.editedTitle, note.editedDescription, note.editedTag, note._id);

        refClose.current.click();
        showAlert('Note has been edited successfully!!', 'success')
    }

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({editedTitle: currentNote.title, editedDescription: currentNote.description, editedTag: currentNote.tag, _id: currentNote._id})
    }

    const setDeleteAlert = (msg, type)=>{
        showAlert(msg, type);
    }
    return (
        <div className='container'>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch demo modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Modal Header  */}
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body  */}
                        <div className="modal-body">
                            <form action="" className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor='editedTitle' className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editedTitle" name='editedTitle' onChange={onChange} value={note.editedTitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editedDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="editedDescription" rows="5" name='editedDescription' onChange={onChange} value={note.editedDescription}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='editedTag' className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="editedTag" name='editedTag' onChange={onChange} placeholder='Personal' value={note.editedTag} />
                                </div>
                            </form>
                        </div>

                        {/* Action buttons*/}
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button id='closeModal' disabled={note.editedTitle.length === 0 || note.editedDescription.length === 0} type="submit" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3> Your Notes: </h3>
            <div className="container">
                {notes.length === 0 && 'No Notes to display.'}
            </div>
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} setDeleteAlert={setDeleteAlert}/>
                })}
            </div>
        </div>
    );
}
