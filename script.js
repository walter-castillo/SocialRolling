// inicio validacion formulario 
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('user')
    if (localStorage.getItem('user') === null) {
        let user = {
            email: '123@123.com',
            password: '123qwe#',
            name: 'Owner Publication',
            urlImagen: 'https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY',
            flagLogged: false
        }
        localStorage.setItem('user', JSON.stringify(user));
    }
});

const form = document.getElementById('form');
const btnSubmit = document.querySelector("#btn-submit");

const inputs = document.querySelectorAll('.section-login__form input');
const inputEmail = document.querySelector('.section-login__form input[type=email]');
const inputPassword = document.querySelector('.section-login__form input[type=password]');

const regex = {
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    password: /^(?=.*[a-zA-z])(?=.*\d)(?=.*[%*#&])[a-zA-Z\d%*#&]{3,8}$/
}

const flag = {
    email: false,
    password: false,
}

function validate(e) {
    let reg;
    e.target.type == 'email' ? reg = regex.email : reg = regex.password;
    if (e.target.value.length < 1) {
        e.target.parentNode.children[2].style.display = "none"; //icon ok
        e.target.classList.remove('section-login__input--ok'); //input ok
        e.target.parentNode.parentNode.children[2].style.display = "none"; //ul

        e.target.classList.remove('section-login__input--error'); //input error
        e.target.parentNode.children[1].style.display = "none"; //icon error
        flag[e.target.type] = false
        btnDisabled();

    } else if (!(reg.test(e.target.value))) {
        e.target.parentNode.children[2].style.display = "none"; //icon ok
        e.target.classList.remove('section-login__input--ok'); //input ok
        e.target.parentNode.parentNode.children[2].style.display = "block"; //ul

        e.target.classList.add('section-login__input--error'); //input error
        e.target.parentNode.children[1].style.display = "block"; //icon error
        flag[e.target.type] = false
        btnDisabled();

    } else if (reg.test(e.target.value)) {
        e.target.parentNode.children[2].style.display = "block"; //icon ok
        e.target.classList.add('section-login__input--ok'); //input ok
        e.target.parentNode.parentNode.children[2].style.display = "none"; //ul

        e.target.classList.remove('section-login__input--error'); //input error
        e.target.parentNode.children[1].style.display = "none"; //icon error
        flag[e.target.type] = true;
        btnDisabled();
    }
}

const btnDisabled = () => flag.email && flag.password && btnSubmit ? btnSubmit.disabled = false : btnSubmit.disabled = true;

inputs.forEach(input => {
    // input.addEventListener('keyup', validate);
    input.addEventListener('blur', validate);
    input.addEventListener('input', validate);
});

const matchUser = (e) => {
    let userLocal = JSON.parse(localStorage.getItem('user'));
    e.preventDefault();
    if (flag.email && flag.password && userLocal.email == inputEmail.value && userLocal.password == inputPassword.value) {
        userLocal.flagLogged = true;
        localStorage.setItem('user', JSON.stringify(userLocal));
        window.location = "logged.html";
    } else {
        document.querySelector('.msg-error--credential').style.opacity = 1;
        document.querySelector('.msg-error--credential').style.display = 'block';

        setTimeout(function() {
            document.querySelector('.msg-error--credential').style.opacity = 0
        }, 2000);
        setTimeout(function() {
            document.querySelector('.msg-error--credential').style.display = 'none'
        }, 2800);

        userLocal.flagLogged = false;
        localStorage.setItem('user', JSON.stringify(userLocal));
    }
}


form.addEventListener('submit', matchUser);

alert('123@123.com 123qwe#');