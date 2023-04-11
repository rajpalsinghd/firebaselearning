import React, { useState } from "react";
import "./userPage.css";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../config";

export default function UserPage() {
  const [input, setInput] = useState("");
  const [option, setOption] = useState("petrol");
  const [mode, setMode] = useState("");

  const { state } = useLocation();

  const handleNumberClick = (number) => {
    setInput(input + number);
  };

  function reset() {
    setInput("");
  }

  const handleSelect = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("Input:", input);
    console.log("Option:", option);
    console.log("Mode:", mode);
    if (!input || !mode) {
      alert("Please fill all the required details");
      return;
    }
    console.log(state);
    let foundObj = state.data.find((ele) => {
      if (ele.name === option) return ele;
    });
    if (!foundObj) {
      alert("No price added for: " + option + " today by owner");
      return;
    }
    let obj = {
      buyingPrice: input,
      price: foundObj.price,
      mode,
      name: option,
      email: state.email.slice(0, state.email.split("@")[0].length - 5),
      date: new Date().toISOString().slice(0, 10),
    };
    let id = uuidv4();

    const ordersRef = collection(db, "orders");

    await setDoc(doc(ordersRef, id), obj);
    console.log(obj);
  };

  return (
    <div className="calculator">
      <div className="calculator-input">
        <input type="text" value={input} readOnly />
      </div>
      <div className="calculator-buttons">
        <button onClick={() => handleNumberClick("1")}>1</button>
        <button onClick={() => handleNumberClick("2")}>2</button>
        <button onClick={() => handleNumberClick("3")}>3</button>
        <button onClick={() => handleNumberClick("4")}>4</button>
        <button onClick={() => handleNumberClick("5")}>5</button>
        <button onClick={() => handleNumberClick("6")}>6</button>
        <button onClick={() => handleNumberClick("7")}>7</button>
        <button onClick={() => handleNumberClick("8")}>8</button>
        <button onClick={() => handleNumberClick("9")}>9</button>
        <button onClick={() => handleNumberClick("0")}>0</button>
        <button onClick={reset}>RES</button>
      </div>
      <div className="calculator-select">
        <select value={option} onChange={handleSelect}>
          <option value="petrol">Petrol</option>
          <option value="petrol-sp">Petrol SP</option>
          <option value="diesel">Diesel</option>
          <option value="diesel-sp">Diesel SP</option>
        </select>
      </div>
      <div className="calculator-mode">
        <label>
          <input
            type="radio"
            value="Online"
            checked={mode === "Online"}
            onChange={(e) => setMode(e.target.value)}
          />
          Online
        </label>
        <label>
          <input
            type="radio"
            value="Offline"
            checked={mode === "Offline"}
            onChange={(e) => setMode(e.target.value)}
          />
          Offline
        </label>
      </div>
      <div className="calculator-submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
