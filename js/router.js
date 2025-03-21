// js/router.js
import { loadDashboard } from "./components/dashboard.js";
import { loadLogin } from "./components/login.js";
import { loadRegister } from "./components/register.js";
import TaskServer from "./api/tasksServer.js";
import AuthServer from "./api/authServer.js";

document.addEventListener("DOMContentLoaded", async () => {
    async function loadRoute() {
        const route = window.location.hash.substring(1) || "/";
        const app = document.getElementById("app");

        switch (route) {
            case "/":
                app.innerHTML = "<h2>ברוכים הבאים למערכת תכנון החתונה!</h2>";
                break;

            case "/dashboard":
                const user = AuthServer.getCurrentUser();
                if (!user) {
                    window.location.hash = "/login";
                    return;
                }

                const response = TaskServer.getTasksByUser(user.username);
                if (response.success) {
                    loadDashboard(response.tasks);
                } else {
                    app.innerHTML = `<h2>שגיאה בטעינת הנתונים</h2>`;
                }
                break;

            case "/login":
                loadLogin();
                break;

            case "/register":
                loadRegister();
                break;

            default:
                app.innerHTML = "<h2>דף לא נמצא</h2>";
        }
    }

    window.addEventListener("hashchange", loadRoute);
    loadRoute();
});
