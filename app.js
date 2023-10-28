// DOM interactions
const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// BOM interactions
const localStorageKey = 'tasks';
let tasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];

taskInput.addEventListener('input', () => {
    const text = taskInput.value.trim();
    if (text === '') {
        // Input is empty, provide feedback to the user
        taskInput.setCustomValidity('Task cannot be empty');
        console.log('Input is empty'); // Log the status
    } else {
        // Input is valid
        taskInput.setCustomValidity('');
        console.log('Input is valid'); // Log the status
    }
});

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the existing task list
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Check if the task is completed and apply a CSS class
        if (task.completed) {
            li.classList.add('completed'); // Apply the "completed" class
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
    const text = taskInput.value.trim();
    if (text !== '') {
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
    if (e.key === 'Enter' && taskInput.checkValidity()) {
        addNewTask();
    }
});

taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const taskItem = event.target.parentElement;
        if (taskItem && taskItem.parentNode) {
            if (event.target.textContent === 'Complete') {
                // Mark task as completed
                const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
                if (index !== -1) {
                    tasks[index].completed = !tasks[index].completed;
                    saveTasks();
                    renderTasks();
                }
            } else if (event.target.textContent === 'Delete') {
                // Delete task
                const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
                if (index !== -1) {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                }
            }
        }
    }
});

// Initial rendering of tasks
renderTasks();