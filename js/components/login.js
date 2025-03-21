function loadLogin() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="container">
            <h2>התחברות</h2>
            <input type="text" id="username" placeholder="שם משתמש">
            <input type="password" id="password" placeholder="סיסמה">
            <button id="login-button">🔑 כניסה</button>
            <p>אין לך חשבון? <a href="#/register">הרשמה</a></p>
            <p><a href="#" id="forgot-password-link">שכחתי סיסמה</a></p>
        </div>
    `;

    document.getElementById("login-button").addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const result = authServer.login(username, password);
        if (result.success) {
            alert("התחברת בהצלחה!");
            window.location.hash = "#/dashboard";
        } else {
            alert(result.message);
        }
    });

    // אירוע לפתיחת עמוד "שכחתי סיסמה" בלי טעינת דף חדש
    document.getElementById("forgot-password-link").addEventListener("click", (event) => {
        event.preventDefault();
        loadForgotPassword();
    });
}

function loadForgotPassword() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="container">
            <h2>שחזור סיסמה</h2>
            <input type="email" id="reset-email" placeholder="הכנס את האימייל שלך">
            <button id="reset-password-button">🔄 שלח סיסמה חדשה</button>
            <p><a href="#" id="back-to-login">חזרה להתחברות</a></p>
        </div>
    `;

    document.getElementById("reset-password-button").addEventListener("click", () => {
        const email = document.getElementById("reset-email").value.trim();

        const result = authServer.resetPassword(email);
        if (result.success) {
            alert("סיסמה חדשה נשלחה למייל שלך!");
            loadLogin();
        } else {
            alert(result.message);
        }
    });

    document.getElementById("back-to-login").addEventListener("click", (event) => {
        event.preventDefault();
        loadLogin();
    });
}
