import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firbase-config';

const PrivateComponenet = ({ children }) => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        let state = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                navigate('/');
            }
        })
        return state;
    },[navigate])

  return authenticated ? children : null;
}

export default PrivateComponenet