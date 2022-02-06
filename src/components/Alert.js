import React , {useContext}from 'react';
import alertContext from '../context/alertContext';

function Alert() {
    const context = useContext(alertContext);
    const {alert} = context;
    return (
        <div className='fixed-top' style={{ height: '50px', marginTop: '3.5rem'}}>{
            alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert" style={{transition: 'all 3s ease-in'}}>
                <svg xmlns="http://www.w3.org/2000/svg" gfill="currentColor" viewBox="0 0 16 16" className="bi flex-shrink-0 me-2 mb-1" width="24" height="24" role="img" aria-label="Info:"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>{alert.message}
                {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    );
}

export default Alert;
