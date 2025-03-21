// js/api/tasksServer.js
import db from "../../data/db.js";

const TaskServer = {
    getTasksByUser(username) {
        if (!db.tasks[username]) {
            db.tasks[username] = [];
        }
        return { success: true, tasks: db.tasks[username] };
    },

    addTask(username, title, status = "לא התחילה", phase = "לפני האירוע") {
        if (!db.tasks[username]) {
            db.tasks[username] = [];
        }
        db.tasks[username].push({ title, status, phase, owner: "", deadline: "", notes: "" });
        return { success: true };
    },

    updateTask(username, title, updatedData) {
        const taskList = db.tasks[username] || [];
        const task = taskList.find(t => t.title === title);
        if (task) {
            Object.assign(task, updatedData);
            return { success: true };
        }
        return { success: false, message: "משימה לא נמצאה" };
    },

    deleteTask(username, title) {
        if (!db.tasks[username]) return { success: false, message: "משתמש לא קיים" };
        db.tasks[username] = db.tasks[username].filter(task => task.title !== title);
        return { success: true };
    }
};

export default TaskServer;
