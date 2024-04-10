const searchform = document.querySelector('#form');
const searchI = document.querySelector('#cityname');
const cityContainerEl = document.querySelector('#citycontainer');
const nextDays = document.querySelector('#nextdays');
const btnEL = document.querySelector('#city-btn');
const windInfo = document.querySelector('#windinfo');
const tempInfo = document.querySelector('#tempinfo');
const humidityInfo = document.querySelector('#humidityinfo');
const chosenCity = document.querySelector('#citychosen');


const submitSearch = function (event) {
    event.preventDefault();
  
    const cityName = searchI.value.trim();
  
    if (cityName) {
      getCityInfo(cityName);
  
      //cityContainerEl.textContent = '';
      //searchI.value = '';
      windInfo.textContent = '';
      tempInfo.textContent = '';
      humidityInfo.textContent = '';
      chosenCity.textContent = '';

    } else {
      alert('Please enter a valid City');
    }
  };

  const clickBtn= function (event) {
    const citybtn = event.target.getAttribute('citybtn');
  
    if (citybtn) {
      featuredCities(citybtn);

      windInfo.textContent = '';
      tempInfo.textContent = '';
      humidityInfo.textContent = '';
      chosenCity.textContent = '';
    }
  };

 const getCityInfo = function (cityName) {
    const queryURL =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=29208aab8e3dbaf2a8f223424d864557&units=metric`;
    
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json()
          .then(function (data) {
            displayCities(data, cityName);
          });
        } else {
          alert(`Error:${response.statusText}`);
        }
      })
      .catch(function (error) {
        alert('Unable to find the city');
      });
 };

  const featuredCities = function(citybtn) {
    const apiUrl = `https:api.openweathermap.org/data/2.5/forecast?q=${citybtn}&appid=29208aab8e3dbaf2a8f223424d864557&units=metric`;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayCities(data, citybtn);
        });

      } else {
        alert(`Error:${response.statusText}`);
      }
    });
  };

const displayCities= function (dataArray, searchTerm) {

  if (dataArray.length === 0) {
    repoContainerEl.textContent = 'No cities found.';
    return;
  }

  chosenCity.textContent = searchTerm.toUpperCase();
  
    windInfo.textContent= dataArray.list[0].wind.speed;
    tempInfo.textContent = dataArray.list[0].main.temp;
    humidityInfo.textContent =dataArray.list[0].main.humidity;

  for (let cityobj of dataArray) {
  

    const info = `${cityobj.list.wind}/ ${cityobj.list.main.temp}/ ${cityobj.list.main.humidity}`;

    const cardDiv = $('<div>');
    cardDiv.addClass = ('card text-white bg-dark mb-3 col-2');
    cardDiv.css('max-width', '18rem');


    const cardEl = $('<div>');
    cardEl.appendTo(cardDiv);
    
    const cardDay = $('<div>')
        .addClass('card-header')
        .text(tomorrow);
      cardDay.appendTo(cardEl);
    
      const cardBodyEl = $('<div>');
      cardBodyEl.addClass('card-body')
      .text(info);
      cardBodyEl.appendTo(cardEl);
  }
};

searchform.addEventListener('submit', submitSearch);
btnEL.addEventListener('click', clickBtn);
