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
    if(typeof p != "undefined") {
      p.die();
    }
    $('.lvl-outer').removeClass('selected');
    $(this).addClass('selected');
    lvlnum = ((Math.floor(($(this).attr('id'))[9]))*10 + (Math.floor(($(this).attr('id'))[10]))) + 1;
    weirdlvlnum = $(this).attr('id')[9] + '' + $(this).attr('id')[10];
    lvl = lvls[lvlnum - 1];
    setLvlNum(lvlnum);
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


  //menu crap

  $('#menu-menu').click(function() {
    if(lvlwon) {
      updateLevels(lvlnum + 1);
    }
    toggleHeader();
  })
  $('#menu-reset').click(function() {
    lvlnum += 0
    if(lvlwon) {
      updateLevels(lvlnum);
    }
    lvl = lvls[lvlnum - 1];
    toggleMenu();
    initGame();
  })
  $('#menu-play').click(function() {
    if(lvlwon) {
      lvlnum += 1;
      updateLevels(lvlnum);
    }
    lvl = lvls[lvlnum - 1];
    toggleMenu();
    initGame();
  })
});

var updateLevels = function(lvlnum) {
  var lvlnumRemain = lvlnum % 10;
  weirdlvlnum = (Math.floor(lvlnum/10) + '' + lvlnumRemain);
  var weirdlvlnumSub1 = (Math.floor((lvlnum - 1)/10) + '' + ((lvlnum - 1) % 10));
  var weirdlvlnumSub2 = (Math.floor((lvlnum - 2)/10) + '' + ((lvlnum - 2) % 10));
  lvl = lvls[lvlnum - 1];
  $('#lvl-outer'+(weirdlvlnumSub2)).addClass('won');
  $('.lvl-outer').removeClass('selected');
  $('#lvl-outer'+(weirdlvlnumSub1)).addClass('selected');
}

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
  menustate = 'hidden';
  toggleMenu();
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
    }
    else {
      $('.lvl-outer').addClass('selectable');
    }
    state = 'up';
  }
}

var menustate = 'hidden';

var toggleMenu = function() {
  if(menustate === 'hidden') {
    $('#menu-background').addClass('hidden');
  }
  else {
    $('#menu-background').removeClass('hidden');
  }
}


$(function() { // Smooth scrolling with the pages with the hashtag stuff. Idk why it works.
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
