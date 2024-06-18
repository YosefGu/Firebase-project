import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function register() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            const user = userCredential.user;
            console.log('User register successfully, user: ', user);
            navigate('/home');
        })
        .catch((error) => {
            console.log('Error in register procces', error)
            setMessage('Error in register procces', error.message)
        })
    }
  return (
        <div className='form'>
            <h2>Register</h2>
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <p>{message}</p>
        </div>    
  )
}

export default Register