import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import alertContext from '../context/alertContext';
import Alert from './Alert';

function Login() {

    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const context = useContext(alertContext);
    const { showAlert } = context;
    
    useEffect(() => {
        document.title = 'eNotebook - Login';
        // eslint-disable-next-line
    }, []);

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://my-enotebook.herokuapp.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        // console.log(json);
        if (response.ok) {
            localStorage.setItem('authtoken', json.authToken);
            history.push("/");
        }
        else {
            showAlert('Invalid email or password!!', 'danger');
        }
    }

    const togglePassword = ()=>{
        if (!showPassword) {
            setShowPassword(true);
        }
        else{
            setShowPassword(false);
        }
    }

    return (
        <>
            <Alert />
            <div className='container d-flex flex-column' style={{ marginTop: '8rem', width: '26rem' }}>
                <div className='text-center'><h2 className='mb-3'>Login to access your notes.</h2></div>
                <div className="container border border-secondary border-2 rounded-3 p-3">
                    <form method='post' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} name='email' onChange={handleOnChange} required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type={`${(showPassword)?"text":"password"}`} className="form-control" id="password" value={credentials.password} name='password' onChange={handleOnChange} required />
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={togglePassword}/>
                                <label className="form-check-label" htmlFor="flexCheckDefault" style={{fontSize: '0.95rem'}} >
                                    Show Password
                                </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
                <div className="container text-center">
                    <p>Don't have any account? <Link to='/signup'>Create one</Link></p>
                </div>
            </div>
        </>
    );
}
export default Login;
