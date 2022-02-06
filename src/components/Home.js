import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AddNote from './AddNote';
import Notes from './Notes';
import Alert from './Alert';
import userContext from '../context/userContext';

function Home() {

  let history = useHistory();
  const context = useContext(userContext);
  const { getUserData } = context;
  const [access, setAccess] = useState(false);
  useEffect(() => {
    document.title = 'eNotebook - Home';

    if (localStorage.getItem('authtoken')) {
      setAccess(true)
    }
    else {
      history.push('/login');
    }

    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Alert />
      {access && <div className="container" style={{ marginTop: '8rem' }}>
        <AddNote /> {/* adding a note  */}
        <Notes /> {/* display all notes  */}
      </div>}
    </>

  );
}

export default Home;
