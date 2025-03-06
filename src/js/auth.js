import '../css/style.css';
import '../css/snackbar.css';
import {fetchData} from './fetch.js';

// Esimerkin takia haut ovat nyt suoraan tässä tiedostossa, jotta harjoitus ei sekoita
// teidän omaa projektin rakennetta

const registerUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const registerForm = document.querySelector('.registerForm');

  // Haetaan formista arvot
  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/users';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);
  console.log('Päästään tähän asti')

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  registerForm.reset(); // tyhjennetään formi
};

// login
const loginUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const loginForm = document.querySelector('.loginForm');

  // Haetaan formista arvot, tällä kertaa käyttäen attribuutti selektoreita
  const username = loginForm.querySelector('input[name=username]').value;//.trim();
  const password = loginForm.querySelector('input[name=password]').value;//.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/auth/login';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error in login:', response.error);
    return;
  }
  // Kirjautuminen meni läpi
  if (response.message) {
    console.log(response.message, 'logged in');
    localStorage.setItem('token', response.token);
    localStorage.setItem('name', response.user.username);
    localStorage.setItem('user_id', response.user.user_id);
    location.href="frontpage.html";
  }

  console.log(response);
  loginForm.reset(); // tyhjennetään formi
};

//

const checkUser = async (event) => {
  event.preventDefault();

  // Endpoint
  const url = 'http://localhost:3000/api/auth/me';

  //kutsutaan headers tiedot jonhon liitetään tokenit
  let headers = {};

  // Nyt haetaan token local Storagelta
  let token = localStorage.getItem('token');

  headers = {
    Authorization: `Bearer ${token}`
  };

  // Options
  const options = {
    headers: headers
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error getting data:', response.error);
    return;
  }
  // Kirjautuminen meni läpi
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

//const registerForm = document.querySelector('.registerForm');
//registerForm.addEventListener('submit', registerUser);

//const loginForm = document.querySelector('.loginForm');
//loginForm.addEventListener('submit', loginUser);

//const meRequest = document.querySelector('#meRequest');
//meRequest.addEventListener('click', checkUser);

//const exitProgram = document.querySelector('#clearButton');
//exitProgram.addEventListener('click', logout);
