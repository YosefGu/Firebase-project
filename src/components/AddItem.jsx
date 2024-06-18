import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firbase-config';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();


    async function addItem(event) {
        event.preventDefault();
        let convertPrice = parseFloat(price);
        try {
            const newItem = await addDoc(collection(db, 'items'), {
                name: name,
                price: convertPrice,
                details: details,
                url: url
            });
            console.log('Adding successfully, card ID: ', newItem.id);
            setName('');
            setPrice('');
            setDetails('');
            setUrl('');
        } catch (e) {    
            console.log('Error adding ', e);
            setMessage('Error adding item.');
        }
    }

    const handleBack = () => {
        navigate('/home');
    };

return (
    <div>
        <div className='container' >
            <form className='form' onSubmit={addItem}>
                <input type='text' placeholder='Product Name' required onChange={(e) => setName(e.target.value)} value={name}></input>
                <input type='number' step='0.01' placeholder='Product Price' required onChange={(e) => setPrice(e.target.value)} value={price}></input>
                <input type='text' placeholder='Product Details' required onChange={(e) => setDetails(e.target.value)} value={details}></input>
                <input type='url' placeholder='Image URL' required onChange={(e) => setUrl(e.target.value)} value={url}></input>
                <button type='submit' >Add Item</button>
                <button onClick={handleBack}>Back</button>
                <p>{message}</p>
            </form>
            
        </div>
    </div>
  )
}

export default AddItem