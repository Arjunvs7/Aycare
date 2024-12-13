import React, { useState, useEffect } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import axios from 'axios';

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    // Fetch new collection data from the backend API
    const fetchNewCollections = async () => {
      try {
        const response = await axios.get('http://localhost:4000/newcollections');
        setNew_collection(response.data);
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW PRODUCTS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default NewCollection;
