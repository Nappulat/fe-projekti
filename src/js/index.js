import '../css/style.css';
import { registerUser, loginUser, checkUser } from './auth.js';

const openLogin = (event) => {
    event.preventDefault();
    const newU = document.querySelector('.create-new-user');
    newU.style.display = 'block';
  }

const openLoginPhone = (event) => {
    event.preventDefault();
    const login = document.querySelector('.login-form');
    login.style.display = 'block';
    const hide = document.querySelector('.create-new-user');
    hide.style.display = 'none';
}

const openRegisterPhone = (event) => {
    event.preventDefault();
    const register = document.querySelector('.create-new-user');
    register.style.display = 'block';
    const hide = document.querySelector('.login-form');
    hide.style.display = 'none';
}

const revealLogin = document.querySelector('#create-u-btn');
revealLogin.addEventListener('click', openLogin);

const revealLoginMob = document.querySelector('#phone-show-login');
revealLoginMob.addEventListener('click', openLoginPhone);

const revealRegMob = document.querySelector('#phone-show-reg');
revealRegMob.addEventListener('click', openRegisterPhone);

//Creating a user
const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser, checkUser);
