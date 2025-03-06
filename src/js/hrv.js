import '../css/hrv.css';
import {fetchData} from './fetch.js';

const registerEntry = async (event) => {
    event.preventDefault();

    //GET CORRECT FORM
    const entryForm = document.querySelector('.input-measurement-entry');

    //GET VALUES
    const m_taken = entryForm.querySelector('#time-id').value.trim();
    const readiness = entryForm.querySelector('#readiness-id').value.trim();
    const bpm = entryForm.querySelector('#bpm-id').value.trim();
    const rmssd = entryForm.querySelector('#rmssd-id').value.trim();
    const sns = entryForm.querySelector('#sns-id').value.trim();
    const pns = entryForm.querySelector('#pns-id').value.trim();
    const sleep_hours = entryForm.querySelector('#sleep-id').value.trim();
    const phy_age = entryForm.querySelector('#phy-age-id').value.trim();
    const mood = entryForm.querySelector('#mood-id').value.trim();
    const notes = entryForm.querySelector('#notes-id').value.trim();

    // ENTRY DATA FOR REQUEST
    const bodyData = {
        m_taken: m_taken,
        readiness: readiness,
        bpm: bpm,
        rmssd: rmssd,
        sns: sns,
        pns: pns,
        sleep_hours: sleep_hours,
        phy_age: phy_age,
        mood: mood,
        notes: notes,
    };

    // ENDPOINT
    const url = 'http://localhost:3000/api/entries';

    let token = localStorage.getItem('token');

    // OPTIONS
    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
        },
    };
    console.log(options);

    // SEND REQUEST FOR POSTING DATA
    const response = await fetchData(url, options);

    if (response.error) {
        console.error('ADDING ENTRY FAILED:', response.error);
        return;
      }
    
    console.log(response);
    entryForm.reset();
}

const getUserEntries = async () => {
    // Endpoint
    const url = 'http://localhost:3000/api/entries';

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

    const tableBody = document.querySelector('.tbody')

    response.reverse();

    let nro = 0
    response.forEach((res) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${nro+1}</td>
            <td>${res.m_taken}</td>
            <td><button class="check" data-id='${res.entry_id}'>MITTAUS ${nro+1}</button></td>
            <td><button class="delete-m" data-id="${res.entry_id}">POISTA</button></td>
            `;

        tableBody.appendChild(row);
        localStorage.setItem(`set_entry ${nro+1}`, res.entry_id);

        //const entryRow = document.querySelector(`#result-${nro+1}`)
        //entryRow.addEventListener('click', printEntry);
        nro += 1;
        });

        addEventListenersOpen();
        addEventListenersDel();
    };

    //GET ENTRY ID FOR OPENING A RESULT
    const addEventListenersOpen = () => {
        const nappulat = document.querySelectorAll('.check');
        console.log(nappulat);
        nappulat.forEach((button) => {
          button.addEventListener('click', async (event) => {
            console.log('Klikkasit nappulaa:', event.target);
            const entryId = event.target.dataset.id;
            console.log('Haetaan tietoja käyttäjälle id:llä:', entryId);
            printEntry(entryId)
          });
        });
      };

      //GET ENTRY ID FOR DELETING A RESULT
      const addEventListenersDel = () => {
        const nappulat = document.querySelectorAll('.delete-m');
        console.log(nappulat);
        nappulat.forEach((button) => {
          button.addEventListener('click', async (event) => {
            console.log('Klikkasit nappulaa:', event.target);
            const entryId = event.target.dataset.id;
            console.log('Haetaan tietoja käyttäjälle id:llä:', entryId);
            deleteEntry(entryId)
          });
        });
      };

  // PRINT A SPECIFIC MEASUREMENT

  const printEntry = async (entry) => {
    //console.log('onko oikein' +  entry)

    let token = localStorage.getItem('token');

    //PITÄÄ SYÖTTÄÄ ENTRY_ID clientille.
    const url = `http://localhost:3000/api/entries/${entry}`;

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

    console.log('TÄTÄ ETSIT!!!!!!!' + response);

    const resultModule = document.querySelector('#diary-box');
    resultModule.style.display = 'block';
    resultModule.innerHTML = '';
    response.forEach((res) => {
        const heading = document.createElement('h2');
        heading.innerHTML = 'Tulokset';
        heading.style.padding = '1em';
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = 'Sulje'
        closeBtn.style.padding = '0.5em';
        closeBtn.className = 'close-result';
        const row = document.createElement('p');
        row.style.padding = '1em';
        row.innerHTML = `
        <p>Mittaus syötetty : ${res.m_taken}</p>
        <p>Valmiusprosentti : ${res.readiness} %</p>
        <p>Pulssi : ${res.bpm} bpm</p>
        <p>RMSSD : ${res.rmssd} ms</p>
        <p>SNS indeksi: ${res.sns}</p>
        <p>PNS indeksi: ${res.pns}</p>
        <p>Nukutut tunnit: ${res.sleep_hours} tuntia</p>
        <p>Fyysinen ikä: ${res.phy_age} vuotta</p>
        <p>Mielentila: ${res.mood}</p>
        <p>Lisätietoja: ${res.notes}</p>
        `;
    
    resultModule.appendChild(heading);
    resultModule.appendChild(row);
    resultModule.appendChild(closeBtn);
    });

    const closeModale = (event) => {
        event.preventDefault();
        const closeBtn = document.querySelector('#diary-box');
        closeBtn.style.display = 'none';
      }

    const closeResult = document.querySelector('.close-result');
    closeResult.addEventListener('click', closeModale);
  };

  // DELETE A SPECIFIC MEASUREMENT

  const deleteEntry = async (entry) => {
    //console.log('onko oikein' +  entry)

    let token = localStorage.getItem('token');

    let text = "Oletko varma, että mittaus poistetaan ?\n Paina 'OK' tai 'Cancel'.";
    if (confirm(text) == true) {
        text = "You pressed OK!";
        //PITÄÄ SYÖTTÄÄ ENTRY_ID clientille.
        const url = `http://localhost:3000/api/entries/del/${entry}`;

        // Nyt haetaan token local Storagelta
        console.log('tokeni on : ' + token)

        // Options
        const options = {
            method: 'DELETE',
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

        console.log('Poistettu' + response);
      } else {
        console.log('Delete cancelled!')
      }

};

/*  
*/

getUserEntries();

const entryForm = document.querySelector('#post-m');
entryForm.addEventListener('click', registerEntry);

/**/
printEntry();