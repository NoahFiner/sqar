var state = 'down';
$(document).ready(function() {
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
    state = 'up';
  }
}
