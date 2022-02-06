import React, { useContext } from 'react'
import noteContext from '../context/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, setDeleteAlert } = props;
 
    return (
        <>
            <div key={note._id} className='col-md-4 my-3'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text mb-2"><small className="text-muted">#<em>{note.tag}</em></small></p>
                        <div className='d-flex justify-content-end align-items-center'>
                            <i className="fas fa-trash ms-3" onClick={() => { deleteNote(note._id); setDeleteAlert('Note has been deleted successfully!!', 'danger') }}></i>
                            <i className="fas fa-pen mx-3" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;