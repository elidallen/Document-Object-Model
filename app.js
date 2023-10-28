
// DOM interactions
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// BOM interactions
const localStorageKey = 'tasks';
let tasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        // Button to mark task as completed
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            tasks[index].completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Button to delete task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Function to add a new task
function addNewTask() {
    const text = taskInput.value;
    if (text.trim() !== '') {
        tasks.push({ text, completed: false });
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }
}

// Function to save tasks in local storage
function saveTasks() {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

// Event listeners
addTaskButton.addEventListener('click', addNewTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addNewTask();
    }
});

// Initial rendering of tasks
renderTasks();
