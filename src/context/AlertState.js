import AlertContext from './alertContext';
import { useState } from 'react';


const AlertState = (props) => {

    const [alert, setAlert] = useState(null);

    const showAlert = (msg, type) => {
        // console.log(msg);
        setAlert({
            message: msg,
            type: type
        });

        setTimeout(() => {
            setAlert(null);
        }, 1800);
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
}
export default AlertState;