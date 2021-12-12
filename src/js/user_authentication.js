function signup(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const option = {
        headers:{
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
        redirect: "follow"
    }

    // fetching data
    fetch('signup', option)
        .then(res => {
            // Ύστερα από επιτυχές sign-up μπορούμε να χρησιμοποιήσουμε το πρόγραμμα ως user
            window.location.href = res.url;
        })
        .catch(err => alert('Something happen wrong!'));
}