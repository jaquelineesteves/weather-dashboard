const searchform = document.querySelector('#form');
const searchI = document.querySelector('#cityname');
const cityContainerEl = document.querySelector('#citycontainer');
const nextDays = document.querySelector('#nextdays');
const btnEL = document.querySelector('#city-btn');
const windInfo = document.querySelector('#windinfo');
const tempInfo = document.querySelector('#tempinfo');
const humidityInfo = document.querySelector('#humidityinfo');
const datetoday = document.querySelector('#todaydate');
const chosenCity = document.querySelector('#citychosen');
const today = dayjs();



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
      datetoday.textContent = '';

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
      datetoday.textContent = '';
    }
  };

  const getCityInfo = function (cityName) {
const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=29208aab8e3dbaf2a8f223424d864557&units=metric`;

fetch(apiUrl)
.then(function (response) {
  if (response.ok) {
    response.json()
    .then(function (data) {
      getLatLon(data[0].lat,data[0].lon);
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
  const apiUrlt = `https://api.openweathermap.org/geo/1.0/direct?q=${citybtn}&limit=1&appid=29208aab8e3dbaf2a8f223424d864557&units=metric`;

  fetch(apiUrlt).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getLatLon(data[0].lat,data[0].lon);
      });

    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

const getLatLon = function (lat,lon) {
  const apiUrls = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=29208aab8e3dbaf2a8f223424d864557&units=metric`
  fetch(apiUrls)
  .then(function (response) {
    if (response.ok) {
      response.json()
      .then(function (data) {
        console.log(data.city.name);
        displayCities(data, data.city.name);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert('Unable to find the city');
  });
};


const displayCities = function (dataArray, searchTerm) {

  if (dataArray.length === 0) {
    repoContainerEl.textContent = 'No cities found.';
    return;
  }

  chosenCity.textContent = `${searchTerm.toUpperCase()} ${today.format('MMM D, YYYY')}`;
  
    windInfo.textContent= `${dataArray.list[0].wind.speed} km/h`;
    tempInfo.textContent = `${dataArray.list[0].main.temp} ° celsius `;
    humidityInfo.textContent = `${dataArray.list[0].main.humidity} % `;
   // datetoday.textContent =

   var iconcode = dataArray.list[0].weather[0].icon;
   var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $('#wicon').attr('src', iconurl);
   
  for (let data of dataArray) {
  
    const cardDiv = $('<div>');
    cardDiv.addClass = ('card text-white bg-dark mb-3 col-3');
    cardDiv.css('max-width', '18rem');

    const cardEl = $('<div>');
    cardEl.appendTo(cardDiv);
    
    const dateHeader = $('<div>')
        .addClass('card-header')
        .text(today);
      dateHeader.appendTo(cardEl);
    
      const cardtext = $('<p>');
      cardBodyEl.addClass('card-text')
      .text(`wind:${data.list[0].wind.speed} km/h
       temp : ${data.list[0].main.temp} ° celsius
      humidity: ${data.list[0].main.humidity} %`);


      cardtext.appendTo(cardEl);

      $('#nextdays').append(cardDiv);

    }};

searchform.addEventListener('submit', submitSearch);
btnEL.addEventListener('click', clickBtn);
