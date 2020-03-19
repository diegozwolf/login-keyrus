import 'bootstrap';

import '../scss/index.scss';

// show alerts
$('#send').click(function(event) {
  $('.alert').hide();
  var email = $('#Email').val();
  var password = $('#Password').val();
  if (email && password) {
    $('.alert-success').fadeIn();
  } else {
    $('.alert-danger').fadeIn();
  }

  event.preventDefault();
});

// close alerts

$('.close-icon').on('click', function() {
  $('.alert').hide();
});
