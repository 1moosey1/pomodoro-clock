var breakTime = 1, sessionTime = 25, 
    running = false, session,
    minutes, seconds, timeout;

$(document).ready(function() {
  
  $("#break-minus").click(function() { decrement(false); });
  $("#break-plus").click(function() { increment(false); });
  $("#session-minus").click(function() { decrement(true); });
  $("#session-plus").click(function() { increment(true); });
  $("#timer").click(timerClicked);
});

function decrement(bos) {
  
  if(running)
    return;
  
  if(bos && sessionTime > 1) {
    
    sessionTime--;
    $("#session-time").html(sessionTime);
    $("#time").html(sessionTime + ":00");
  } 
  else if(!bos && breakTime > 1) {
      
    breakTime--;
    $("#break-time").html(breakTime);
  }
}

function increment(bos) {

  if(running)
    return;
  
  if(bos && sessionTime < 99) {
    
    sessionTime++;
    $("#session-time").html(sessionTime);
    $("#time").html(sessionTime + ":00");
  } 
  else if(!bos && breakTime < 99) {
      
    breakTime++;
    $("#break-time").html(breakTime);
  }
}

function timerClicked() {
  
  if(!running) {
    
    session = true;
    minutes = sessionTime;
    seconds = 0;
    
    timeout = setInterval(tick, 1000);
    running = true;
    $("#current").html("Session");
    $("#time").html(minutes + ":" + formatSec(seconds));
    updateCircle();
  }
  else {
    
    window.clearTimeout(timeout);
    running = false; 
  }
}

function tick() {
      
  seconds--;
  if(seconds < 0) {
    
    minutes--;
    if(minutes < 0)  
      switchTimes();
    else
      seconds = 59;
  }
  
  $("#time").html(minutes + ":" + formatSec(seconds));
  updateCircle();
}

//Switches between break time and session time
function switchTimes() {
  
  if(session) {
    minutes = breakTime;
    session = false;
    $("#current").html("Break");
  }
  else {
    minutes = sessionTime;
    session = true;
    $("#current").html("Session");
  } 
  seconds = 0;
}

function updateCircle() {

  var degree, secondsRemaining, totalSeconds, percent;
  
  if(session)
    totalSeconds = sessionTime * 60;
  else
    totalSeconds = breakTime * 60;
  
  secondsRemaining = (minutes * 60) + seconds;
  percent = (1.0 - (secondsRemaining/totalSeconds));
  degree = 90 + (percent * 360.0);
  
  if(percent <= .5)
    $(".circle").css("background-image", 
      "linear-gradient("+degree+"deg, transparent 50%, #93C993 50%),\
      linear-gradient(90deg, #93C993 50%, transparent 50%)");
  else {
    degree-=180;
    $(".circle").css("background-image",
      "linear-gradient("+degree+"deg, transparent 50%, #4CA64C 50%),\
      linear-gradient(90deg, #93C993 50%, transparent 50%)");
  }
}

// Add extra 0 when seconds less than 10
function formatSec(x) {
  return (x < 10) ? "0" + x : x; 
}