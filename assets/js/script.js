var cday = document.querySelector("#currentDay");
var currentdate = moment();
// cday.textContent = currentdate.format("ddd, MMMM Do");

$(document).ready(function () {
  // variable to hold the user's city input
  var city = "";
  // vaiable to hold the latitude and longitude of the city that was called
  var lat = "";
  var lon = "";
  
  // This is another call to the API to retrieve the rest of the current weather and daily weather
  function weatherGrabAPI(a,b) {
    weathURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

    // The actual API key to get the rest of the current weathre and 5 day forecast
    $.ajax({
      url: weathURL2,
      method: "GET"
    }) .then(function(response) {
      console.log(response);

      // This will remove the data that was in the 5-day forecast previously
      // $("#fiveday").empty();

      // Grabs the weather icon and adds it to the page
      var icon = response.current.weather[0].icon;
      console.log(icon);
      var iconImg = $("<img>");
      iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
      console.log(iconImg);
      $("#city").append(iconImg);

      // populates the IDs with the weather data
      $("#temp").text("Temperature: " + response.current.temp + "° F");
      $("#humidity").text("Humidity: " + response.current.humidity + "%");
      $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
      $("#uv-index").text("UV Index: " + response.current.uvi);

      // This dispalys the html to the user
      $("currentweather").css({"display":"block"});

        // Target, div creation for iframe
        let iFrameDiv = document.createElement("div");

        document.body.style.backgroundImage = "";

        // Clouds
        if (response.current.weather[0].main == "Clouds") {
            iFrameDiv;
            document.body.style.backgroundImage = "url(./Images/eberhard-grossgasteiger-pgTu7tevuro-unsplash.jpg";

        // Clear
        } else if (response.current.weather[0].main = "Clear") {
            iFrameDiv;
            document.body.style.backgroundImage = "url(./Images/mosi-knife--PVgDgKXgZA-unsplash.jpg";

        // Thunderstorm
        } else if (response.current.weather[0].main = "Thunderstorm") {
            iFrameDiv;
            document.body.style.backgroundImage = "url(./Images/johannes-plenio-ESL1rIs9j48-unsplash.jpg";
        
        // Drizzle
        } else if (response.current.weather[0].main = "Drizzle") {
            iFrameDiv;
            document.body.style.backgroundImage = "url(./Images/ed-leszczynskl-R3ofE-8DyLk-unsplash.jpg)";
        
        // Rain
        } else if (response.current.weather[0].main = "Rain") {
            iFrameDiv;
            document.body.style.backgroundImage = "url(./Images/josh-wilburne-6qtdLAQXmgs-unsplash.jpg)";

        // No weather at all?
        } else {
            console.log("Weather has stopped existing. Please make sure you are still connected to the third dimension.")
        };
    })
  };

  // This function calls the weather API and inputs the users values
  function weatherGrab() {
    var weathURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7";
    $.ajax({
      url: weathURL,
      method: "GET"
    }).then(function (response) {
      // this will grab the latitude and longitude of the city that was input
      lat = response.coord.lat;
      lon = response.coord.lon;

      // Add the city and state to the html for the current weather section
      $("#city").text(response.name);
      $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));

      localStorage.setItem("cityname", response.name);

      weatherGrabAPI(lat,lon);
    });
  };

  function searchButton() {
    city = $("input").val().trim();

    // Below is a function that will clear out the input field
    $("input").val("");

    weatherGrab();
  };

  // This is calling the submition of the user's input of the city name
  $("#cityform").submit(function(event) {
    event.preventDefault();
    searchButton();
  });

  $("#citysubmit").click(function(event) {
    event.preventDefault();
    searchButton();
  });

});