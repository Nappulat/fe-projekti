import {fetchData} from './fetch.js';


const getSleepAverage = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    const url = `http://localhost:3000/api/entries/sleep/${id}`;

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
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
    console.log(response)

    let print
    let heading

    if (response.length == 0) {
        print = 'Ei mittauksia.';
        heading = document.createElement('p')
        heading.style.color = 'white';
    } else {
        const divide = response.length
        let sum = 0

        for (let i = 0; i < response.length; i++) {
            sum += response[i].sleep_hours;
            i+1
        }

        const average = sum/divide;
        print = Math.round(average);
        heading = document.createElement('h1')
    }

    const printSleep = document.querySelector('#sleep-average');
    heading.innerHTML = `${print}`
    printSleep.appendChild(heading)
}

const getReadinessAverage = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    const url = `http://localhost:3000/api/entries/ready/${id}`;

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
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
    console.log(response)

    let print
    let heading

    if (response.length == 0) {
        print = 'Ei mittauksia.';
        heading = document.createElement('p')
        heading.style.color = 'black';
    } else {
        const divide = response.length
        let sum = 0

        for (let i = 0; i < response.length; i++) {
            sum += response[i].readiness;
            i+1
        }

        const average = sum/divide;
        print = Math.round(average);
        heading = document.createElement('h1')
    }

    const printReadiness = document.querySelector('#readiness-average');
    heading.innerHTML = `${print}`
    printReadiness.appendChild(heading)
}

const getPhyAgeAverage = async () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');

    const url = `http://localhost:3000/api/entries/age/${id}`;

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
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
    console.log(response)

    let print
    let heading

    if (response.length == 0) {
        print = 'Ei mittauksia.';
        heading = document.createElement('p')
        heading.style.color = 'black';
    } else {
        const divide = response.length
        let sum = 0

        for (let i = 0; i < response.length; i++) {
            sum += response[i].phy_age;
            i+1
        }

        const average = sum/divide;
        print = Math.round(average);
        heading = document.createElement('h1')
    }

    const printPhyAge = document.querySelector('#age-average');
    heading.innerHTML = `${print}`
    printPhyAge.appendChild(heading)
}

getSleepAverage();
getReadinessAverage();
getPhyAgeAverage();