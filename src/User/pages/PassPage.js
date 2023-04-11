import React, { useState } from "react";
import "./passpage.css";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDocs, onSnapshot, query, where } from "firebase/firestore";

export default function PassPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  const submitHandler = async () => {
    const plansRef = collection(db, "owners");
    let q = query(collection(db, "owners"), where("email", "==", email));
    let qs = await getDocs(q);
    let dbPassword = "";
    if (qs.size != 0) {
      qs.forEach((doc) => {
        dbPassword = doc.data().password;
      });
      if (password !== dbPassword) {
        alert("Wrong credentials");
        return;
      }
      async function x(user) {
        let email = user.user.email;
        email = email.slice(0, email.split("@")[0].length - 5) + "@gmail.com";
        const querySnapshot = await getDocs(
          query(collection(db, "prices"), where("email", "==", email))
        );
        let data = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data.push(doc.data());
        });
        console.log(data, user);
        navigate("/user", {
          state: { data: data, email: user.user.email },
        });
      }
      // fetchSignInMethodsForEmail(auth, email).then((signInMethods) => {
      //   if (signInMethods.length > 0) {
      //     signInWithEmailAndPassword(auth, email, password)
      //       .then((user) => {
      //         x(user);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   } else {
      //     createUserWithEmailAndPassword(auth, email, password)
      //       .then((user) => {
      //         x(user);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         console.log("Some error in creating user");
      //       });
      //   }
      // });
      x({ user: { email } });
    } else {
      alert("Contact admin no user found with the id");
    }
  };
  return (
    <div>
      <div class="login-container">
        <h2>Login</h2>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={emailHandler}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={passwordHandler}
          />
        </div>
        <button className="button" onClick={submitHandler}>
          Login
        </button>
      </div>
    </div>
  );
}
