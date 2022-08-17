import { firestore } from "../../../firebase/admin";
import { collection, getDoc, doc } from "firebase/firestore";

export default async (request, response) => {
    const { query } = request;
    const { id } = query;
    if (firestore) {
      const docRef = collection(firestore, "devits");
      getDoc(doc(docRef, id))
        .then((doc) => {
          const { createdAt } = doc.data();
      
          response.json( {
            ...doc.data(),
            id: doc.id,
            createdAt: +createdAt.toDate(),
          });
        })
        .catch(() => {
          response.status(404).end();
        });
    }
  };