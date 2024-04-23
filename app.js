firebase.initializeApp({
    apiKey: "AIzaSyB01lUsfA3z2ZfBz2qsz3wB6YN-fifGnZw",
  authDomain: "task-management-app-f1a3a.firebaseapp.com",
  projectId: "task-management-app-f1a3a",
  storageBucket: "task-management-app-f1a3a.appspot.com",
  messagingSenderId: "1079769935387",
  appId: "1:1079769935387:web:abaf52c4c32a06dc1c52be"
});

const db = firebase.firestore();

//function to add tasks
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
        console.log("Task added.");
    }
}

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
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
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            }
        });
    });

    function deleteTask(id) {
        db.collection("tasks").doc(id).delete()
            .then(() => {
                const taskItem = document.getElementById(id);
                if (taskItem) {
                    taskItem.remove();
                } else {
                    console.log("Task item not found in HTML.");
                }
                console.log("Task deleted successfully.");
            })
            .catch(error => {
                console.error("Error removing task: ", error);
            });
    }
    
