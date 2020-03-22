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
          let planetObject = Object.keys(planetInformation);
          for (let i = 0; i < planetObject.length; i++) {
            character.homeworld = planetInformation;
          }
        })
        .catch(err => console.log(err));

      //films information
      let filmsList = characterSpecificInfo.films;
      character.films = [];
      let filmObject = [];
      for (var i = 0; i < filmsList.length; i++) {
        fetch(filmsList[i])
          .then(response => response.json())
          .then(filmData => {
            let filmInformation = filmData;
            filmInformation = (({
              title,
              episode_id,
              opening_crawl,
              director,
            }) => ({ title, episode_id, opening_crawl, director }))(
              filmInformation
            );
            filmObject.push(filmInformation);
          })
          .catch(err => console.log(err));
      }
      character.films = filmObject;
      console.log(character);
    });
  })

  .catch(err => console.log(err));
