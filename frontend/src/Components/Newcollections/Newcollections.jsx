import React, { useEffect, useState } from 'react'
import './Newcollections.css'

import {Item} from '../Item/Item'


export const Newcollections = () => {
  const [new_collections,setNew_collection]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));

  },[])
  return (
    <div className='newcollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collections.map((item,i)=>(
                <Item
                            key={item.id}
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
