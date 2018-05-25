$(document).ready(function() {
  var arr=["freecodecamp", "beyondthesummit", "samgreenmedia", "riotgames"];
  arr.forEach(function(a) {
    $.getJSON(`https://wind-bow.gomix.me/twitch-api/channels/${a}?callback=?`, function(data) {
      console.log(data);
      $(`#channel_${arr.indexOf(a)}`).html(`<div class="col-xs-3 logo"><a href=${data.url} target="_blank"><img src=${data.logo} alt=${data.display_game} /> 
<p class="name">${data.display_name}</p></a></div>`);
  });
  
    $.getJSON(`https://wind-bow.gomix.me/twitch-api/streams/${a}?callback=?`, function(data) {
      console.log(data);
      if (data.stream === null) {
        $(`#channel_${arr.indexOf(a)}`).append(`<div class="col-xs-3"><p class="offline">Offline</p></div>
<div class="col-xs-4"><p class="offline">No live stream！</p></div>`);
      } else {
        $(`#channel_${arr.indexOf(a)}`).append(`<div class="col-xs-3"><p class="online">Online</p></div>
<div class="col-xs-4"><p class="online">LIVE: ${data.stream.game}</p></div>`);  
      }
   });
  });
  
  
  
});