import '../css/style.css';
import '../css/frontpage.css';
import { logout } from './auth.js';

const openMobNav = () => {
    const mobileIcon = document.querySelector('.mobnav');
    mobileIcon.style.display = 'block';
}

const icon = document.querySelector('.hamburger');
icon.addEventListener('click', openMobNav);


document.querySelector('#app').innerHTML = `Tervetuloa ${localStorage.getItem('name')}`;

const exitAccount = document.querySelector('#exit-program');
exitAccount.addEventListener('click', logout);

const exitAccountMob = document.querySelector('#exit-program-mob');
exitAccountMob.addEventListener('click', logout);
