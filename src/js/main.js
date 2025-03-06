import '../css/style.css';
import '../css/frontpage.css';
import { logout } from './auth.js';
//import '../css/snackbar.css';
//import {getItems} from './items.js';
//import {getUsers, addUser} from './users.js';
//import {getData} from './test.js';
//import {getEntries} from './entries.js';
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

//getData();

//const getItemBtn = document.querySelector('.get_items');
//getItemBtn.addEventListener('click', getItems);

//const getUserBtn = document.querySelector('.get_users');
//getUserBtn.addEventListener('click', getUsers);

//const addUserForm = document.querySelector('.formpost');
//addUserForm.addEventListener('click', addUser);

//const getEntriesBtn = document.querySelector('.get_entries');
//getEntriesBtn.addEventListener('click', getEntries);
