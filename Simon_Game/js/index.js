$(document).ready(function() {
  var arr=[];
  var count=0;
  var arrTest=[];
  var flag=0;
  var colors=["g", "r", "y", "b"];
  
  //start
  $("#start").click(function() {
    $("#start").css("display", "none");
    $("#reset").css("display","block");
    addCount();
    
  });
  
  //reset
  function reset(){
    arr=[];
    count=0;
    arrTest=[];
    flag=0;
    $("#count").html(count);
    $("#reset").css("display","none");
    $("#start").css("display", "block");
    $("#strict").css("background-color", "grey");
    $("#strict").css("border-style", "");
    $("#strict").css("border-width", "");
    $("#strict").css("border-color", "");
    $("#strict").html("strict"); 
    $("#count").css("background-color", "pink");
    $("#count").css("color", "grey");
  }
  //reset click
  $("#reset").click(function() {
    reset();
  });
  
  //strict
  $("#strict").click(function() {
    $("#strict").css("background-color", "orange");
    $("#strict").css("border-style", "dashed");
    $("#strict").css("border-width", "15px");
    $("#strict").css("border-color", "red");
    $("#strict").html("💀"); 
    $("#count").css("background-color", "red");
    $("#count").css("color", "white");
    flag=1;
  });
  
  //add count and show more colors sequence
  function addCount(){
    if (count==10) {
      alert("YOU WIN!!!");
      reset()
    } else {
      count++;
      $("#count").html(count);
      setTimeout(show, 1500);
    }  
  }
  
  //show colors sequence 
  function show() {
    randomBox();
    arrTest=[];
    for(i=0;i<arr.length;i++) { 
      arrTest.push(arr[i]);
      (function(num){ 
        setTimeout(function(){ 
          effect(arr[num]);
        },1000*num);
      })(i); 
    } 
    // console.log(arrTest);
  }
  
  //generate a random color
  function randomBox() {
    var index = Math.floor(Math.random() * 4);
    arr.push(index);
  }
  
    // color box click function
  $(".box").click(function() {
      var colorIndex=colors.indexOf($(this).attr('id'));
      effect(colorIndex);
      setTimeout(function() { 
        check(colorIndex);
      }, 250);
    }); 
 
    function check(x) {
      // console.log(arrTest);
      if (x==arrTest[0]) {         
        arrTest.shift();
        if (arrTest==false) {
          addCount();
        }
      } 
      else if (x!=arrTest[0] && flag==0) {
        alert("Wrong! One more chance!"); 
        arrTest=[];
        for(i=0;i<arr.length;i++) { 
          arrTest.push(arr[i]);
          (function(num){ 
            setTimeout(function(){ 
              effect(arr[num]);
            },1000*num);
          })(i);     
        } 
        // console.log(arrTest, arr);
      }
      else if (x!=arrTest[0] && flag==1) {
        alert("You lose!");
        reset();
      }
    }
     
  
  //color show and click effect
  function effect(a) {
    var audio = $(`audio[key="${a}"]`)[0];
    audio.play();    
    $(`#${colors[a]}`).css("-webkit-filter", "brightness(50%)");
    $(`#${colors[a]}`).css("filter", "brightness(50%)");
    $(`#${colors[a]}`).css("border-style", "inset");
    $(`#${colors[a]}`).css("border-width", "6px");
    $(`#${colors[a]}`).css("border-color", "grey");
    setTimeout (function() { 
      $(`#${colors[a]}`).css("-webkit-filter", "brightness(90%)");
      $(`#${colors[a]}`).css("filter", "brightness(90%)");
      $(`#${colors[a]}`).css("border-style", "");
      $(`#${colors[a]}`).css("border-width", "");
      $(`#${colors[a]}`).css("border-color", "");
    }, 250);
  }
});