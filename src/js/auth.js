import '../css/style.css';
import {fetchData} from './fetch.js';

const registerUser = async (event) => {
  event.preventDefault();

  const registerForm = document.querySelector('.registerForm');

  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  const url = 'http://localhost:3000/api/users';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);
  console.log('Päästään tähän asti')

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    alert('Käyttäjän luominen ei mennyt läpi.')
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
    alert('Käyttäjä luotu.')
  }

  console.log(response);
  registerForm.reset();
};

const loginUser = async (event) => {
  event.preventDefault();

  const loginForm = document.querySelector('.loginForm');

  const username = loginForm.querySelector('input[name=username]').value;
  const password = loginForm.querySelector('input[name=password]').value;

  const bodyData = {
    username: username,
    password: password,
  };

  const url = 'http://localhost:3000/api/auth/login';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error in login:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'logged in');
    localStorage.setItem('token', response.token);
    localStorage.setItem('name', response.user.username);
    localStorage.setItem('user_id', response.user.user_id);
    location.href="frontpage.html";
  }

  console.log(response);
  loginForm.reset();
};

//

const checkUser = async (event) => {
  event.preventDefault();

  const url = 'http://localhost:3000/api/auth/me';

  let headers = {};

  let token = localStorage.getItem('token');

  headers = {
    Authorization: `Bearer ${token}`
  };

  const options = {
    headers: headers
  };
  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error getting data:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
};

const logout = async (event) => {
  event.preventDefault();
  localStorage.clear();
  location.href="logout.html";
}

export {registerUser, loginUser, checkUser, logout}
