function loadDashboard() {
    const user = localStorage.getItem("currentUser");
    if (!user) {
        alert("משתמש לא מחובר!");
        window.location.hash = "#/login";
        return;
    }

    // טעינת משימות המשתמש מה-Local Storage
    const usersDB = JSON.parse(localStorage.getItem("usersDB")) || {};
    const userTasks = usersDB[user]?.tasks || [];

    const app = document.getElementById("app");
    app.innerHTML = `
        <h2>ניהול משימות</h2>
        <button id="logout-button">התנתקות</button>
        <table>
            <thead>
                <tr>
                    <th>משימה</th>
                    <th>סטטוס</th>
                    <th>באחריות</th>
                    <th>שלב</th>
                    <th>תאריך יעד</th>
                    <th>הערות</th>
                    <th>מחיקה</th>
                </tr>
            </thead>
            <tbody id="task-table-body">
            </tbody>
        </table>
        <br>
        <input type="text" id="new-task-input" placeholder="הכנס משימה חדשה">
        <button id="add-task-button">➕ הוסף משימה</button>
    `;

    document.getElementById("logout-button").addEventListener("click", () => {
        alert("התנתקת בהצלחה!");
        localStorage.removeItem("currentUser");
        window.location.hash = "#/login";
    });

    const tableBody = document.getElementById("task-table-body");

    function saveTasks() {
        usersDB[user].tasks = userTasks;
        localStorage.setItem("usersDB", JSON.stringify(usersDB));
    }

    function addTaskRow(task) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.name}</td>
            <td>
                <select class="status">
                    <option value="לא התחילה" ${task.status === "לא התחילה" ? "selected" : ""}>לא התחילה</option>
                    <option value="בעבודה" ${task.status === "בעבודה" ? "selected" : ""}>בעבודה</option>
                    <option value="הושלמה" ${task.status === "הושלמה" ? "selected" : ""}>הושלמה</option>
                </select>
            </td>
            <td contenteditable="true">${task.owner || ""}</td>
            <td>
                <select class="phase">
                    <option value="לפני האירוע" ${task.phase === "לפני האירוע" ? "selected" : ""}>לפני האירוע</option>
                    <option value="יום האירוע" ${task.phase === "יום האירוע" ? "selected" : ""}>יום האירוע</option>
                    <option value="שבת חתן" ${task.phase === "שבת חתן" ? "selected" : ""}>שבת חתן</option>
                    <option value="לאחר האירוע" ${task.phase === "לאחר האירוע" ? "selected" : ""}>לאחר האירוע</option>
                </select>
            </td>
            <td><input type="date" value="${task.dueDate || ""}"></td>
            <td contenteditable="true">${task.notes || ""}</td>
            <td><button class="delete-task">❌</button></td>
        `;

        tableBody.appendChild(row);

        const statusSelect = row.querySelector(".status");
        const phaseSelect = row.querySelector(".phase");
        const ownerCell = row.cells[2];
        const dueDateInput = row.querySelector("input[type='date']");
        const notesCell = row.cells[5];

        function updateTask() {
            task.status = statusSelect.value;
            task.phase = phaseSelect.value;
            task.owner = ownerCell.textContent.trim();
            task.dueDate = dueDateInput.value;
            task.notes = notesCell.textContent.trim();
            saveTasks();
        }

        statusSelect.addEventListener("change", updateTask);
        phaseSelect.addEventListener("change", updateTask);
        ownerCell.addEventListener("input", updateTask);
        dueDateInput.addEventListener("change", updateTask);
        notesCell.addEventListener("input", updateTask);

        row.querySelector(".delete-task").addEventListener("click", () => {
            tableBody.removeChild(row);
            userTasks.splice(userTasks.indexOf(task), 1);
            saveTasks();
        });
    }

    // טעינת משימות קיימות
    userTasks.forEach(addTaskRow);

    document.getElementById("add-task-button").addEventListener("click", () => {
        const newTaskInput = document.getElementById("new-task-input");
        const newTaskName = newTaskInput.value.trim();
        if (newTaskName) {
            const newTask = {
                name: newTaskName,
                status: "לא התחילה",
                owner: "",
                phase: "לפני האירוע",
                dueDate: "",
                notes: ""
            };
            userTasks.push(newTask);
            addTaskRow(newTask);
            saveTasks();
            newTaskInput.value = "";
        }
    });
}
