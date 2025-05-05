import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './database.js';


// Fetch för att hämta alla objekt
const collectionName = 'products';
const collectionRef = collection(db, collectionName);

//async på alla crud-funktionerna. 
