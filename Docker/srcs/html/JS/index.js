function func_requestUser() {
    if (window.localStorage.username) {
        document.getElementById('requestUser').className = "hide";
        document.getElementById('loginDetails').className = "";
        let username = window.localStorage.username;
        let password = window.localStorage.password;
        console.log("Username:", username, "Password:", password);
        document.getElementById("loginDetails").insertAdjacentHTML("afterbegin", "<section class='info'><p>Username: <span>" + username + "</span></p><p>Password: <span>" + password + "</span></p></section>")

    }
    else
        fetch("http://" + window.location.hostname + ":8080/requestphpmyadminusername")
            .then((res) => res.json())
            .then(res => {
                if (res.errorCode)
                    console.log(res.errorDescription)
                else {
                    document.getElementById('requestUser').className = "hide";
                    document.getElementById('loginDetails').className = "";
                    window.localStorage.setItem("username", res.username);
                    window.localStorage.setItem("password", res.password);
                    document.getElementById("loginDetails").insertAdjacentHTML("afterbegin", "<section class='info'><p>Username: <span>" + res.username + "</span></p><p>Password: <span>" + res.password + "</span></p></section>")
                    console.log("Username:", res.username, "Password;", res.password);
                }
            })
}