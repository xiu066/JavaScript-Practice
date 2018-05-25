var workTime=0;
var breakTime=0;
var f;

//range set
var work = document.querySelector("#work");
function workValue(){
  var newValue = work.value;
  workTime=newValue*60;
  var target = document.querySelector("#working");
  target.innerHTML = `${newValue}:00`;
};
work.addEventListener("input", workValue);

var breaker = document.querySelector("#break");
function breakValue(){
  var newValue = breaker.value;
  breakTime=newValue*60;
  var target = document.querySelector("#breaking");
  target.innerHTML = `${newValue}:00`;
};
breaker.addEventListener("input", breakValue);

//reset 
function reset() {
  
  //range to 0
  work.value=0;
  breaker.value=0;
  
  //timer to 0
  workTime=0;
  breakTime=0;
  
  //html to 0
  $("#working").html("0:00");
  $("#breaking").html("0:00");
  
}

//start/stop hover count
 function startCount(){
  if (workTime+breakTime>0) {
    $(".start").replaceWith('<button class="btn btn-block btn-primary stop" onclick="stopCount()">STOP</button>');
    f=setInterval(countdown, 1000); 
  }   
} 

function stopCount(){
   $(".stop").replaceWith('<button class="btn btn-block btn-primary start" onclick="startCount()">START</button>');
   clearInterval(f); 
}

function countdown() {
  if (workTime>0) {
    workTime--; 
    var workMins=`${Math.floor(workTime/60)}`;
    if ((workTime%60)<10) {
      var workSecs=`0${workTime%60}`;
    } else {
      var workSecs=`${workTime%60}`;
    }
    $("#working").html(`${workMins}:${workSecs}`);     
  }  
  else if (workTime==0 && breakTime>0) {
    breakTime--; 
    var breakMins=`${Math.floor(breakTime/60)}`;
    if ((Math.floor(breakTime%60))<10) {
    var breakSecs=`0${Math.floor(breakTime%60)}`;
     }  else {
    var breakSecs=`${Math.floor(breakTime%60)}`;
     }
    $("#breaking").html(`${breakMins}:${breakSecs}`);
  } else {
    stopCount();
  }
}