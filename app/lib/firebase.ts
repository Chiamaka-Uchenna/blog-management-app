"use client";

// Firebase Initialization for Blogify
// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; // isSupported import
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

// Firebase configuration for Blogify
const firebaseConfig = {
  apiKey: "AIzaSyAFXDtvO8HgD5BSfo4S9mb-Qa-NbTTdbes",
  authDomain: "blog-management-app-9ed53.firebaseapp.com",
  projectId: "blog-management-app-9ed53",
  storageBucket: "blog-management-app-9ed53.firebasestorage.app",
  messagingSenderId: "795782400565", 
  appId: "1:795782400565:web:2e1d6406504446626e3f7c",
  measurementId: "G-41L14TNSP2",
};

// Initialize Firebase app for Blogify
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore for Blogify
const db = getFirestore(app);

// Function to manage authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state when authentication state changes
    });

    return () => unsubscribe(); // Clean up the listener when the component is unmounted
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return { user, logout };
};

// Export Firebase modules for use in the application
export { auth, db };
