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

// Show Information

fetch(url)
  .then(response => response.json())
  .then(data => {
    let charactersInfo = data.results;
    const characterSpecificInfo = new Object();
    // Filter information
    charactersInfo.map(function(character) {
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

      //planet information
      fetch(characterSpecificInfo.homeworld)
        .then(response => response.json())
        .then(planetData => {
          let planetInformation = planetData;

          planetInformation = (({
            name,
            terrain,
            gravity,
            climate,
            population,
          }) => ({ name, terrain, gravity, climate, population }))(
            planetInformation
          );

          for (let planetItem in planetInformation) {
            character.homeworld = planetInformation;
            console.log(planetItem);
          }
          console.log(character);
        })
        .catch(err => console.log(err));
    });
  })

  .catch(err => console.log(err));
