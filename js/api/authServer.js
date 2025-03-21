const authServer = (() => {
    const USERS_DB_KEY = "usersDB";
    const CURRENT_USER_KEY = "currentUser";

    function getUsersDB() {
        return JSON.parse(localStorage.getItem(USERS_DB_KEY)) || {};
    }

    function saveUsersDB(usersDB) {
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
    }

    function register(username, password) {
        const usersDB = getUsersDB();
        if (usersDB[username]) {
            return { success: false, message: "שם משתמש כבר קיים!" };
        }

        usersDB[username] = {
            password,
            tasks: []
        };
        saveUsersDB(usersDB);
        return { success: true };
    }

    function login(username, password) {
        const usersDB = getUsersDB();
        if (!usersDB[username] || usersDB[username].password !== password) {
            return { success: false, message: "שם משתמש או סיסמה שגויים" };
        }

        localStorage.setItem(CURRENT_USER_KEY, username);
        return { success: true };
    }

    function logout() {
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    function getCurrentUser() {
        return localStorage.getItem(CURRENT_USER_KEY);
    }

    function changePassword(username, newPassword) {
        const usersDB = getUsersDB();
        if (!usersDB[username]) return { success: false, message: "משתמש לא קיים" };

        usersDB[username].password = newPassword;
        saveUsersDB(usersDB);
        return { success: true };
    }

    return {
        register,
        login,
        logout,
        getCurrentUser,
        changePassword
    };
})();
