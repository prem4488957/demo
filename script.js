import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
deleteDoc,
doc,
onSnapshot,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBAeWG8NsFpAaM5SE_t7fNZEQ0JLquOkDE",
  authDomain: "fir-dd17b.firebaseapp.com",
  projectId: "fir-dd17b",
  storageBucket: "fir-dd17b.firebasestorage.app",
  messagingSenderId: "75788421674",
  appId: "1:75788421674:web:fa51b2cac14b26bc185153",
  measurementId: "G-WGSPJVNEJW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const taskList = document.getElementById("taskList");


// ADD TASK
window.addTask = async function(){

const input = document.getElementById("taskInput");
const text = input.value;

if(text === "") return;

await addDoc(collection(db,"tasks"),{
text:text,
created:Date.now()
});

input.value="";

};


// LOAD TASKS
const q = query(collection(db,"tasks"),orderBy("created"));

onSnapshot(q,(snapshot)=>{

taskList.innerHTML="";

snapshot.forEach((task)=>{

const li = document.createElement("li");

li.innerHTML = `
${task.data().text}
<span onclick="deleteTask('${task.id}')">🗑</span>
`;

taskList.appendChild(li);

});

});


// DELETE TASK
window.deleteTask = async function(id){

await deleteDoc(doc(db,"tasks",id));

};