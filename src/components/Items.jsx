import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firbase-config';

const Items = () => {
    const [items, setItems] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const dataRef = collection(db, 'items');

    async function getItems() {
      const allItems = await getDocs(dataRef);
      setItems(allItems.docs.map((item) => ({...item.data(), id: item.id})));
  
    };
        
    async function deleteItem(id) {
        try {
            await deleteDoc(doc(db, 'items', id));
            console.log('Deleting was successfully.', id);
            const filtered = items.filter(item => item.id !== id);
            setItems(filtered);
            
        } catch (e) {
            console.log('Error deleting item: ', e)
        }
    };

    const lowToHige = async () => {
        const reOrder = [...items];
        reOrder.sort((a,b) => a.price - b.price);
        setItems(reOrder); 
    };

    const HeightToLow = async () => {
        const reOrder = [...items];
        reOrder.sort((a,b) => b.price - a.price);
        setItems(reOrder);  
    };

    const handleSelect = async () => {
        
        let convertFrom = parseFloat(from);
        let convertTo = parseFloat(to);
        if (!convertFrom) {
            convertFrom = 0;
            setFrom(0);
        };
        if (!convertTo) {
            convertTo = 1000;
            setTo(1000);
        };
        if (convertTo < convertFrom) {
            setMessage('Unligal values, please fill currectly.');
            convertFrom = 0;
            convertTo = 1000;
            setFrom('');
            setTo('');
        }
        console.log(convertFrom, convertTo)
        try {
            const sortedData = await getDocs(query(dataRef, where('price', '>=', convertFrom), where('price', '<=', convertTo)));
            const newData = sortedData.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setItems(newData);

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getItems();
    }, [])

  return (
    <div className='root'>
        <div className='top'>
            <h1>Featured Products</h1>
            <h4>Check out our favorite products of the month.</h4>
        </div>
        <div  className='filter'>
            <input type="number" step='0.1' placeholder='From price' value={from} onChange={(event) => setFrom(event.target.value)}/>
            <input type="number" step='0.1' placeholder='To price' value={to} onChange={(event) => setTo(event.target.value)}/>
            <button onClick={handleSelect}>Select</button>
            <p>{message}</p>
            <button onClick={lowToHige}>Low To Height</button>
            <button onClick={HeightToLow}>Height To Low</button>
        </div>
        <div className='cards'>
            {items.map((item, index) => (
                <div className='card' key={index}>
                    <img src={item.url}/>
                    <p>{item.name}</p>
                    <p>{item.price}$</p>
                    <p>{item.details}</p>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Items