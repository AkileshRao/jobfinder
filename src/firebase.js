import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { fireEvent } from "@testing-library/react";

const firebaseConfig = {
    apiKey: "AIzaSyA8jfAd-4WdUtf9tUKdaavw7fwO64Btafw",
    authDomain: "test-ec924.firebaseapp.com",
    databaseURL: "https://test-ec924.firebaseio.com",
    projectId: "test-ec924",
    storageBucket: "test-ec924.appspot.com",
    messagingSenderId: "203164576120",
    appId: "1:203164576120:web:4d4488b217a977fefac08d"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email } = user;
        try {
            await userRef.set({
                email,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

