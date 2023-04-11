import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { useState } from "react";
import {
  and,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../config";
import "./table.css";

function Table() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const [orderData, setOrderData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };
  const modalHandler = (e) => {
    const data = { ...selectedRow };
    console.log(e.target.name, e.target.value);
    data[e.target.name] = e.target.value;
    setSelectedRow(data);
  };
  const saveChangeHandler = async (e) => {
    let ownersRef = collection(db, "prices");
    await setDoc(doc(ownersRef, selectedRow.id), selectedRow);
    console.log(selectedRow);
    setIsOpen(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      let colRef = query(
        collection(db, "prices"),
        where("email", "==", user.email)
      );
      // let dataRef = collection(db, "orders")
      let dataRef = query(
        collection(db, "orders"),
        and(
          where("email", "==", user.email.split("@")[0]),
          where("date", "==", new Date().toISOString().slice(0, 10))
        )
      );
      let subscribe = onSnapshot(colRef, (snapshot) => {
        let d = [];
        snapshot.docs.forEach((doc) => {
          // setData((prev) => [...prev,doc.data()])
          console.log("onsnapshot", doc.data());
          d.push({ ...doc.data(), id: doc.id });
        });
        setData(d);
      });
      let subscribe1 = onSnapshot(dataRef, (snapshot) => {
        let d = [];
        let priceDS = {};
        snapshot.docs.forEach((doc) => {
          // setData((prev) => [...prev,doc.data()])
          console.log("onsnapshot", doc.data());
          d.push(doc.data());
        });

        let finalData = {};
        console.log(priceDS);
        d.forEach((ele) => {
          if (!finalData.hasOwnProperty(ele.name)) {
            let obj = { ...ele };
            let quantity = Number(ele.buyingPrice) / Number(ele.price);
            finalData[ele.name] = obj;
            finalData[ele.name]["quantity"] = quantity;
            if (ele.mode == "Online") {
              finalData[ele.name]["offline"] = 0;
              finalData[ele.name]["online"] = Number(ele.buyingPrice);
            } else {
              finalData[ele.name]["online"] = 0;
              finalData[ele.name]["offline"] = Number(ele.buyingPrice);
            }
          } else {
            let quantity = Number(ele.buyingPrice) / Number(ele.price);
            finalData[ele.name]["quantity"] += quantity;
            if (ele.mode == "Online") {
              finalData[ele.name]["online"] += Number(ele.buyingPrice);
            } else {
              finalData[ele.name]["offline"] += Number(ele.buyingPrice);
            }
          }
        });
        setOrderData(finalData);
      });

      return () => {
        subscribe();
        subscribe1();
        unsubscribe();
      };
    });
  }, []);
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
            {data?.map((ele, index) => {
              return (
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.price}</td>
                  <td>{ele.quantity}</td>
                  <td>
                    <button onClick={() => handleEditClick(ele)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal isOpen={isOpen}>
          <h2>Edit Product</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" id="name" value={selectedRow.name} disabled />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              name="price"
              id="price"
              value={selectedRow.price}
              onChange={modalHandler}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              name="quantity"
              id="quantity"
              value={selectedRow.quantity}
              onChange={modalHandler}
            />
          </div>
          <button onClick={saveChangeHandler}>Save Changes</button>
        </Modal>
      </div>

      <div className="table-responsive">
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
            {Object.values(orderData)?.map((ele, index) => {
              return (
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.price}</td>
                  <td>
                    {
                      data?.find((d) => {
                        if (d.name === ele.name) return d;
                      })?.quantity
                    }
                  </td>
                  <td>{ele.online}</td>
                  <td>{ele.offline}</td>
                  <td>
                    {(
                      data?.find((d) => {
                        if (d.name === ele.name) return d;
                      })?.quantity - ele?.quantity
                    ).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
