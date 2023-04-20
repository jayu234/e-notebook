import UserContext from './userContext';
import { useState } from 'react';

const UserState = (props) => {
    const [userData, setUserData] = useState({});
    const getUserData = async () => {
        const response = await fetch("https://enotebook-backend-nk2k.onrender.com/api/auth/getuser", {
            method: 'POST',
            headers: {
                'Acess-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            }
        })
        const json = await response.json();
        // console.log(json);
        setUserData(json);
    }
    return (
        <UserContext.Provider value={ {userData, getUserData}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;
