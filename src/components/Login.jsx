import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  async function login() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User login successfully, user: ', user)
      navigate('/home');
      
    })
    .catch((error) => {
      console.log('Error Login: ', error)
      setMessage('Error in login procces', error.message)
    });
  };

  return (
      <div className='form'>
        <h2>Login</h2>
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
        <p>{message}</p>
      </div> 
  )
}

export default Login