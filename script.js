var runsound = new Audio("run.mp3");
var jumpsound = new Audio("jump.mp3");
var deadsound = new Audio("Die Sound Effect.mp3");
var backgroundsound = new Audio("background.mp3");

// var runStart = 0;

function keyCheck(event) {
  var keycode = event.which;

  if (keycode == 13) {
    //Enter
    if (runWorker == 0) {
      runWorker = setInterval(run, 100);
      runsound.play();
      backgroundsound.play();

      backgroundWorker = setInterval(background, 100);
      scoreWorker = setInterval(updateScore, 300);
      boxWorker = setInterval(moveBoxes, 100);
    }
  }

  if (keycode == 32) {
    //Space
    if (jumpWorker == 0) {
      clearInterval(runWorker);
      runsound.pause();

      jumpWorker = setInterval(jump, 100);
      jumpsound.play();
    }
  }
}

var runImgNumber = 0;
var runWorker = 0;

function run() {
  runImgNumber = runImgNumber + 1;

  if (runImgNumber == 9) {
    runImgNumber = 2;
  }

  document.getElementById("boy").src = "Run (" + runImgNumber + ").png";
}

var backgroundPositionX = 0;
var backgroundWorker = 0;

function background() {
  backgroundPositionX = backgroundPositionX - 20;

  document.getElementById("background").style.backgroundPositionX =
    backgroundPositionX + "px";
}

var jumpImgNumber = 1;
var jumpWorker = 0;

var boyMarginTop = 310;

function jump() {
  if (jumpImgNumber <= 6) {
    boyMarginTop = boyMarginTop - 40;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (jumpImgNumber >= 7) {
    boyMarginTop = boyMarginTop + 40;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  jumpImgNumber = jumpImgNumber + 1;

  if (jumpImgNumber == 13) {
    jumpImgNumber = 1;
    clearInterval(jumpWorker);
    runWorker = setInterval(run, 100);
    runsound.play();
    backgroundsound.play();
    jumpWorker = 0;
  }

  if (backgroundWorker == 0) {
    backgroundWorker = setInterval(background, 100);
  }

  if (scoreWorker == 0) {
    scoreWorker = setInterval(updateScore, 300);
  }

  if (boxWorker == 0) {
    boxWorker = setInterval(moveBoxes, 100);
  }

  document.getElementById("boy").src = "Jump (" + jumpImgNumber + ").png";
}

var score = 0;
var scoreWorker = 0;

function updateScore() {
  score = score + 5;

  if (score >= 1000) {
    runsound.pause();
    jumpsound.pause();

    clearInterval(runWorker);
    runWorker = -1;

    clearInterval(jumpWorker);
    jumpWorker = -1;

    clearInterval(backgroundWorker);
    backgroundWorker = -1;

    clearInterval(boxWorker);
    boxWorker = -1;
    window.location = "won.html";
  }

  document.getElementById("score").innerHTML = score;
}

var bml = 300; //box marginal left

function createboxes() {
  for (var i = 0; i < 150; i++) {  //for loop
    var box = document.createElement("div");
    box.className = "box";
    box.id = "box" + i;

    if (i <= 25) {
      bml = bml + 600;
    }

    if (i >= 30) {
      bml = bml + 400;
    }

    if (i >= 30) {
      bml = bml + 350;
    }

    if (i >= 14) {
      bml = bml + 200;
    }

    box.style.marginLeft = bml + "px";

    document.getElementById("background").appendChild(box);
  }
}
var boxWorker = 0;

function moveBoxes() {
  for (var i = 0; i < 150; i++) {
    var box1 = document.getElementById("box" + i);
    var current = getComputedStyle(box1).marginLeft;
    var newcurrent = parseInt(current) - 22;

    box1.style.marginLeft = newcurrent + "px";

    //  alert(newcurrent);

    if ((newcurrent >= 80) & (newcurrent <= 200)) {
      if (boyMarginTop > 280) {
        clearInterval(runWorker);
        runWorker = -1;
        runsound.pause();

        clearInterval(jumpWorker);
        jumpWorker = -1;
        jumpsound.pause();

        clearInterval(backgroundWorker);
        backgroundWorker = -1;
        backgroundsound.pause();

        clearInterval(boxWorker);
        boxWorker = -1;

        clearInterval(scoreWorker);
        scoreWorker = -1;

        deadWorker = setInterval(dead, 100);
        deadsound.play();
      }
    }
  }
}

var deadImgNumber = 1;
var deadWorker = 0;

function dead() {
  deadImgNumber = deadImgNumber + 1;

  if (deadImgNumber == 11) {
    deadImgNumber = 10;
    document.getElementById("boy").style.marginTop = "310px";
    document.getElementById("end").style.visibility = "visible";
    document.getElementById("endscore").innerHTML = score;
  }

  document.getElementById("boy").src = "Dead (" + deadImgNumber + ").png";
}

function reload() {
  window.location = "start.html";
}
function gameRun() {
  window.location = "index.html";  //village
}
function amazonclickStart() {
  window.location = "level2.html";  //Amazon
}
function fairyclickStart() {
  window.location = "level3.html";  //fairy jungle
}
function hallclickStart() {
  window.location = "level4.html";
}
function desclickStart() {
  window.location = "level5.html";
}
function alienclickStart() {
  window.location = "level6.html";
}
function choose() {
  window.location = "choose.html";
}
function backToIndex() {
  window.location = "start.html";
}
