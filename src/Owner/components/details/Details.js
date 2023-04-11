import React from "react";
import "./details.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  and,
} from "firebase/firestore";
import { auth, db } from "../../../config";

export default function Details() {
  const [user, setUser] = useState("");
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const inputHandler = (e) => {
    data[e.target.name] = e.target.value;
  };
  const submitHandler = async () => {
    console.log(data);
    let obj = { ...data };
    obj.email = user.email;
    let id = uuidv4();
    const plansRef = collection(db, "prices");
    let q = query(
      collection(db, "prices"),
      and(where("name", "==", obj.name), where("email", "==", obj.email))
    );
    let qs = await getDocs(q);
    if (qs.size) {
      qs.forEach((doc) => {
        console.log(doc.data());
        id = doc.id;
      });
    }
    await setDoc(doc(plansRef, id), obj);
  };
  return (
    <div className="row">
      <select className="dropdown" name="name" onChange={inputHandler}>
        <option value="petrol">Petrol</option>
        <option value="petrol-sp">Petrol SP</option>
        <option value="diesel">Diesel</option>
        <option value="diesel-sp">Diesel SP</option>
      </select>
      <div className="input-container">
        <input
          type="number"
          className="price-input"
          placeholder="Price"
          name="price"
          onChange={inputHandler}
        />
        <input
          type="number"
          className="quantity-input"
          placeholder="Quantity"
          name="quantity"
          onChange={inputHandler}
        />
        <button className="plus-button" onClick={submitHandler}>
          +
        </button>
      </div>
    </div>
  );
}
