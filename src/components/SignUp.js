import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import alertContext from '../context/alertContext';
import Alert from './Alert';

function SignUp() {

    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [currentCredentials, setCredentials] = useState({ name: '', email: '', password: '' });

    const context = useContext(alertContext);
    const { showAlert } = context;

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    useEffect(() => {
        document.title = 'eNotebook - SignUp';
        // eslint-disable-next-line
    }, []);

    const handleOnChange = (e) => {
        // checkCpassword();
        setCredentials({ ...currentCredentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = currentCredentials;
        const response = await fetch("https://my-enotebook.herokuapp.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        const { credentials, errors } = json;

        // console.log(errors);
        // console.log(errors[0].msg);
        // console.log(credentials);
        if (response.ok) {
            localStorage.setItem('authtoken', json.authToken);
            history.push("/");
        }
        else {
            // Alert for invalid credentials
            if (!credentials) {
                if (errors[0].param === 'email') {
                    showAlert('Please enter valid email!!', 'danger');
                    emailRef.current.focus();
                }
                else if (errors[0].param === 'password') {
                    showAlert('Please enter valid password!!', 'danger');
                    passwordRef.current.focus();
                }
            }

            // Alert for existing user
            else {
                showAlert('User already exist!! Try again using another email.', 'danger');
            }
        }
    }
    const togglePassword = () => {
        if (!showPassword) {
            setShowPassword(true);
        }
        else {
            setShowPassword(false);
        }
    }
    return (
        <>
            <Alert />
            <div className='container d-flex flex-column' style={{ marginTop: '8rem', width: '35rem' }}>
                <div className='text-center'><h2 className='mb-3'>Create account to access eNotebook</h2></div>
                <div className="container border border-secondary border-2 rounded-3 p-3">
                    <form method='post' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={currentCredentials.name} name='name' onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" id="email" aria-describedby="emailHelp" value={currentCredentials.email} name='email' onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <div className='d-flex justify-content-between'>
                                <label htmlFor="password" className="form-label">Choose Password</label>
                                <span id="emailHelp" className="form-text ms-1"><em>Password must have 8 or more characters.</em></span>
                            </div>
                            <input ref={passwordRef} type={`${(showPassword)?"text":"password"}`} className="form-control" id="password" value={currentCredentials.password} name='password' onChange={handleOnChange} required />
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={togglePassword} />
                            <label className="form-check-label" htmlFor="flexCheckDefault" style={{ fontSize: '0.95rem' }} >
                                Show Password
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create account</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
