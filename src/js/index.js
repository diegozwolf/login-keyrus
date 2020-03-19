import 'bootstrap';

import '../scss/index.scss';

const url = 'https://swapi.co/api/people/';

// show alerts
$('#send').click(function(event) {
  $('.alert').hide();
  let email = $('#Email').val();
  let password = $('#Password').val();
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

fetch(url)
  .then(response => response.json())
  .then(data => {
    let charactersInfo = data.results;
    let characterSpecificInfo = new Object();

    let selectetdItems = charactersInfo.map(function(character) {
      character = (({
        name,
        hair_color,
        skin_color,
        gender,
        homeworld,
        films,
      }) => ({ name, hair_color, skin_color, gender, homeworld, films }))(
        character
      );
      let keys = Object.keys(character);

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        characterSpecificInfo[key] = '';
        characterSpecificInfo[key] = character[key];
      }

      console.log(characterSpecificInfo);
      console.log(selectetdItems);
    });
  })
  .catch(err => console.log(err));
