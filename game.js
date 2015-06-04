//Initalizing variables
var amtOfCols = 20;
var amtOfRows = 10; // should be amtOfCols/2 for squares

var maxX = amtOfCols - 1;
var maxY = amtOfRows - 1;

var cellHeight, cellWidth;
var moveHeight, moveWidth;

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
}


//Player!

var Player = function() {
  this.x = 0;
  this.y = 0;
  this.html = "<div id='player' style='transition: margin-left 0.1s, margin-top 0.1s ease-in-out; -webkit-transition: margin-left 0.1s, margin-top 0.1s ease-in-out'><div id='player-mask' class='background-full'></div></div>"
  this.speed = 1;
  this.init = function() {
    $('#player-background').append(this.html);
    this.update();
  }
  this.place = function(x, y) {
    this.x = x;
    this.y = y;
    this.init();
  }
  this.update = function() {
    $('#coords').html("coords: " + this.x + ", " + this.y);
    $('#player').css("margin-left", this.x*actW);
    $('#player').css("margin-top", this.y*actH);
  }
  this.left = function(dist) {
    if(this.x - dist <= 0) {
      dist = this.x;
    }
    this.x -= dist;
    this.update();
  }
  this.right = function(dist) {
    if(this.x + dist >= maxX) {
      dist = maxX - this.x;
    }
    this.x += dist;
    this.update();
  }
  this.up = function(dist) {
    if(this.y - dist <= 0) {
      dist = this.y;
    }
    this.y -= dist;
    this.update();
  }
  this.down = function(dist) {
    if(this.y + dist >= maxY) {
      dist = maxY - this.y;
    }
    this.y += dist;
    this.update();
  }
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

$(document).ready(function() {
  initsizes();
  drawGrid(amtOfCols, amtOfRows);
  updateVals();
  var p = new Player();
  p.place(2, 2);
  updateVals(); // to be safe
  $(window).resize(function() {
    initsizes();
    updateVals();
    drawGrid(amtOfCols, amtOfRows);
  });
  $(document).keydown(function(key) {
    switch(parseInt(key.which,10)) {
      case 37:
      p.left(p.speed);
      break;
      case 38:
      p.up(p.speed);
      break;
      case 39:
      p.right(p.speed);
      break;
      case 40:
      p.down(p.speed);
      break;
    };
  });
});
