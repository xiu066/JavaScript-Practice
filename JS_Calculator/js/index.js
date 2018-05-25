//toDO list: 1. CE button

$(document).ready(function() { 
  var lastStep='';
  var lastlastStep='';
  var operatorCount=0;
  var decimalCount=0; 
  var canCE=0;
  
  //AC button click function
  $('.ac').click(function() {
    lastStep='';
    lastlastStep='';
    operatorCount=0;
    decimalCount=0;
    // canCE=0;
    $('#answer').html('0');
    $('#history').html('');
  });
  
//   //CE button click function
//   $('.ce').click(function() {
//     if (canCE==1) {
//       if (lastStep=='' || lastStep=='%' || (lastStep=='/' && this.value!=0) || lastStep=='*' || lastStep=='-' || lastStep=='+') {
//         lastStep=lastlastStep;
//         operatorCount=0;
//         canCE=0;
//         var currStr = $('#history').html();
//         var lastStr=currStr.slice(0,(currStr.length-1));
//         $('#history').html(lastStr);
//       } else {
        
//       }
//     }
    
//   });
  
  //number button click function
  $('.number').click(function() { 
    if ((/^[0-9]/).test(lastStep) || lastStep=='.') {
      // canCE=1;
      $('#answer').append(this.value);
      $('#history').append(this.value);
      lastlastStep=lastStep;
      lastStep=this.value;
    }
    else if (lastStep=='' || lastStep=='%' || (lastStep=='/' && this.value!=0) || lastStep=='*' || lastStep=='-' || lastStep=='+') {
      // canCE=1;
      $('#answer').html(this.value);
      $('#history').append(this.value);
      lastlastStep=lastStep;
      lastStep=this.value;
    }
  });
  
  //decimal button click function
  $('.decimal').click(function() {
    if (decimalCount==0 && ($('#history').html()=='' || (/^[0-9]/).test(lastStep)==false)) {
      // canCE=1;
      decimalCount=1;
      $('#answer').html(`0${this.value}`);
      $('#history').append(`0${this.value}`);
      lastlastStep=lastStep;
      lastStep=this.value;      
    }
    else if (decimalCount==0 && (/^[0-9]/).test(lastStep)) {
      // canCE=1;
      decimalCount=1;
      $('#answer').append(`${this.value}`);
      $('#history').append(`${this.value}`);
      lastlastStep=lastStep;
      lastStep=this.value;
    }
  });
  
  //% / * - + operator button click function
  $('.operator').click(function() {
    if ((/^[0-9]/).test(lastStep) && operatorCount==0) {
      // canCE=1;
      decimalCount=0;
      operatorCount=1;
      $('#history').append(this.value);
      lastlastStep=lastStep;
      lastStep=this.value;
    }
    else if ((/^[0-9]/).test(lastStep) && operatorCount==1) { 
      var a=equalTo();
      var aType=typeof a;
      if (aType=="number") {
        // canCE=1;
        decimalCount=0;
        operatorCount=1;
        $('#answer').html(`${a}`); 
        $('#history').html(`${a}${this.value}`);
        lastlastStep=lastStep;
        lastStep=this.value;  
      } else {//aType=="string"
        lastStep='';
        lastlastStep='';
        operatorCount=0;
        decimalCount=0; 
        // canCE=0;
        $('#answer').html(a); 
        $('#history').html('');
      }
    }  
  });
  
  $('.equal').click(function() {
    if ((/^[0-9]/).test(lastStep) && operatorCount==1) {
      var a=equalTo();
      var aType=typeof a;
      if (aType=="number") {
        // canCE=0;
        decimalCount=0;
        operatorCount=0;
        var aStr=`${a}`;
        $('#answer').html(aStr); 
        $('#history').html(aStr);
        lastlastStep=lastStep;
        lastStep='1';
        for (i=0;i<aStr.length;i++) {
          if (aStr[i]=='.') {
            decimalCount=1;
            break;
          }
        }
      } else {//aType=="string"
        lastStep='';
        lastlastStep='';
        operatorCount=0;
        decimalCount=0; 
        // canCE=0;
        $('#answer').html(a); 
        $('#history').html('');
      }
    }
  });
  function equalTo(){
    var str=$('#history').html();
    var arr=[];
    var num1, num2, int1,int2,result; 
    var zeroFlag=1;
    if (str[0]!='-') {
      for (i=0;i<=str.length;i++) {
        if (str[i]=='%' || str[i]=='/' || str[i]=='*' || str[i]=='-' || str[i]=='+') {
          arr=str.split(str[i]);
          num1= parseFloat(arr[0]);
          num2= parseFloat(arr[1]);
          int1= parseInt(arr[0]);
          int2= parseInt(arr[1]);
          for (j=0;j<arr[1].length;j++) {
            if (arr[1][j]!='0' && arr[1][j]!='.') {
              zeroFlag=0; 
              break;
            }
          }
          //console.log(arr[0],arr[1],num1,num2);
           if (str[i]=='%') {
             if (int1==num1 && int2==num2 && num2!=0) {
               return result=num1%num2;
             } 
             else if (int1==num1 && int2==num2 && num2==0)
             {
               return "Second number cannot be 0!!";
             } else {
               return "Must be two integers!!";
             }
            
           }
           else if (str[i]=='/') {
            if (zeroFlag==0) {
              return result=num1/num2;
            } else {
              return 'Divisor cannot be 0!!';
            }            
           }
           else if (str[i]=='*') {
            return result=num1*num2;
           }
           else if (str[i]=='-') {
            return result=num1-num2;
           }
           else if (str[i]=='+') {
             return result=num1+num2;
           } else {//zeroFlag==1, num2==0.0000...
             return 'Divisor cannot be 0!!';
           }
        } 
     }
    }
    else if (str[0]=='-') {
      for (i=1;i<=str.length;i++) {
        if (str[i]=='%' || str[i]=='/' || str[i]=='*' || str[i]=='-' || str[i]=='+') {
          arr=str.split(str[i]);
          num1= parseFloat(arr[0]);
          num2= parseFloat(arr[1]);
          for (j=0;j<arr[1].length;j++) {
            if (arr[1][j]!='0' && arr[1][j]!='.') {
              zeroFlag=0;
              break;
            }
          }
           if (str[i]=='%') {
            
            return result=num1%num2;
           }
           else if (str[i]=='/' && zeroFlag==0) {
            return result=num1/num2;
           }
           else if (str[i]=='*') {
            return result=num1*num2;
           }
           else if (str[i]=='-') {
            return result=num1-num2;
           }
           else if (str[i]=='+') {
             return result=num1+num2;
           } else {//zeroFlag==1, num2==0.0000...
             return 'error';
           }
        } 
      }
    }
      
  }
});