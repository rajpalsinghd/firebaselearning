import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { and, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../config";
import "./table.css"

function Table() {
const [data, setData] = useState([])
const[orderData, setOrderData] = useState([])
    useEffect(()=>{
            let colRef = collection(db, "prices")
            // let dataRef = collection(db, "orders")
          let dataRef= query(collection(db, "orders"), and(where("email", "==", "vikas2015041088"),where("date", "==", new Date().toISOString().slice(0, 10))))
          let subscribe=  onSnapshot(colRef, (snapshot) => {
            let d = []
                snapshot.docs.forEach((doc) => {
                    // setData((prev) => [...prev,doc.data()])
                    console.log("onsnapshot", doc.data());
                    d.push(doc.data())
                })
                setData(d)
            })
         let subscribe1 = onSnapshot(dataRef, (snapshot) => {
          let d = []
              snapshot.docs.forEach((doc) => {
                  // setData((prev) => [...prev,doc.data()])
                  console.log("onsnapshot", doc.data());
                  d.push(doc.data())
              })
              setOrderData(d)
          })
          return () =>{
            subscribe()
            subscribe1()
          }   
       
    },[])
  return (
    <>
    <div className="table-responsive">
      <table>
        {/* <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
        </thead> */}
        <tbody>
          {data?.map((ele, index)=>{
            return(
            <tr>
            <td>{ele.name}</td>
            <td>{ele.price}</td>
            <td>{ele.quantity}</td>
            <td><button>Edit</button></td>
          </tr>
            )
          })}
         
        </tbody>
      </table>
    </div>

    <div  className="table-responsive">
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Online Sell</th>
            <th>Offline Sell</th>
            <th>Remaining Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.map((ele, index)=>{
            return(
            <tr>
            <td>{ele.name}</td>
            <td>{ele.price}</td>
            <td>{ele.quantity}</td>
            <td>{ele.mode === "Online" ? true : false}</td>
            <td>{ele.mode === "Offline" ? true : false}</td>
          </tr>
            )
          })}
         
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Table;