import React from 'react'
import "./details.css"
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from '../../../config';


export default function Details() {
    const [data , setData] = useState({
        name:"",
        price:"",
        quantity:""
    })
    const inputHandler=((e)=>{
    data[e.target.name] =e.target.value
    })
    const submitHandler=(async()=>{
        console.log(data)
        let id = uuidv4();

        const plansRef = collection(db, "prices");
    
        await setDoc(doc(plansRef, id),data);
    })
  return (
    <div className="row">
      <select className="dropdown" name='name' onChange={inputHandler}>
        <option value="petrol">Petrol</option>
        <option value="petrol-sp">Petrol SP</option>
        <option value="diesel">Diesel</option>
        <option value="diesel-sp">Diesel SP</option>
      </select>
      <div className="input-container">
        <input type="number" className="price-input" placeholder="Price" name="price" onChange={inputHandler}/>
        <input type="number" className="quantity-input" placeholder="Quantity" name ="quantity"onChange={inputHandler} />
        <button className="plus-button" onClick={submitHandler}>+</button>
      </div>
    </div>
  )
}
