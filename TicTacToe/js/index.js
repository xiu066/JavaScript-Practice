$(document).ready(function() { 
  var level="";
  var player="";
  var computer="";
  var OXSelect=0;
  var levelSelect=0;
  var currentTurn="";
  var arr=["1","2","3","4","5","6","7","8","9"];
  
  //settings page 
  $("#O").click(function() {
    player="O";
    computer="X";
    currentTurn="player";
    OXSelect = 1;
    $("#X").html("");
    $("#select1").html("Mark selected:");
  }); 
  $("#X").click(function() {
    player="X";
    computer="O";
    currentTurn="computer";
    OXSelect = 1;
    $("#O").html("");
    $("#select1").html("Mark selected:");    
  });
  $("#easy").click(function() {
    level="easy";
    levelSelect = 1;
    $("#normal").html("");
    $("#hard").html("");
    $("#select2").html("Difficulty selected:");
  }); 
  $("#normal").click(function() {
    level="normal";
    levelSelect = 1;
    $("#easy").html("");
    $("#hard").html("");
    $("#select2").html("Difficulty selected:");
  });  
   
  $("#submitForm").click(function() { 
    if (levelSelect==1 && OXSelect==1) {
      if (player=="X") {
        setTimeout(AI,500);//AI starts
      }
      $(".container").css("display", "block");
      $(".form").css("display", "none");
    } else {
      alert("Please select your mark and game difficulty!!!")
    } 
    
  });
  
  //let's play!  
  $(".btn").click(function() {
    if ($(this).html()=="" && currentTurn=="player") {       	
      arr.splice(arr.indexOf($(this).attr("id")), 1);  
      $(this).html(player);
      currentTurn="computer";
      setTimeout(checkWin,600);
      setTimeout(AI,700);
    }   
  });
  
  //play again
  $("p").mouseover(function() {
    $(this).css("color","red");
  });
  $("p").mouseout(function() {
    $(this).css("color","yellow");
  });
  $("p").click(function() {//game reset
    $(".xWin").css("display", "none");
    $(".oWin").css("display", "none");
    $(".draw").css("display", "none");
    $(".form").css("display", "block");
    
    $("#select1").html("Select your mark:");
    $("#O").html("⭕"); 
    $("#X").html("❌");    
    $("#select2").html("Select difficulty:");
    $("#easy").html("🙂"); 
    $("#normal").html("😎"); 
    $("#hard").html("😈"); 
       
    $("#1").html("");
    $("#2").html("");
    $("#3").html("");
    $("#4").html("");
    $("#5").html("");
    $("#6").html("");
    $("#7").html("");
    $("#8").html("");
    $("#9").html("");
    
    level="";
    player="";
    computer="";
    OXSelect=0;
    levelSelect=0;
    currentTurn="";
    arr=["1","2","3","4","5","6","7","8","9"];
  });
  
  //win or lose?
  function checkWin() {
    var lot_1=$("#1").html(),
       lot_2=$("#2").html(),
       lot_3=$("#3").html(),
       lot_4=$("#4").html(),
       lot_5=$("#5").html(),
       lot_6=$("#6").html(),
       lot_7=$("#7").html(),
       lot_8=$("#8").html(),
       lot_9=$("#9").html();
    if (lot_1+lot_2+lot_3=="XXX" || lot_4+lot_5+lot_6=="XXX" || lot_7+lot_8+lot_9=="XXX" || lot_1+lot_4+lot_7=="XXX" || lot_2+lot_5+lot_8=="XXX" || lot_3+lot_6+lot_9=="XXX" || lot_1+lot_5+lot_9=="XXX" || lot_3+lot_5+lot_7=="XXX") {
      $(".container").css("display", "none");
      $(".xWin").css("display", "block"); 
    }
    else if (lot_1+lot_2+lot_3=="OOO" || lot_4+lot_5+lot_6=="OOO" || lot_7+lot_8+lot_9=="OOO" || lot_1+lot_4+lot_7=="OOO" || lot_2+lot_5+lot_8=="OOO" || lot_3+lot_6+lot_9=="OOO" || lot_1+lot_5+lot_9=="OOO" || lot_3+lot_5+lot_7=="OOO") {
      $(".container").css("display", "none");
      $(".oWin").css("display", "block");
    }
    else if (lot_1!="" && lot_2!="" && lot_3!="" && lot_4!="" && lot_5!="" && lot_6!="" && lot_7!="" && lot_8!="" && lot_9!="") {
      $(".container").css("display", "none");
      $(".draw").css("display", "block");
    }
  }
  //easy AI
  function AI() {
    //easy AI
    if (level=="easy") {
      var index = Math.floor(Math.random() * arr.length);
      $(`#${arr[index]}`).html(computer);
      setTimeout(checkWin,600);
      arr.splice(index, 1);
      currentTurn="player";
    }
    //normal AI
    else if (level=="normal") {
      var test_0= [$("#1").html(), $("#2").html(), $("#3").html()],
         test_1= [$("#4").html(), $("#5").html(), $("#6").html()],
         test_2= [$("#7").html(), $("#8").html(), $("#9").html()],
         test_3= [$("#1").html(), $("#4").html(), $("#7").html()],
         test_4= [$("#2").html(), $("#5").html(), $("#8").html()],
         test_5= [$("#3").html(), $("#6").html(), $("#9").html()],
         test_6= [$("#1").html(), $("#5").html(), $("#9").html()],
         test_7= [$("#3").html(), $("#5").html(), $("#7").html()];
      var arrTest= [test_0.join(""), test_1.join(""), test_2.join(""), test_3.join(""), test_4.join(""), test_5.join(""), test_6.join(""), test_7.join("")]; 
      var arrI=[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];
      var sum=0;
      //offense first
      if (sum==0) {
        for (i=0;i<arrTest.length;i++) {
          if (arrTest[i]==computer+computer) {
            for (j=0;j<arrI[i].length;j++) {
              if ($(`#${arrI[i][j]}`).html()=="") {
                $(`#${arrI[i][j]}`).html(computer);
              }
            }
            break;
          } else {
            sum += 1;
          } 
        }
      }
      //defense second
      if (sum==arrTest.length) {
        for (i=0;i<arrTest.length;i++) {
          if (arrTest[i]==(player+player)) {
            for (j=0;j<arrI[i].length;j++) {
              if ($(`#${arrI[i][j]}`).html()=="") {
                $(`#${arrI[i][j]}`).html(computer);
              }
            }
            break;
          } else {
            sum += 1;
          } 
        }
      }
      //random play
      if (sum==(2*(arrTest.length))) {
        var index = Math.floor(Math.random() * arr.length);
        $(`#${arr[index]}`).html(computer);
      }
      setTimeout(checkWin,600);
      arr.splice(index, 1);
      currentTurn="player";    
    }
    //hard AI
    else if (level=="hard") {
      
    }
  }
  
   
});