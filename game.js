//Initalizing variables
var lvl = l1;

var lvlselect = false;

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

lvlnum = 0;

var initVars = function() {
  //Initalizing variables
  lvlselect = false;

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
  var height = $('#columns').height();
  var width = $('#columns').width();
  $('#game-container').width(width); //weird stuff with corners and crap
  $('#game-container').height(height);
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
  $('#pend').width(cellWidth);
  $('#pend').height(cellHeight);
}


//Player!

var Player = function() {
  this.x = 0;
  this.y = 0;
  this.html = "<div id='player' style='transition: margin-left 0.1s, margin-top 0.1s ease-in-out; -webkit-transition: margin-left 0.1s, margin-top 0.1s ease-in-out'><div id='player-mask' class='background-full'></div></div>"
  this.speed = speed;
  this.speed1 = this.speed + 1;
  this.id = '#player';
  this.type = 'player';
  this.init = function() {
    $('#'+this.type+'-background').append(this.html);
    this.update();
    pInit = true;
  }
  this.place = function(x, y) {
    this.x = x;
    this.y = y;
    this.init();
  }
  this.die = function() {
      deleteGame();
  }
  this.win = function() {
    lvlnum += 1;
    lvl = lvls[lvlnum - 1];
    $('#lvl-outer'+(lvlnum - 1)).addClass('won');
    $('.lvl-outer').removeClass('selected');
    $('#lvl-outer'+(lvlnum)).addClass('selected');
    deleteGame();
  }
  this.remove = function() {
    $(this.id).remove();
  }
  this.update = function() {
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
  this.type = 'wall';
  this.update = function() {
    $('#'+this.id).css("margin-left", this.x*actW);
    $('#'+this.id).css("margin-top", this.y*actH);
  }
  this.init = function() {
    $('#'+this.type+'-background').append(this.html);
    this.update();
  }
  this.init();
  this.remove = function() {
    $(this.id).remove();
  }
}


//Player goal!

var Pend = function(x, y) {
  this.x = x;
  this.y = y;
  this.html = "<div id='pend'></div>";
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

//Enemy!

var Enemy = function(num) { // lol idk how to do inheritance
  this.num = num;
  this.x = 0;
  this.y = 0;
  this.html = "<div class='enemy' id='enemy"+this.num+"' style='transition: margin-left 0.1s, margin-top 0.1s ease-in-out; -webkit-transition: margin-left 0.1s, margin-top 0.1s ease-in-out'><div class='enemy-mask' id='enemy-mask"+this.num+"' class='background-full'></div></div>"
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



//Game controllers
var deleteGame = function() {
  delete p;
  setTimeout(function() {
    $('#player').remove();
  }, 100);
  ec = [];
  gameActive = false;
  state = 'down';
  toggleHeader();
  $('#msg').html('make a new game to play!');
  $('#playbutton').html('click to play!');
}

var hi = 1;

var initGame = function() {
  lvlselect = false;
  $('.enemy').remove();
  $('.wall').remove();
  $('#pend').remove();
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
  p = new Player();
  p.place(lvl.pcords[0], lvl.pcords[1]);
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
  $('#msg').html('');
  setTimeout(function() {$('#playbutton').html('click to reset');}, 500);
  state = 'up';
  toggleHeader();
  updateVals();
}

$(document).ready(function() {
  initVars();
  gameActive = true;
  initsizes();
  drawGrid(amtOfCols, amtOfRows);
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
  pend = new Pend(endc[0], endc[1]);
  $('#msg').html('');
  $('#playbutton').html('click to reset');
  $('#playbutton').click(function() {
    if(gameActive) {
      p.die();
      lvlselect = true;
    }
    else {
      initGame();
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
    if((keyVal === 37 || keyVal ===  38 || keyVal ===  39 || keyVal === 40) && (gameActive) && (state === 'down')) {
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
