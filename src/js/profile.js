import '../css/profile.css';
import {fetchData} from './fetch.js';

console.log('profiili.js auki')

//PRINT USERINFO
const getUserProfile = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    // Endpoint
    const url = `http://localhost:3000/api/users/${id}`;

    // Nyt haetaan token local Storagelta
    console.log('tokeni on : ' + token)

    // Options
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    console.log(options);

    // Hae data
    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Error getting data:', response.error);
        return;
    }

    if (response.message) {
        console.log(response.message, 'success');
    }

    console.log(response)
    
    //PRINTING TO PROFILE
    //response.forEach((res) => {}); 
    const profileUsername = document.querySelector('#user-username');
    const username = document.createElement('p');
    username.innerHTML = `${response.username}`;

    const profileEmail = document.querySelector('#user-email');
    const email = document.createElement('p');
    email.innerHTML = `${response.email}`;

    const profileName = document.querySelector('#user-fname');
    const fname = document.createElement('p');
    fname.innerHTML = `${response.fname}`;

    const profileLastName = document.querySelector('#user-lname');
    const lname = document.createElement('p');
    lname.innerHTML = `${response.lname}`;

    const profileOccupation = document.querySelector('#user-occupation');
    const occupation = document.createElement('p');
    occupation.innerHTML = `${response.occupation}`;

    const profileWeight = document.querySelector('#user-weight');
    const weight = document.createElement('p');
    weight.innerHTML = `${response.weight} kg`;

    const profileHeight = document.querySelector('#user-height');
    const height = document.createElement('p');
    height.innerHTML = `${response.height} cm`;

    const profileCreated = document.querySelector('#user-created');
    const created = document.createElement('p');
    created.innerHTML = `Profiili luotu: ${response.created_at}`;

    profileUsername.appendChild(username);
    profileEmail.appendChild(email);
    profileName.appendChild(fname);
    profileLastName.appendChild(lname);
    profileOccupation.appendChild(occupation);
    profileWeight.appendChild(weight);
    profileHeight.appendChild(height);
    profileCreated.appendChild(created);
};

// UPDATING USERINFO FOR BACKEND (DATABASE)

const updateUserInfo = async (event) => {
    event.preventDefault();

    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');
  
    // Haetaan oikea formi
    const profileForm = document.querySelector('.registerUserInfo');
  
    // Haetaan formista arvot
    const fname = profileForm.querySelector('#fname').value.trim();
    const lname = profileForm.querySelector('#lname').value.trim();
    const occupation = profileForm.querySelector('#work').value.trim();
    const weight = profileForm.querySelector('#weight').value.trim();
    const height = profileForm.querySelector('#height').value.trim();
  
    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
      fname: fname,
      lname: lname,
      occupation: occupation,
      weight: weight,
      height: height
    };

    console.log(bodyData)
  
    // Endpoint
    const url = `http://localhost:3000/api/users/${id}`;
  
    // Options
    const options = {
      body: JSON.stringify(bodyData),
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    };
    console.log(options);
  
    // Hae data
    const response = await fetchData(url, options);
  
    if (response.error) {
      console.error('Error adding a new user:', response.error);
      return;
    }

    if(!response.error) {
      alert('Tallennettu profiilitiedot');
    }
  
    if (response.message) {
      console.log(response.message, 'success');
    }
  
    console.log(response);
    profileForm.reset(); // tyhjennetään formi
  };

  //ADDING A NEW MEASUREMENT

  const newUserMedication = async (event) => {
    event.preventDefault();

    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');
  
    // Haetaan oikea formi
    const medForm = document.querySelector('.registerMed');
  
    // Haetaan formista arvot
    const name = medForm.querySelector('#med-name').value.trim();
    const dosage = medForm.querySelector('#med-dos').value.trim();
    const start_date = medForm.querySelector('#med-start').value.trim();
    const end_date = medForm.querySelector('#med-stop').value.trim();
    const extra = medForm.querySelector('#med-extra').value.trim();
  
    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
      name: name,
      dosage: dosage,
      start_date: start_date,
      end_date: end_date,
      extra: extra
    };

    console.log(bodyData)
  
    // Endpoint
    const url = `http://localhost:3000/api/med/${id}`;
  
    // Options
    const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    };
    console.log(options);
  
    // Hae data
    const response = await fetchData(url, options);
  
    if (response.error) {
      console.error('Error adding a medication:', response.error);
      return;
    }

    if(!response.error) {
      alert('Tallennettu uusi lääketys');
    }
  
    if (response.message) {
      console.log(response.message, 'success');
    }
  
    console.log(response);
    medForm.reset(); // tyhjennetään formi
  };

  
  const getUserMedications = async () => {
      
      let user_Id = localStorage.getItem('user_id');
      // Endpoint
      const url = `http://localhost:3000/api/med/${user_Id}`;
  
      // Nyt haetaan token local Storagelta
      let token = localStorage.getItem('token');
      console.log('tokeni on : ' + token)
  
      // Options
      const options = {
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      };
  
      console.log(options);
  
      // Hae data
      const response = await fetchData(url, options);
  
      if (response.error) {
          console.error('Error getting data:', response.error);
          return;
      }
  
      if (response.message) {
          console.log(response.message, 'success');
      }
  
      console.log(response);
  
      const tableBody = document.querySelector('.med-tbody')
  
      response.reverse();
  
      let nro = 0
      response.forEach((res) => {
              const row = document.createElement('tr');
              row.innerHTML = `
              <td>${nro+1}</td>
              <td>${res.name}</td>
              <td>${res.dosage}</td>
              <td>${res.start_date}</td>
              <td>${res.end_date}</td>
              <td>${res.extra}</td>
              <td><button class="delete-m" data-id="${res.medication_id}">POISTA</button></td>
              `;
  
          tableBody.appendChild(row);
          localStorage.setItem(`set_entry ${nro+1}`, res.entry_id);
  
          //const entryRow = document.querySelector(`#result-${nro+1}`)
          //entryRow.addEventListener('click', printEntry);
          nro += 1;
          });
  
          //addEventListenersOpen();
          addEventListenersDel();
      };

      //GET MEDICATION_ID FOR DELETING A RECIPE
      const addEventListenersDel = () => {
        const nappulat = document.querySelectorAll('.delete-m');
        console.log(nappulat);
        nappulat.forEach((button) => {
          button.addEventListener('click', async (event) => {
            console.log('Klikkasit nappulaa:', event.target);
            const medication_Id = event.target.dataset.id;
            console.log('Haetaan tietoja käyttäjälle id:llä:', medication_Id);
            deleteMed(medication_Id);
          });
        });
      };

    // DELETE A SPECIFIC MEDICATION

    const deleteMed = async (med_id) => {
    //console.log('onko oikein' +  entry)

    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let text = "Oletko varma, että lääke poistetaan ?\n Paina 'OK' tai 'Cancel'.";
    if (confirm(text) == true) {
        text = "You pressed OK!";
        //PITÄÄ SYÖTTÄÄ ENTRY_ID clientille.
        const url = `http://localhost:3000/api/med/${user_id}`;

        // Nyt haetaan token local Storagelta
        console.log('tokeni on : ' + token)

        const medication_id = med_id

        const bodyData = { 
          medication_id: medication_id 
        }

        // Options
        const options = {
            body: JSON.stringify(bodyData),
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
            }
        };

        console.log(options);

        // Hae data
        const response = await fetchData(url, options);

        if (response.error) {
            console.error('Error getting data:', response.error);
            return;
        }

        if (response.message) {
            console.log(response.message, 'success');
        }

        console.log('Poistettu' + response);
      } else {
        console.log('Delete cancelled!')
      }

};
  

const sendProfileForm = document.querySelector('.registerUserInfo');
sendProfileForm.addEventListener('submit', updateUserInfo);

const sendMedForm = document.querySelector('.registerMed');
sendMedForm.addEventListener('submit', newUserMedication);

getUserProfile();
getUserMedications();