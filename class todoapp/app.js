// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  // update,
  // remove,
  // onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBD1PIkVIqm-gPP27m-SudPOrcKOq_v5-I",
  authDomain: "todo-app-71a1f.firebaseapp.com",
  databaseURL: "https://todo-app-71a1f-default-rtdb.firebaseio.com",
  projectId: "todo-app-71a1f",
  storageBucket: "todo-app-71a1f.appspot.com",
  messagingSenderId: "56794227665",
  appId: "1:56794227665:web:4574c559c388f6658176f0",
  measurementId: "G-EGL3BPL961"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var DATABASE = getDatabase(app);




var inp = document.getElementById("inp");
var list = document.getElementById("list");
var todoList = [];

window.addTodo = function () {
  var inpData = {
    inp: list.value,
     
 }

 var referKey = ref(DATABASE);
 var inpKey = push(referKey).key;
 inpData.id = inpKey;
//  console.log(inpData);
//  console.log(inpKey);
 var reference = ref(DATABASE, `list/${inpData.id}`);
 set(reference, inpData);


};



// function render(data) {
//     if (data) {
//       todoList.push(data);
//     }
// }
window.addTodo = function () {
  if (inp.value == "") {
    alert("Please ENter value or Text");
    // var refer = ref(DATABASE, `todoList/${id}`);
    return;
  }

todoList.push(inp.value);
inp.value = "";
render();


};
// console.log(firebase)

function render() {
  list.innerHTML = "";
  for (var i = 0; i < todoList.length; i++) {
    list.innerHTML += `<li class="lia">${todoList[i]} <button onclick="editTodo(${i})" ><i class=" fa-solid fa-pen-to-square "></i></button>
        <button onclick="deleteTodo(${i})"><i class="fa-solid fa-delete-left"></i></button> </li>`;
  }
}



window.editTodo = function (indexNum) {
  todoList[indexNum] = prompt("enter your new value");
  render();
}
window.deleteTodo = function (indexNum) {
  todoList.splice(indexNum, 1);
  
  render();
}

window.Reset = function () {
  todoList = [];
  list.innerHTML = "";
}
render();
window.getDataFromDatabase = function () {
  var reference = ref(DATABASE, "list");
  onChildAdded(reference, function (data) {
    // console.log(data.value());
    render(data.val());
  });
};

// firebase.database().ref('inp').push({inp: inp.value})
// inp.value = ""


window.onload = getDataFromDatabase();