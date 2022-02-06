import React, { useContext, useState } from 'react';
import alertContext from '../context/alertContext';
import noteContext from '../context/noteContext';

function AddNote() {

    const n_context = useContext(noteContext);
    const a_context = useContext(alertContext);
    const { addNote } = n_context;
    const {showAlert} = a_context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        if (note.tag.length === 0) { note.tag = "Personal"; }
        addNote(note.title, note.description, note.tag);

        setNote({ title: "", description: "", tag: "" });
        showAlert('Note has been added successfully!!', 'success');
    }
    return (
        <>
            <h2>Add a note</h2>
            <form action="" className='my-3'>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange}  value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="5" name='description' onChange={onChange} value={note.description}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} placeholder='Personal'  value={note.tag}/>
                </div>
                <button disabled={note.title.length === 0 || note.description.length === 0} type="submit" className="btn btn-primary d-flex align-items-center justify-content-between" onClick={handleOnClick}>Add Note</button>
            </form>
        </>
    );
}

export default AddNote;
