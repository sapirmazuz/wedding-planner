function loadRegister() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="container">
            <h2>הרשמה</h2>
            <input type="text" id="new-username" placeholder="שם משתמש">
            <input type="email" id="new-email" placeholder="אימייל">
            <input type="password" id="new-password" placeholder="סיסמה">
            <button id="register-button">📌 הרשמה</button>
            <p>כבר יש לך חשבון? <a href="#/login">התחבר</a></p>
        </div>
    `;

    document.getElementById("register-button").addEventListener("click", () => {
        const username = document.getElementById("new-username").value.trim();
        const email = document.getElementById("new-email").value.trim();
        const password = document.getElementById("new-password").value.trim();

        const result = authServer.register(username, email, password);
        if (result.success) {
            alert("נרשמת בהצלחה! כעת ניתן להתחבר.");
            window.location.hash = "#/login";
        } else {
            alert(result.message);
        }
    });
}
