document.addEventListener("DOMContentLoaded", () => {
    console.log("האפליקציה נטענה");
    loadRoute();
});

function loadRoute() {
    const route = window.location.hash.substring(1) || "/";
    const app = document.getElementById("app");

    switch (route) {
        case "/":
            app.innerHTML = "<h2>ברוכים הבאים למערכת תכנון החתונה!</h2>";
            break;
        case "/dashboard":
            loadDashboard();
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
