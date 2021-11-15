import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import db from "../firebase/FbConfig";




export const addNewPlayer = async nickname => {
    
    try {
            const docRef =  await addDoc(collection(db, "users"), {
                nickname
              });
              return docRef.id

      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const addNewGameResult = async (userId, level, time, image) => {
    
    try{
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        const newData = data.data().results ? [...data.data().results, { level, time, image}] : [{ level, time, image}];
        await updateDoc(docRef, {
            results: [
               ...newData
              
            ]
          });
    } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const getAllResults = async userId => {
    try{
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        return data.data()?.results
    } catch (e) {
        console.error("Error adding document: ", e);
      }
}