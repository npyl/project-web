const ERR_PASS_OK           = 0;    // ok
const ERR_PASS_LENGTH       = 1;    // doesn't have length >= 8
const ERR_PASS_UPPERCASE    = 2;    // doesn't contain at least one uppercase char
const ERR_PASS_SYMBOL       = 3;    // doesn't contain at least one symbol

function check_password(password) {
    var foundUppercase = false;

    const symbols = '~!@#$%^&*()';

    // check if length is 
    if (password.length < 8)
        return ERR_PASS_LENGTH;

    // check if there is atleast one uppercase character
    for (var i = 0; i < password.length; i++)
    {
        if (password.charAt(i) == password.charAt(i).toUpperCase())
        {
            foundUppercase = true;
            break;
        }
    }
    if (!foundUppercase)
        return ERR_PASS_UPPER;

    // check if it contains symbols
    // TODO: ...

    // we reached here; everything ok with the password
    return ERR_PASS_OK;
}

function signup(e) {
    e.preventDefault();

    const username  = document.getElementById('username').value;
    const email     = document.getElementById('email').value;
    const password  = document.getElementById('password').value;

    // TODO: show error
    // password validation
    if (check_password(password) != ERR_PASS_OK)
    {
        alert('password is bad');
        return;
    }

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