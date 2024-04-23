firebase.initialApp({
    apiKey: "AIzaSyDWpuEIA60TsjlVBx9cP6txIARzmgcqc5c",
    authDomain: "plp-task-app-cbc7e.firebaseapp.com",
    projectId: "plp-task-app-cbc7e",
    storageBucket: "plp-task-app-cbc7e.appspot.com",
    messagingSenderId: "59317947857",
    appId: "1:59317947857:web:79c5836389b19bc12424f0"
});

const db = firebase.firestore();

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.getElementById("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.doChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            }
        });
    });

    function deleteTask(id) {
        db.collection("tasks").doc(id).delete();
    }
