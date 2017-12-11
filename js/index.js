$(document).ready(function(){
  var sessionTime = 1, breakTime = 1,intervId = 0;
  var sessionSeconds = 60, breakSeconds = 60;
  var running = false;
  var x = document.getElementById("myAudio"); 
  console.log(x);
  $(".arrow").on("click",function(){
    if(($(".clock").hasClass('pauseInterval'))){
     stopTimer();
     $(".clock").removeClass('pauseInterval');
     $("#seconds").html("00");
     $(".liquid").css("height","0%"); 
     $("#state").html("Session"); 
    }
  });
  
  $(".session-less").on("click", function(){
    if(running == true)return;   
    sessionTime = parseInt($(".session").html());
    if(sessionTime == 1)return;
    $(".session").html((--sessionTime).toString());
    $("#minutes").html((sessionTime).toString());
    sessionSeconds = sessionTime *60;   
  });

  $(".session-more").on("click", function(){
    if(running == true)return;
    sessionTime = parseInt($(".session").html());
    $(".session").html((++sessionTime).toString());
    $("#minutes").html((sessionTime).toString());
    sessionSeconds = sessionTime *60;
  });

  $(".break-less").on("click", function(){
    if(running == true)return;
    breakTime = parseInt($(".break").html());
    if(breakTime == 1)return;
    $(".break").html((--breakTime).toString());
    breakSeconds = breakTime *60;
  });

  $(".break-more").on("click", function(){
    if(running == true)return;
    breakTime = parseInt($(".break").html());
    $(".break").html((++breakTime).toString());
    breakSeconds = breakTime *60;
  });

  var toggle = 1;
  $(".clock").on("click",function(){
    if(sessionSeconds == 0 || breakSeconds == 0)return;
    if (toggle % 2 ==0){
      console.log("upper");
      $(this).addClass('pauseInterval');
      running = false;
      toggle++;
    } else {
      console.log("lower");
       if($(this).hasClass('pauseInterval')){
          $(this).removeClass('pauseInterval');
       } else {
        runTimer();
       } 
        toggle++;
    }
  }); 
  
  function runTimer(){          
    var seconds = sessionSeconds + breakSeconds;    
    intervId = window.setInterval(function(){   
      if(!$('.clock').hasClass('pauseInterval')) {
        
        if(seconds == 0 || seconds == breakSeconds)
          playAudio();
         
         if(seconds == 0)
          seconds = sessionSeconds + breakSeconds;  
        
        running = true;
        seconds--;      
        if(seconds >= breakSeconds){
             displayTimer((seconds - breakSeconds),sessionSeconds);
             $("#state").html("Session"); 
        } else {
          displayTimer(seconds,breakSeconds);
          $("#state").html("Break"); 
          } 
      }
     }, 1000);           
  } 
  
  function displayTimer(seconds,totalTime){
    var timeSeconds= (seconds) %60; 
    $("#seconds").html(timeSeconds > 9 ?timeSeconds: "0" + timeSeconds);
    $("#minutes").html(Math.floor((seconds)/60));
    $(".liquid").css("height", ((1 - (seconds/totalTime))*100).toString() + "%");   
  } 
  
  function stopTimer(){
    clearInterval(intervId);
  }
  
  function playAudio() { 
    x.play(); 
   } 

   function pauseAudio() { 
      x.pause(); 
   } 

});