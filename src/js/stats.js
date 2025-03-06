import {fetchData} from './fetch.js';

console.log('Moi stat')

const getSleepAverage = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    // Endpoint
    const url = `http://localhost:3000/api/entries/sleep/${id}`;

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

    //console.log(response.length)
    const divide = response.length
    let sum = 0

    for (let i = 0; i < response.length; i++) {
        sum += response[i].sleep_hours;
        i+1
      }

    console.log(sum)

    const average = sum/divide;
    console.log(average);
    const print = Math.round(average)
    console.log(print);

    const printSleep = document.querySelector('#sleep-average');
    
    const heading = document.createElement('h1');
    heading.innerHTML = `${print}`
    
    //`${response[0]}`;
    printSleep.appendChild(heading)
}

const getReadinessAverage = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    // Endpoint
    const url = `http://localhost:3000/api/entries/ready/${id}`;

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

    //console.log(response.length)
    const divide = response.length
    let sum = 0

    for (let i = 0; i < response.length; i++) {
        sum += response[i].readiness;
        i+1
      }

    console.log(sum)

    const average = sum/divide;
    console.log(average);
    const print = Math.round(average)
    console.log(print);

    const printReadiness = document.querySelector('#readiness-average');
    
    const heading = document.createElement('h1');
    heading.innerHTML = `${print}`
    
    //`${response[0]}`;
    printReadiness.appendChild(heading)
}

const getPhyAgeAverage = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    // Endpoint
    const url = `http://localhost:3000/api/entries/age/${id}`;

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

    //console.log(response.length)
    const divide = response.length
    let sum = 0

    for (let i = 0; i < response.length; i++) {
        sum += response[i].phy_age;
        i+1
      }

    console.log(sum)

    const average = sum/divide;
    console.log(average);
    const print = Math.round(average)
    console.log(print);

    const printPhyAge = document.querySelector('#age-average');
    
    const heading = document.createElement('h1');
    heading.innerHTML = `${print}`
    
    //`${response[0]}`;
    printPhyAge.appendChild(heading)
}

getSleepAverage();
getReadinessAverage();
getPhyAgeAverage();