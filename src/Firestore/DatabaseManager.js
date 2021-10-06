// import { applyActionCode } from "@firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import firebase from "../Firebase/firebase";

// constants
const db = firebase.db;

const eventsCollectionName = "events";
const usersCollectionName = "users";

const eventsCollection = collection(db, eventsCollectionName);
const usersCollection = collection(db, usersCollectionName);

// get all events
export const getEvents = async () => {
  const querySnapshot = await getDocs(eventsCollection);
  const eventArray = []
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => `, doc.data());
    eventArray.push(doc.data());

  });
  console.log("IN CONTROLLER", eventArray);
  return eventArray;
};

// create user (upon sign in)
export const createUser = async (uuid, name, photoURL) => {
// If the document does not exist, it will be created. 
// If the document does exist, its contents will be overwritten with the newly provided data, 
// unless you specify that the data should be merged into the existing document
  await setDoc(doc(db, usersCollectionName, uuid), {
    name,
    photoURL,
    eventsID: [],
  });
};

// export const createEvent = async () => {
//   await setDoc(doc(db, eventsCollectionName))
// }