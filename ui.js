var state = 'down';
var lvl;
var lvlnum = 1;
var weirdlvlnum = 00;

$(document).ready(function() {
  //Level grid

  lvlCols = 11;
  lvlRows = 10;

  lvlH = $('#levels').height();
  lvlW = $('#levels').width();

  lvlMargin = Math.abs(((lvlW/lvlCols)-(lvlW/lvlCols+1)))

  var lvlcounter = 0;

  for(i = 0; i < lvlCols; i++) {
    for(j = 0; j < lvlRows; j++) {
      lvlcounter += 1;
      $('#levels').append("<div id='lvl-outer"+i+''+j+"' class='lvl-outer'><p class='lvl-outer-p'>"+lvlcounter+"</p></div>");
    }
    $('#levels').append("<br>");
  }

  $('.lvl-outer').css('height', lvlH/(lvlRows+1)+'px');
  $('.lvl-outer').css('width', lvlW/(lvlCols+1)+'px');
  $('.lvl-outer').css('margin-left', lvlMargin+'px');
  $('.lvl-outer').css('margin-right', lvlMargin+'px');
  $('#lvl-outer1').addClass('selected');

  $('#level-header').click(function() {
    toggleLevels();
  })

  $('.lvl-outer').click(function() {
    if(lvlselect) {
      $('.lvl-outer').removeClass('selected');
      $(this).addClass('selected');
      lvlnum = ((Math.floor(($(this).attr('id'))[9]))*10 + (Math.floor(($(this).attr('id'))[10]))) + 1;
      weirdlvlnum = $(this).attr('id')[9] + '' + $(this).attr('id')[10];
      lvl = lvls[lvlnum - 1];
      setLvlNum(lvlnum);
    };
  })

  //Header


  $('#mainmenu-link').click(function() {
    toggleHeader();
  })
  $('#levelselect-link, #info-link').click(function() {
    state = 'down';
    toggleHeader();
  })
  $('#header-h1').click(function() {
    state = 'up';
    toggleHeader();
  })

  $('#levelselect-link').click(function() {
    $('#header-content').scrollTop(450);
  })
  $('#info-link').click(function() {
    $('#header-content').scrollTop(1250);
  })
});


lvlExpanded = true;
var toggleLevels = function() {
  if(lvlExpanded) {
    lvlExpanded = false;
    $('#levels').addClass('collapsed');
    $('#level-header').html('select level &#8861;')
  }
  else {
    lvlExpanded = true;
    $('#levels').removeClass('collapsed');
    $('#level-header').html('select level &#8853;')
  }
}

var toggleHeader = function() {
  if(state === 'up') {
    $('#header-content').removeClass('shown');
    $('#mainmenu-link').html("back to menu");
    state = 'down';
  }
  else {
    $('#header-content').addClass('shown');
    $('#mainmenu-link').html("back to game");
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
