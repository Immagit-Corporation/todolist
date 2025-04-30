// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

// Render a single task
function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    // Toggle completion on click
    li.querySelector('span').addEventListener('click', () => {
        toggleTask(task.id);
    });

    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Toggle task completion
function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

// Delete a task
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

// Refresh the task list
function refreshTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    loadTasks();
}