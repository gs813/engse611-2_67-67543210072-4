const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span class="task-text">${todo.text}</span>
      <div class="task-actions">
        <button class="toggle" data-index="${index}">${
      todo.completed ? "↩️" : "✓"
    }</button>
        <button class="delete" data-index="${index}">🗑️</button>
      </div>
    `;

    todoList.appendChild(li);
  });
  saveTodos();
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    todos.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTodos();
  }
});

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle")) {
    const index = event.target.getAttribute("data-index");
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }

  if (event.target.classList.contains("delete")) {
    const index = event.target.getAttribute("data-index");
    todos.splice(index, 1);
    renderTodos();
  }
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
});

clearAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

renderTodos();
