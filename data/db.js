const DB_KEY = "tasks_db";

// שמירת משימות בלוקל סטורג'
function saveTasksToDB(tasks) {
    localStorage.setItem(DB_KEY, JSON.stringify(tasks));
}

// טעינת משימות מהלוקל סטורג'
function loadTasksFromDB() {
    const tasks = localStorage.getItem(DB_KEY);
    return tasks ? JSON.parse(tasks) : [];
}

// הוספת משימה חדשה
function addTaskToDB(task) {
    const tasks = loadTasksFromDB();
    tasks.push(task);
    saveTasksToDB(tasks);
}

// מחיקת משימה
function deleteTaskFromDB(taskId) {
    let tasks = loadTasksFromDB();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToDB(tasks);
}

// עדכון משימה
function updateTaskInDB(updatedTask) {
    let tasks = loadTasksFromDB();
    tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    saveTasksToDB(tasks);
}
