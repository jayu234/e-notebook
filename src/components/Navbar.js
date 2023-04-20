import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import userContext from '../context/userContext';

function Navbar() {

    let history = useHistory();
    const context = useContext(userContext);
    const {userData} = context;
    const handleLogOut = () => {
        localStorage.removeItem('authtoken');
        history.push('/login');
    }

    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">eNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/' || location.pathname==='/home') ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {(location.pathname ==='/home' || location.pathname === '/') && <div id='profileBtn' className='me-2 rounded-3 mb-3-md' style={{padding: '0.5rem', display: 'flex', alignItems: 'center', backgroundColor: '#4a4a4a' }}>
                        <i className="fas fa-user" style={{ color: '#e7e7e7', fontSize: '1.5rem' }}></i><p className='text-white' style={{ margin: '0rem 0rem 0rem 0.5rem' }}>{userData.name}</p>
                    </div>}
                    {localStorage.getItem('authtoken') && <button className='btn btn-primary' onClick={handleLogOut} >Log out</button>}
                </div>
            </div>
        </nav >
    );
}

export default Navbar;