var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var C, F;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lon = `lon=${position.coords.longitude}`;
      var lat = `lat=${position.coords.latitude}`;      
      console.log(lon, lat);
      getWeather(lon, lat);
     });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  
  
   $("#CnF").click(function() {
     if ($("#CnF").text()=="°C → °F") {
       $("#CnF").text("°F → °C");
       F=(C*1.8)+32;
       $("#temp").html(`${Math.round(F)}°F`);
     } else {
       $("#CnF").text("°C → °F");
       $("#temp").html(`${Math.round(C)}°C`);
     }
     
   });
 
  
  var getWeather = function(lon, lat){
    $.ajax({
      url: `${api}${lon}&${lat}`,
      type: 'GET', 
      success: function(d) {
      console.log(`${api}${lon}&${lat}`);
      content = d.quote;
      author = d.author;
      $("#city").html(d.name);   
      $("#icon").attr('src',d.weather[0].icon)
      $("#weather").html(d.weather[0].main);
      C=d.main.temp;
      $("#temp").html(`${Math.round(C)}°C`);
        
      
      }
    });
  }
   
});