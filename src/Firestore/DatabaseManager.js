// import { applyActionCode } from "@firebase/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import firebase from "../Firebase/firebase";
import { useEffect } from "react";

// constants
const db = firebase.db;

const eventsCollectionName = "events";
const usersCollectionName = "users";

const eventsCollection = collection(db, eventsCollectionName);
const usersCollection = collection(db, usersCollectionName);

// get all events
export const getEvents = async () => {
  const querySnapshot = await getDocs(eventsCollection);
  const eventArray = [];
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => `, doc.data());
    eventArray.push(doc.data());
  });
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

//creates an event
export const createEvent = async (event) => {
  await setDoc(doc(db, eventsCollectionName, event.eventID), {
    eventID: event.eventID,
    eventTitle: event.eventTitle,
    host: event.host,
    maxParticipants: event.maxParticipants,
    participantsID: event.participantsID,
    recommendedEateries: event.recommendedEateries,
    selectedEatery: event.selectedEatery,
    startTime: event.startTime,
    totalCoordinates: event.totalCoordinates,
  });
};

export const getSingleEvent = async (eventID) => {
  const docRef = doc(db, eventsCollectionName, eventID);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    // LOL wtf matt HAHAHAHHA
    console.log("L");
  } else {
    return docSnapshot.data();
  }
};

export const updateRecommendedEateries = async (
  eventID,
  recommendedEateries
) => {
  const docRef = doc(db, eventsCollectionName, eventID);

  await updateDoc(docRef, { recommendedEateries: recommendedEateries });
};

//delete document
export const deleteEvent = async (event) => {
  await deleteDoc(doc(db, eventsCollectionName, event.eventID));
};

// edit document
export const editEvent = async (event) => {
  const docRef = doc(db, eventsCollectionName, event.eventID);

  await updateDoc(docRef, event);
};

//add location
export const selectLocation = async (event, selectedPlace) => {
  const docRef = doc(db, eventsCollectionName, event.eventID);

  await updateDoc(docRef, {
    selectedEatery: selectedPlace.placeId,
    selectedEateryName: selectedPlace.name,
  });
};

// export const useEventListener = (eventID, setEventState) => {
//   useEffect(() => {
//     const unsub = onSnapshot(
//       doc(db, eventsCollectionName, eventID),
//       (doc) => {
//         console.log("Current data: ", doc.data());
//         // setEventState(doc.data());
//       }
//     );
//     return unsub;
//   }, []);
// };

let unsub;

export const listenToEvent = (eventID, setEventState) => {
  unsub = onSnapshot(
    doc(db, eventsCollectionName, eventID),
    (doc) => {
      console.log("doc:", doc);
      console.log("doc data:", doc.data());
      if (doc && doc.data()){
        setEventState(doc.data());
      }else{
        unsub();
      }
    }
  );
} 