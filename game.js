//Thanks, stackoverflow!
//This disables scrolling with arrow keys.

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//None game variables
loadingTime = 5500 //5500 for non-development;

var audio = true;

var shadows = true;

var arrows = true;

//Initalizing variables
var lvl = l1;

var shadowsInit = false;

var score = -1;

var amtOfCols = lvl.cols;
var amtOfRows = lvl.cols/2; // should be amtOfCols/2 for squares

var maxX = amtOfCols - 1;
var maxY = amtOfRows - 1;

var cellHeight, cellWidth;
var moveHeight, moveWidth;

var ec = [];
var es = [];

var amtOfEnemies = lvl.ecords.length;

var ws = [];
var wc = lvl.wcords;

var endc = lvl.endcoords;

var pc = lvl.pcords;

var pInit = false;

var speed = 1;

var gameActive = false;

var winText = ["you rocked that level!", "great job!", "whoah! nice moves!", "wow!", "that level was easy, wasn't it?", "you taught those red squares a lesson!", "those red squares had no chance", "the developer had trouble on that one!", "excellent work!", "that level was as easy as your mom"];
var loseText = ["ha rekt", "well, that didn't work", "you got a gold star with 'you tried' on it.", "my mom could have done that better", "the developer coded that to be easy", "why did you move there???", "you had no chance", "you had so much potential. jk", "well, at least the red squares are less hungry.", "that explosion at the end was cool, right?", "this was actually supposed to be a replacement for level 1...", "fun fact: watching you fail is fun."];

lvlnum = 0;

var initVars = function() {
  //Initalizing variables

  amtOfCols = lvl.cols;
  amtOfRows = lvl.cols/2; // should be amtOfCols/2 for squares

  maxX = amtOfCols - 1
  maxY = amtOfRows - 1;

  ec = [];
  es = [];

  amtOfEnemies = lvl.ecords.length;

  ws = [];
  wc = lvl.wcords;

  pc = lvl.pcords;

  endc = lvl.endcoords;

  pInit = false;

  speed = 1;

  gameActive = false;
};

var setLvlNum = function(num) {
  lvlnum = num;
}

var initsizes = function() {
  var innerWindowHeight = $(window).height;
  var innerWindowWidth = $(window).width;
  $('body').height(innerWindowHeight); // why do I have to do this
  $('body').width(innerWindowWidth);
}

var updateVals = function() {
  var width = $('#game-background').width();
  var height = width/2;
  $('#game-background').height(height+' !important');
  $('#game-container').width(width); //weird stuff with corners and crap
  $('#game-container').height(height + 2);
  cellWidth = width/amtOfCols - 1;
  cellHeight = height/amtOfRows - 1;
  actW = cellWidth + 1;
  actH = cellHeight + 1;
  moveW = cellWidth + 2; //2 included because of grid lines' widths/heights
  moveH = cellHeight + 2; //also player's -1
  $('#player').height(cellHeight + 1);
  $('#player').width(cellWidth + 1);
  $('.enemy').height(cellHeight + 1);
  $('.enemy').width(cellWidth + 1);
  $('.wall').height(cellHeight);
  $('.wall').width(cellWidth);
  $('.wall-shadow').height(cellHeight*2 + 3);
  $('.wall-shadow').width(cellWidth*2 + 3);
  $('#pend').width(cellWidth);
  $('#pend').height(cellHeight);
}
updateVals();

var lvlwon = false;
var lvllost = false;
//Player!

var Player = function() {
  this.x = 0;
  this.y = 0;
  this.html = "<div id='player' style='transition: margin-left 0.1s, margin-top 0.1s, -webkit-transform 0.75s, transform 0.75s ease-in-out; -webkit-transform 0.75s, transform 0.75s, -webkit-transition: margin-left 0.1s, margin-top 0.1s ease-in-out'><div id='player-mask' class='background-full'><div class='square-gradient'></div><img class='shadow' id='p-shadow' src='shadow-bottomleft.png'/></div></div>"
  this.speed = speed;
  this.speed1 = this.speed + 1;
  this.id = '#player';
  this.type = 'player';
  this.init = function() {
    $('#'+this.type+'-background').append(this.html);
    this.update();
    score = 0;
    $('#highscore').html("best: 0");
    $('#score').html("moves: 0");
    pInit = true;
  }
  this.place = function(x, y) {
    this.x = x;
    this.y = y;
    this.init();
  }
  this.die = function() {
    lvllost = true;
    if(lvlwon === false) {
      createAudio("death2");
      setTimeout(function() {deleteAudio("death2")}, 2500);
      createAudio("death");
      setTimeout(function() {deleteAudio("death")}, 2500);
    }
    randLoseText = loseText[Math.floor(Math.random()*loseText.length)];
    $('#message').html(randLoseText+"<br>hit the button below to try again.");
    $('#menu-message').html(randLoseText+" - hit the left or middle button to try again.");
    $('#message').css('color', 'red');
    $('#menu-message').css('color', 'red');
    explosion = new Explosion(this.x, this.y, 15, 25, 'red', 'red', 'black', 'orange', 'yellow');
    explosion.init();
    explosion.explode();
    highscore = 0;
    score = 0;
    $('#highscore').html("best: "+lvl.highscore);
    if(lvl.highscore === 398245293723495870) {
      $('#highscore').html("best: 0");
    }
    else {
      $('#highscore').html("best: "+lvl.highscore);
    }
    $('#score').html("moves: oops");
    deleteGame();
  }
  this.win = function() {
    setTimeout(function() {
      if(score < lvl.highscore) {
        lvl.highscore = score;
      }
      $('#highscore').html("best: "+lvl.highscore);
    }, 100);
    lvlwon = true;
    createAudio("win");
    setTimeout(function() {deleteAudio("win")}, 2250);
    var winRandText = winText[Math.floor(Math.random()*winText.length)];
    $('#message').html(winRandText+"<br>click play to try the next level");
    $('#menu-message').html(winRandText+" - click the left button to try again or the middle one to continue")
    $('#message').css('color', 'green');
    $('#menu-message').css('color', 'green');
    explosion = new Explosion(this.x, this.y, 15, 25, '#51D41A', '#8EE668', '#6FDD41', '#37AF05', '#298A00');
    explosion.init();
    explosion.explode();
    $('#p-shadow').css("opacity", "0");
    $(this.id).css("transform", "rotate(360deg)");
    $(this.id).css("-webkit-transform", "rotate(360deg)");
    $(this.id).css("z-index", 1000000000);
    var that = this;
    setTimeout(function() {$(that.id).fadeTo(250, 0);}, 750);
    setTimeout(function() {deleteGame(); $(that.id).css('z-index', 0); $('#p-shadow').css("opacity", "0.5"); $(that.id).css("transform", "rotate(0deg)"); $(that.id).css("-webkit-transform", "rotate(0deg)");}, 1000);
  }
  this.remove = function() {
    $(this.id).remove();
  }
  this.update = function() {
    score += 1;
    $('#score').html('moves: '+score);
    if(score < lvl.highscore) {
      highscore = score;
    }
    if(lvl.highscore === 398245293723495870 || lvl.highscore ===  0) {
      $('#highscore').html('best: '+highscore);
    }
    $(this.id).css("margin-left", this.x*actW);
    $(this.id).css("margin-top", this.y*actH);
    if(checkForEnemy(this.x, this.y)) {
      this.die();
    }
  }
  this.hitDetection = function() {
    if(enemyCheck(this.x, this.y)) {
      this.die();
    }
    if(checkForPend(this.x, this.y)) {
      this.win();
    }
    else {
      var randNum = Math.floor(Math.random()*5);
      createAudio('pmove'+randNum);
      setTimeout(function() {deleteAudio('pmove'+randNum)}, 750);
    }
  }
  this.left = function(dist) {
    if(this.x - dist <= 0) {
      dist = this.x;
    }
    //BELOW IS A FAILED ATTEMPT AT WALL DETECTION WITH SPEED
    //THE STUPID FOR LOOP KEPT ON BREAKING FOR SOME REASON
    //DO NOT USE WALLS WITH SPEED < 1!!!!!!!!!!!!!!
    // for(i = 1; i < (this.speed1); i++) {
    //   var wallCheck = checkForWall((this.x - i), this.y);
    //   alert(wallCheck);
    //    if(wallCheck != -1) {
    //      alert(wallCheck);
    //      dist = Math.abs(wc[wallCheck][0] - this.x) - (i - 1));
    //    }
    // }
    var wallCheck = checkForWall(this.x - dist, this.y);
    if(wallCheck != -1) {
      dist = Math.abs(wc[wallCheck][0] - this.x) - 1;
    }
    this.x -= dist;
    this.update();
    this.hitDetection();
  }
  this.right = function(dist) {
    if(this.x + dist >= maxX) {
      dist = maxX - this.x;
    }
    var wallCheck = checkForWall(this.x + dist, this.y);
    if(wallCheck != -1) {
      dist = Math.abs(wc[wallCheck][0] - this.x) - 1;
    }
    this.x += dist;
    this.update();
    this.hitDetection();
  }
  this.up = function(dist) {
    if(this.y - dist <= 0) {
      dist = this.y;
    }
    var wallCheck = checkForWall(this.x, this.y - dist);
    if(wallCheck != -1) {
      dist = Math.abs(wc[wallCheck][1] - this.y) - 1;
    }
    this.y -= dist;
    this.update();
    this.hitDetection();
  }
  this.down = function(dist) {
    if(this.y + dist >= maxY) {
      dist = maxY - this.y;
    }
    var wallCheck = checkForWall(this.x, this.y + dist);
    if(wallCheck != -1) {
      dist = Math.abs(wc[wallCheck][1] - this.y) - 1;
    }
    this.y += dist;
    this.update();
    this.hitDetection();
  }
}

var enemyCheck = function(x, y) {
  var response = false;
  es.forEach(function(item) {
    item.getDirection(x, y);
    if(item.num === es.length - 1) {
      if(checkForEnemy(x, y)) {
        response = true;
      }
    }
  });
  return response;
}


//Walls!

var Wall = function(x, y, num) {
  this.x = x;
  this.y = y;
  this.num = num;
  this.id = 'wall'+this.num;
  this.html = "<div id='"+this.id+"' class='wall'><div id='wall"+this.num+"-mask' class='wall-mask background-full'></div>"
  this.shadowsrc = 'shadow-bottomleft.png'
  this.shadow = "<img src='"+this.shadowsrc+"' class='shadow wall-shadow' id='wall-shadow"+this.num+"'/>"
  this.type = 'wall';
  this.updateshadows = function() {
    this.shadowsrc = 'wallshadow-bottomleft-nowall.png';
    if((checkForWall((this.x-1, this.y) != -1) || (checkForWall(this.x+1, this.y) != -1)) && (checkForWall(this.x, this.y+1) === -1)) {
      this.shadowsrc = 'shadow-bottom.png';
      if(checkForWall(this.x+1, this.y) === -1) {
        this.shadowsrc = 'wallshadow-bottomleft.png';
      }
      if(checkForWall(this.x-1, this.y) === -1) {
        this.shadowsrc = 'shadow-bottom-nowall.png';
      }
    }
    if(((checkForWall(this.x, this.y-1) != -1) || (checkForWall(this.x, this.y+1) != -1)) && (checkForWall(this.x-1, this.y) === -1)) {
      this.shadowsrc = 'shadow-left.png';
      if(checkForWall(this.x, this.y-1) === -1) {
        this.shadowsrc = 'wallshadow-bottomleft.png';
      }
      if(checkForWall(this.x, this.y+1) === -1) {
        this.shadowsrc = 'shadow-left-nowall.png';
      }
    }
    if(((checkForWall(this.x, this.y-1) === -1) && (checkForWall(this.x, this.y+1) === -1) && (checkForWall(this.x-1, this.y) === -1) && (checkForWall(this.x+1, this.y) === -1))) {
      this.shadowsrc = 'wallshadow-bottomleft.png';
      if(checkForWall(this.x-1, this.y+1) === -1) {
        this.shadowsrc = 'wallshadow-bottomleft-nowall.png';
      }
    }
    if((checkForWall(this.x+1, this.y) != -1) && checkForWall(this.x, this.y-1) != -1) {
      this.shadowsrc = 'shadow-everywhere.png';
    }

    // if(checkForWall(this.x, this.y+1) === -1 && checkForWall(this.x, this.y-1) != -1) {
    //   this.shadowsrc = 'shadow-bottomleft.png';
    // }
    $('#wall-shadow'+this.num).attr("src", this.shadowsrc);
  }
  this.update = function() {
    $('#'+this.id).css("margin-left", this.x*actW);
    $('#'+this.id).css("margin-top", this.y*actH);
    $('#wall-shadow'+this.num).css("margin-left", this.x*actW - cellWidth);
    $('#wall-shadow'+this.num).css("margin-top", this.y*actH);
    if(this.x === 0 && this.y === 0) {
      $('#wall-shadow'+this.num).css("margin-left", -cellWidth + 'px');
      $('#wall-shadow'+this.num).css("margin-top", 0);
    }
    var that = this;
    setTimeout(function() {that.updateshadows()}, 10);
  }
  this.init = function() {
    $('#'+this.type+'-background').append(this.html);
    $('#'+this.type+'-shadows').append(this.shadow);
    this.update();
  }
  this.init();
  this.hit = function() {
    $('#'+this.id).addClass("hit");
    var that = this;
    setTimeout(function() {$('#'+that.id).removeClass("hit")}, 75);
    setTimeout(function() {
      createAudio('wallhit');
      setTimeout(function() {deleteAudio('wallhit')}, 750);
    }, 50);
  }
  this.remove = function() {
    $(this.id).remove();
    $('.wall-shadow').remove();
  }
}


//Player goal!

var Pend = function(x, y) {
  this.x = x;
  this.y = y;
  this.html = "<div id='pend'><div id='pend-gradient' class='background-full'></div></div>";
  this.type = 'pend';
  this.update = function() {
    $('#pend').css("margin-left", this.x*actW);
    $('#pend').css("margin-top", this.y*actH);
  }
  this.init = function() {
    $('#pend-background').append(this.html);
    this.update();
  }
  this.init();
  this.remove = function() {
    $('#pend').remove();
  }
}


//Instruction text!

var Text = function(text, x, y, num) {
  this.x = x;
  this.y = y;
  this.num = num;
  this.html = "<p class='instruction' id='instruction"+this.num+"'>"+text+"</p>";
  this.type = 'instruction-text';
  this.update = function() {
    $('#instruction'+this.num).css("margin-left", this.x*actW);
    $('#instruction'+this.num).css("margin-top", this.y*actH);
  }
  this.init = function() {
    $('#text-background').append(this.html);
    $('#instruction'+this.num).fadeTo(500, 1);
    this.update();
  }
  this.init();
  this.remove = function() {
    $('#instruction'+this.num).fadeOut(500, function() {$(this).remove()});
  }
}

//KABOOM!

//intesnity should be from 1-20.

var Explosion = function(x, y, intensity, quant, c1, c2, c3, c4, c5) {
  this.x = x;
  this.y = y;
  this.quant = quant;
  this.type = 'explosion';
  this.colors = [c1, c2, c3, c4, c5];
  this.update = function() {
    $('.explosion').css("margin-left", this.x*actW);
    $('.explosion').css("margin-top", this.y*actH);
  }
  this.init = function() {
    for(i = 0; i < this.quant + 1; i++) {
      $('#explosion-background').append("<div id='explosion"+i+"' class='explosion'></div>");
      $('#explosion'+i).css("background-color", this.colors[Math.floor(Math.random()*5)]);
      $('#explosion'+i).css("transition", "margin-left: 0.5s, margin-top: 0.5s, opacity: 1s");
      $('#explosion'+i).css("-webkit-transition", "margin-left: 0.5s, margin-top: 0.5s, opacity: 1s");

    }
    this.update();
  }
  this.remove = function() {
    $('.explosion').remove();
  }
  this.explode = function() {
    for(i = 0; i < this.quant + 1; i++ ){
      $('#explosion'+i).animate({marginLeft: this.x*actW + (Math.floor(Math.random()*intensity*100) - 50*intensity), marginTop: this.y*actH + (Math.floor(Math.random()*intensity*100) - 50*intensity)}, 500);
      $('#explosion'+i).fadeTo(Math.random()*500 + 1000, 0);
    }
    var that = this;
    setTimeout(function() {that.remove()}, 1750);
  }
}

//Enemy!

var Enemy = function(num) { // lol idk how to do inheritance
  this.num = num;
  this.x = 0;
  this.y = 0;
  this.html = "<div class='enemy' id='enemy"+this.num+"' style='transition: margin-left 0.1s, margin-top 0.1s ease-in-out; -webkit-transition: margin-left 0.1s, margin-top 0.1s ease-in-out'><div class='enemy-mask' id='enemy-mask"+this.num+"' class='background-full'><div class='square-gradient'></div><img src='shadow-bottomleft.png' class='shadow'/><div id='enemy-arrow"+this.num+"' class='arrow'></div></div></div>"
  this.speed = 1;
  this.init = function() {
    this.remove();
    $('#enemy-background').append(this.html);
    this.update();
  }
  this.place = function(x, y) {
    this.x = x;
    this.y = y;
    this.init();
  }
  this.remove = function() {
    $('#enemy'+this.num).remove();
  }
  this.getDirection = function(x, y) {
    var xD = this.x - x; // xDDDDDDD
    var yD = this.y - y;
    var xDA = Math.abs(xD);
    var yDA = Math.abs(yD);

    //ok, here's how this would look
    //    01234
    // 0  ---E-
    // 1  -P--- xD = 2 (pos = p is to left)
    // 2  ----- yD = -1 (pos = p is above)
    // 3  -----
    // 4  -----
    // therefore xD > 0 means P is to right
    // and yD > 0 means P is below
    // and E should travel in the direction with the greatest difference

      if(xDA === yDA) { // the stupid stuff
        if(Math.random() >= 0.5) {
          xDA = 9001;
        }
        else {
          xDA = -9001; //ik sort of cheaty, but hey, those variables are reset when this function is called!
        }
      }
      if(xDA > yDA) { // x posibilities
        if(xD > 0) {
          this.left(this.speed);
        }
        else {
          this.right(this.speed);
        }
      }
      if(yDA > xDA) { // y posibilities
        if(yD > 0) {
          this.up(this.speed);
        }
        else {
          this.down(this.speed);
        }
      }
  }
  this.update = function() {
    $('#enemy'+this.num).css("margin-left", this.x*actW);
    $('#enemy'+this.num).css("margin-top", this.y*actH);
    ec[num] = [this.x, this.y];
  }
  this.left = function(dist) {
    if(this.x - dist <= 0) {
      dist = this.x;
    }
    if(!(checkForEnemy(this.x - dist, this.y))) {
      var wallCheck = checkForWall(this.x - dist, this.y);
      if(wallCheck != -1) {
        dist = Math.abs(wc[wallCheck][0] - this.x) - 1;
      }
      this.x -= dist;
      this.update();
    }
    $('#enemy-arrow'+this.num).css({transform:"translate(-50%, -50%) rotate(270deg)"});
  }
  this.right = function(dist) {
    if(this.x + dist >= maxX) {
      dist = maxX - this.x;
    }
    if(!(checkForEnemy(this.x + dist, this.y))) {
      var wallCheck = checkForWall(this.x + dist, this.y);
      if(wallCheck != -1) {
        dist = Math.abs(wc[wallCheck][0] - this.x) - 1;
      }
      this.x += dist;
      this.update();
    }
    $('#enemy-arrow'+this.num).css({transform:"translate(-50%, -50%) rotate(90deg)"});
  }
  this.up = function(dist) {
    if(this.y - dist <= 0) {
      dist = this.y;
    }
    if(!(checkForEnemy(this.x, this.y - dist))) {
      var wallCheck = checkForWall(this.x, this.y - dist);
      if(wallCheck != -1) {
        dist = Math.abs(wc[wallCheck][1] - this.y) - 1;
      }
      this.y -= dist;
      this.update();
    }
    $('#enemy-arrow'+this.num).css({transform:"translate(-50%, -50%) rotate(0deg)"});
  }
  this.down = function(dist) {
    if(this.y + dist >= maxY) {
      dist = maxY - this.y;
    }
    if(!(checkForEnemy(this.x, this.y + dist))) {
      var wallCheck = checkForWall(this.x, this.y + dist);
      if(wallCheck != -1) {
        dist = Math.abs(wc[wallCheck][1] - this.y) - 1;
      }
      this.y += dist;
      this.update();
    }
    $('#enemy-arrow'+this.num).css("transform", "translate(-50%, -50%) rotate(180deg)");
  }
}

var checkForEnemy = function(x, y) {
  var response = false;
  for(i = 0; i < ec.length; i++) {
    if(ec[i][0] === x && ec[i][1] === y) {
      response = true;
    }
  }
  return response;
}

var checkForWall = function(x, y) {
  var response = -1;
  for(i = 0; i < wc.length; i++) {
    if((wc[i][0] === x) && (wc[i][1] === y)) {
      response = i; // returns wall collision number, allowing for varying speeds to subtract from the wall's coords
      if(shadowsInit) {
        ws[i].hit();
      }
    }
  }
  return response
}

var checkForPend = function(x, y) {
  var response = false;
  if((endc[0] === x) && (endc[1] === y)) {
    response = true;
  }
  return response;
}


//audio
var createAudio = function(src) {
  if(audio) {
    $('body').append('<audio class="'+src+'" autoplay src="sounds/'+src+'.mp3" type="audio/mpeg"></audio>');
  }
}

var deleteAudio = function(src) {
  if(audio) {
    $('.'+src).animate({volume: 0}, 250);
      setTimeout(function(){$('.'+src).remove();}, 250)
  }
}

var clickSomething = function() {
  createAudio("select");
  setTimeout(function() {deleteAudio("select")}, 750);
}

//Draw rows in the back of the game

var row = "<div class='row'></div>"
var column = "<div class='column'></div>"

var drawGrid = function(colnum, rownum) {
  $('.row').remove();
  $('.column').remove();
  var height = $('#columns').height();
  var width = $('#columns').width();
  colstyle = "margin-left:"+((width/(colnum)) - 1)+"px";
  rowstyle = "margin-top:"+((height/(rownum)) - 1)+"px";
  for(i = 0; i < colnum-1; i++ ){
    $('#columns').append("<div class='column' style='"+colstyle+"'></div>");
  }
  for(i = 0; i < rownum-1; i++) {
    $('#rows').append("<div class='row' style='"+rowstyle+"'></div>");
  }
}


var highscore = 0;
//Game controllers
var deleteGame = function() {
  if(lvlwon) {
    lvl.highscore = highscore;
    $('#highscore').html('best: '+lvl.highscore);
  }
  score = 0;
  $('#header-content').animate({scrollTop: 0}, 250);
  delete p;
  setTimeout(function() {
    $('#player').remove();
  }, 100);
  setTimeout(function() {
    $('.wall-shadow').remove();
  }, 500)
  ec = [];
  gameActive = false;
  if(state === 'down') {
    state = 'down';
    menustate = 'shown';
    setTimeout(function() {toggleMenu();}, 500);
  }
  else {
    menustate = 'hidden';
  }
  newgamemsg = setTimeout(function() {$('#msg').html('go to the main menu to start a new game!');}, 2000);
  $('#playbutton').html('click to play!');
}

var newgamemsg = setTimeout(function() {}, 134252345234523452345);

var hi = 1;

var initGame = function() {
  clearTimeout(newgamemsg);
  $('.enemy').remove();
  $('.wall').remove();
  $('#pend').remove();
  $('.instruction').remove();
  lvlwon = false;
  lvllost = false;
  shadowsInit = false;
  ws = [];
  es = [];
  wc = [];
  ec = [];
  initVars();
  gameActive = true;
  initsizes();
  drawGrid(amtOfCols, amtOfRows);
  updateVals();
  $('#player').remove();
  delete p;
  delete pend;
  for(i = 0; i < wc.length; i++) {
    ws[i] = new Wall(wc[i][0], wc[i][1], i);
  }
  setTimeout(function() {shadowsInit = true}, 10);
  p = new Player();
  p.place(lvl.pcords[0], lvl.pcords[1]);
  $(p.id).css("opacity", 1);
  score = 0;
  highscore = lvl.highscore;
  $('#highscore').html('best: '+highscore);
  if(lvl.highscore === 398245293723495870) {
    $('#highscore').html('best: 0');
  }
  // for(i = 0; i < amtOfEnemies; i++) {
  //   es[i] = new Enemy(i);
  //   var randX = Math.floor(Math.random()*amtOfCols);
  //   var randY = Math.floor(Math.random()*amtOfRows);
  //   // while(checkForEnemy(randX, randY)) { // avoids enemies spawning on each other
  //   //   var randX = Math.floor(Math.random()*amtOfCols);
  //   //   var randY = Math.floor(Math.random()*amtOfRows);
  //   // };
  //   es[i].place(randX, randY);
  // }
  for(i = 0; i < amtOfEnemies; i++) {
    es[i] = new Enemy(i);
    es[i].place(lvl.ecords[i][0], lvl.ecords[i][1]);
  }
  pend = new Pend(endc[0], endc[1]);
  if(lvl.instruct != '') {
    texty = new Text(lvl.instruct, lvl.instructX, lvl.instructY, 1);
    clearTimeout(textyRemove);
    setTimeout(function() {texty.init()}, 1000);
    textyRemove = setTimeout(function() {texty.remove()}, 10000);
  };
  $('#msg').html('');
  setTimeout(function() {$('#playbutton').html('click to reset');$('#message').html('')}, 500);
  state = 'up';
  if(shadows === false) {
    $('.shadow').css("opacity", "0");
  }
  if(arrows === false) {
    $('.arrow').css("opacity", "0");
  }
  toggleHeader();
  updateVals();
}

$(document).ready(function() {
  initVars();
  gameActive = true;
  initsizes();
  drawGrid(amtOfCols, amtOfRows);
  $('#loading-square').addClass("load");
  $('#loading-background-animated').addClass('load');
  setTimeout(function() {
    $('#loading-container').fadeTo(1000, 0);
    $('#loading-audio').animate({volume: 0}, 5500);
    setTimeout(function() {$("#loading-audio").remove();}, 5500);
  }, loadingTime - 1000);
  setTimeout(function() {
    $('#loading-container').remove();
  }, loadingTime);
  updateVals();
  p = new Player();
  p.place(lvl.pcords[0], lvl.pcords[1]);
  //FOR RANDOM ENEMIES
  // for(i = 0; i < amtOfEnemies; i++) {
  //   es[i] = new Enemy(i);
  //   var randX = Math.floor(Math.random()*amtOfCols);
  //   var randY = Math.floor(Math.random()*amtOfRows);
  //   while(checkForEnemy(randX, randY)) { // avoids enemies spawning on each other
  //     var randX = Math.floor(Math.random()*amtOfCols);
  //     var randY = Math.floor(Math.random()*amtOfRows);
  //   };
  //   es[i].place(randX, randY);
  // }
  for(i = 0; i < amtOfEnemies; i++) {
    es[i] = new Enemy(i);
    es[i].place(lvl.ecords[i][0], lvl.ecords[i][1]);
  }
  for(i = 0; i < wc.length; i++) {
    ws[i] = new Wall(wc[i][0], wc[i][1], i);
  }
  if(lvl.instruct != '') {
    texty = new Text(lvl.instruct, lvl.instructX, lvl.instructY, 1);
    setTimeout(function() {texty.init()}, 1000);
    textyRemove = setTimeout(function() {texty.remove()}, 100000);
  };
  pend = new Pend(endc[0], endc[1]);
  $('#msg').html('');
  $('#playbutton').html('click to reset');
  $('#playbutton').click(function() {
    if(gameActive) {
      p.die();
    }
    else {
      if(lvlwon) {
        lvlnum += 1;
        initGame();
      }
      else {
        initGame();
      }
    }
  })
  $(window).resize(function() {
    initsizes();
    updateVals();
    drawGrid(amtOfCols, amtOfRows);
  });
  updateVals(); // to be safe
  $(document).keydown(function(key) {
    var keyVal = parseInt(key.which,10);
    texty.remove();
    clearTimeout(textyRemove);
    if((keyVal === 37 || keyVal ===  38 || keyVal ===  39 || keyVal === 40) && (gameActive) && (state === 'down') && (lvlwon === false) && (lvllost === false)) {
      if(checkForEnemy(p.x, p.y)) {
        p.die();
      }
      switch(keyVal) {
        case 37: // left
          p.left(speed);
          break;

        case 38: // up
          p.up(speed);
          break;

        case 39: // right
          p.right(speed);
          break;

        case 40: // down
          p.down(speed);
          break;
      };
    }
  });
});
