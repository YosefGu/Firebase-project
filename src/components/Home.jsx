import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firbase-config'


const Home = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log('User sige out successfully.')
            navigate('/');
        })
        .catch((error) => {
            console.log('Error signing out: ', error)
        })
    };

    const handleAdd = () => {
        navigate('/add');
    };
    
    const handleItems = () => {
        navigate('/items');
    };
    

  return (
    <>
    <div className='container'>
        <div className='form'>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleAdd}>Add Items</button>
            <button onClick={handleItems}>Items</button>
        </div>
    </div>
    </>
    
  )
}

export default Home