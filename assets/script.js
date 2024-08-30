const searchform = document.querySelector('#form');
const searchCity= document.querySelector('#cityname');
const cityContainerEl = document.querySelector('#citycontainer');
const nextDays = document.querySelector('#nextdays');
const btnEL = document.querySelector('#city-btn');
const windInfo = document.querySelector('#windinfo');
const tempInfo = document.querySelector('#tempinfo');
const humidityInfo = document.querySelector('#humidityinfo');
const datetoday = document.querySelector('#todaydate');
const chosenCity = document.querySelector('#citychosen');
const today = dayjs();


const emptyContent = function (){

  windInfo.textContent = '';
  tempInfo.textContent = '';
  humidityInfo.textContent = '';
  chosenCity.textContent = '';
  datetoday.textContent = '';
  $('#nextdays').empty();
}

const submitSearch = function (event) {
    event.preventDefault();
  
    const cityName = searchCity.value.trim();
  
    if (cityName) {
      getCityInfo(cityName);
  emptyContent();
    } else {
      alert('Please enter a valid City');
    }
  };

  const clickBtn= function (event) {
    const citybtn = event.target.getAttribute('citybtn');
  
    if (citybtn) {
      featuredCities(citybtn);
      emptyContent();
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

/*const createButtons = function() {
  const getsearched = JSON.parse(localStorage.getItem('searchTerm'));
  if (getsearched !== null) {
    getsearched.forEach(searchTerm =>{
 const buttoncity = $('<button>');
 buttoncity.addClass=('btn btn-primary');
 buttoncity.setAttribute("citybtn", city.location);
 buttoncity.text = (`${getsearched}`);
 

 btnEL.append(buttoncity);

});
}}*/

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
        console.log(data.list);
        displayCities(data, data.city.name);
        cardNextDays(data);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert('Unable to find the city');
  });
};


const displayCities = function (dataObj, searchTerm) {

  if (dataObj.length === 0) {
    repoContainerEl.textContent = 'No cities found.';
    return;
  }

  chosenCity.textContent = `${searchTerm.toUpperCase()} ${today.format('MMM D, YYYY')}`;
  
    windInfo.textContent= `${dataObj.list[0].wind.speed} km/h`;
    tempInfo.textContent = `${dataObj.list[0].main.temp} ° celsius `;
    humidityInfo.textContent = `${dataObj.list[0].main.humidity} % `;

   var iconcode = dataObj.list[0].weather[0].icon;
   var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $('#wicon').attr('src', iconurl);

  localStorage.setItem('searchTerm', JSON.stringify(searchTerm));
  //createButtons();
};

function cardNextDays(dataO) {

for (let i = 0; i < 40 ; i+=8) {

    const wind = `${dataO.list[i].wind.speed}`;
    const humidity = `${dataO.list[i].main.humidity}`;
    const temp = `${dataO.list[i].main.temp}`;
    const unixTime =`${dataO.list[i].dt}`
    const date = dayjs.unix(unixTime).format('dddd, MMMM D, YYYY');
    const icon =`${dataO.list[i].weather[0].icon}`

    const cardDiv = $('<div>');
    cardDiv.addClass('card container d-flex mb-3 col-6 shadow p-3 mb-5 bg-white rounded');
    cardDiv.css('max-width', '18rem' );
    
    const cardEl = $('<div>');
    cardEl.appendTo(cardDiv);
    const dateHeader = $('<div>')
        .addClass('card-header')
        .text(date);
    dateHeader.appendTo(cardEl);
    const iconDiv = $('<div>').attr('id', 'icon');
      const iconImg = $('<img>')
      .attr('id', 'wicon')
      .attr('src', `http://openweathermap.org/img/w/${icon}.png`) // Replace '50d.png' with the actual icon code
      .attr('alt', 'Weather icon');

      iconDiv.append(iconImg);
      cardEl.append(iconDiv);

      const cardtext = $('<p>');
      cardtext.addClass('card-text');
      cardtext.text(`${temp} ° celsius`);
      cardtext.appendTo(cardEl);

      const createp = $('<p>');
      createp.text(`humidity: ${humidity} % `);
      createp.appendTo(cardtext);

      const createp2 = $('<p>');
      createp2.text(`Wind: ${wind} km/h`);
      createp2.appendTo(cardtext);

  

      $('#nextdays').append(cardDiv);

    }};

searchform.addEventListener('submit', submitSearch);
btnEL.addEventListener('click', clickBtn);
