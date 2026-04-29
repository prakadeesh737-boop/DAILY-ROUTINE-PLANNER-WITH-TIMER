let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks
function loadTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    
    if (task.done) li.classList.add("done");

    li.onclick = () => toggleTask(index);

    list.appendChild(li);
  });

  updateProgress();
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";

  saveTasks();
  loadTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  loadTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Progress
function updateProgress() {
  let done = tasks.filter(t => t.done).length;
  let percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  document.getElementById("progress").textContent = "Progress: " + percent + "%";
}

// Timer
let time = 1500;
let timer;

function updateTime() {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  document.getElementById("time").textContent =
    `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      alert("Break time! 😊");
      timer = null;
      return;
    }
    time--;
    updateTime();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 1500;
  updateTime();
}

// Initial load
loadTasks();
updateTime();
