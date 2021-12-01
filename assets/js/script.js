var searchBtn = document.querySelector("#city-search");
var cityl = document.querySelector("#city");
var scityname = document.querySelector("#city-name-search");
var prescontainer = document.querySelector("#previous-search-btns");
var upforecast = document.querySelector("#updated-forecast");
var curdate = document.querySelector("#current-date");
var curweathericon = document.querySelector("#weather-icon");
var curtemp = document.querySelector("#temperature-value");
var curhumidity = document.querySelector("#humidity-value");
var curwindspeed = document.querySelector("#wind-speed-value");
var curuvindex = document.querySelector("#uv-index");
var forecastcontainer = document.querySelector("#weather-forecast-container");
forecastcontainer.addClass = "row";
var lastsearch;

var savcity = JSON.parse(localStorage.getItem('cities')) || [];

function viewCity(data) {
    var lastsearch = document.createElement("div");
    lastsearch.setAttribute("id", "previous-search");
    lastsearch.innerHTML = data[0].name;
    prescontainer.appendChild(lastsearch);

    lastsearch.addEventListener("click", function() {
        var precity = lastsearch.innerHTML;
        findWeather(precity);
        scityname.innerHTML = precity;
    })
}

function viewPastCities(data) {
    for (var i = 1; i <= localStorage.length; i++) {
        viewCity(data);
    }
}

function findWeather(city) {
    var apiKey = '91d4161a1433d45e7d7152f7adf492fd'

    var Url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    fetch(Url)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            if (data.length === 0) {
                clearPage();

                alert("Try again and check spelling");
            }
            else {
                if (savcity.includes(data[0].name)) {
                    console.log('Nope');
                }
                else {
                    savcity.push(data[0].name)

                    localStorage.setItem('cities', JSON.stringify(savcity));
                    viewPastCities(data);
                }

                var curdateEl = moment().format("(MM/DD/YYYY)");
                curdate.innerText = curdateEl;

                var lon = data[0].lon
                var lat = data[0].lat

                var cwUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

                fetch(cwUrl)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(data) {
                        var curweathericonEl = data.current.weather[0].icon;
                        curweathericon.setAttribute("src", "http://openweathermap.org/img/wn/" + curweathericonEl + "@2x.png");

                        curtemp.innerHTML = data.current.temp = " °F";
                        curhumidity.innerHTML = data.current.humidity + " %";
                        curwindspeed.innerHTML = data.current.wind_speed + " mph";

                        curuvindex.innerHTML = data.current.uvi;
                        if(data.current.uvi <= 3) {
                            curuvindex.style.backgroundColor = "green";
                        }
                        else if (data.current.uvi > 3 && data.current.uvi <= 6) {
                            curuvindex.style.backgroundColor = "yellow";
                        }
                        else if (data.current.uvi > 6 && data.current.uvi <= 8) {
                            curuvindex.style.backgroundColor = "orange";
                        }
                        else {
                            curuvindex.style.backgroundColor = "red";
                        }

                        function addCard() {
                            forecastcontainer.innerHTML = "";

                            for (i = 0; i <= 4; i++) {
                                var nCard = document.createElement("div");
                                nCard.className = "card";
                                nCard.setAttribute("id", "card-style");
                                forecastcontainer.appendChild(nCard);

                                var cardBod = document.createElement("div");
                                cardBod.className = "card-body";

                                var cardTit = document.createElement("div");
                                cardTit.className = "day-title";

                                var curDateEl = moment().add(i + 1, 'days').format("(MM/DD/YYYY)");
                                cardTit.innerHTML = curDateEl;

                                var cardIco = document.createElement("img");
                                cardIco.className = "day-icon";
                                var dailyWeatherIco = data.daily[i].weather[0].icon;
                                cardIco.setAttribute("src", "http://openweathermap.org/img/wn/" + dailyWeatherIco + "@2x.png");

                                var cardTem = document.createElement("p");
                                cardTem.className = "day-temp";
                                cardTem.innerHTML = "Temp: " + data.daily[i].temp.max + " °F";

                                var cardWin = document.createElement("p");
                                cardWin.className = "day-wind";
                                cardWin.innerHTML = "Wind: " + data.daily[i].wind_speed + "mph";

                                var cardHum = document.createElement("p");
                                cardHum.className = "day-humidity";
                                cardHum.innerHTML = "Humidity: " + data.daily[i].wind_speed + "%";

                                nCard.appendChild(cardBod);
                                cardBod.appendChild(cardTit);
                                cardBod.appendChild(cardIco);
                                cardBod.appendChild(cardTem);
                                cardBod.appendChild(cardWin);
                                cardBod.appendChild(cardHum);
                            }
                        }

                        addCard();

                    })
            }
        })
}

function viewCityClick(event) {
    event.preventDefault();

    var searchCity = cityl.value;
    findWeather(searchCity);
    scityname.innerHTML = searchCity;
}

function clearPage() {
    scityname.innerHTML = "";
    curdate.innerHTML = "";
    curweathericon.setAttribute("src", "");
    curhumidity.innerHTML = "";
    curwindspeed.innerHTML = "";
    curuvindex.innerHTML = "";
    forecastcontainer.innerHTML = "";
}

searchBtn.addEventListener("click", viewCityClick);