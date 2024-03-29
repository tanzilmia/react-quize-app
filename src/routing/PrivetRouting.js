import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';

const PrivetRouting = ({children}) => {
    const {user,loading} = useContext(mycontext)
    const location = useLocation();

    if(loading){
        return <progress className="progress mx-auto w-56"></progress>
    }

    if (user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivetRouting;