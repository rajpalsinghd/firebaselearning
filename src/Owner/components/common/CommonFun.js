import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../config";



export const getData = async (name, flag) => {
  // const querySnapshot = await getDocs(collection(db, name));
  if (!flag) {
    const querySnapshot = await getDocs(
      query(collection(db, "prices")
    ));
    let data = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });
    console.log(data);
    return data;
  } 
//   else {
//     const querySnapshot = await getDocs(
//       query(collection(db, "plans"), where("email", "==", name))
//     );
//     let data = [];
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       data.push(doc.data());
//     });
//     console.log(data);
//     return data;
//   }
};
