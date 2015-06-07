var state = 'down';
var lvl;
var lvlnum = 1;

$(document).ready(function() {
  //Level grid

  lvlCols = 10;
  lvlRows = 9;

  lvlH = $('#levels').height();
  lvlW = $('#levels').width();

  lvlMargin = Math.abs(((lvlW/lvlCols)-(lvlW/lvlCols+1)))

  var lvlcounter = 0;

  for(i = 0; i < lvlCols; i++) {
    for(j = 0; j < lvlRows; j++) {
      lvlcounter += 1;
      $('#levels').append("<div id='lvl-outer"+lvlcounter+"' class='lvl-outer'><p class='lvl-outer-p'>"+lvlcounter+"</p></div>");
    }
    $('#levels').append("<br>");
  }

  $('.lvl-outer').css('height', lvlH/(lvlRows+1)+'px');
  $('.lvl-outer').css('width', lvlW/(lvlCols+1)+'px');
  $('.lvl-outer').css('margin-left', lvlMargin+'px');
  $('.lvl-outer').css('margin-right', lvlMargin+'px');
  $('#lvl-outer1').addClass('selected');

  $('.lvl-outer').click(function() {
    if(lvlselect) {
      $('.lvl-outer').removeClass('selected');
      $(this).addClass('selected');
      lvlnum = (Math.floor(($(this).attr('id'))[9]))
      lvl = lvls[lvlnum - 1];
      setLvlNum(lvlnum);
    };
  })

  //Header

  $('#header-button').hover(function() {
    $('#header-h1').addClass('active');
    $('#header-button').addClass('active');
  }, function() {
    $('#header-h1').removeClass('active');
    $('#header-button').removeClass('active');
  });
  $('#header-button').click(function() {
    toggleHeader();
  })
});

var toggleHeader = function() {
  if(state === 'up') {
    $('#header-content').removeClass('shown');
    $('#header-button').html("back to menu &uarr;");
    state = 'down';
  }
  else {
    $('#header-content').addClass('shown');
    $('#header-button').html("back to game &darr;");
    if(gameActive) {
      $('.lvl-outer').removeClass('selectable');
      lvlselect = false;
    }
    else {
      $('.lvl-outer').addClass('selectable');
      lvlselect = true;
    }
    state = 'up';
  }
}
