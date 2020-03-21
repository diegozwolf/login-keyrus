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

// let planetItems = ""
// //Bring planet information
// fetch(urlPlanet)
//   .then(response => response.json())
//   .then(data => {
//     let planetsInfo = data.results;
//     let planetSpecificInfo = new Object();
//     planetItems = planetsInfo.map(function(planet) {
//       planet = (({ name, terrain, gravity, climate, population }) => ({
//         name,
//         terrain,
//         gravity,
//         climate,
//         population,
//       }))(planet);
//       let keys = Object.keys(planet);

//       for (let i = 0; i < keys.length; i++) {
//         let key = keys[i];
//         planetSpecificInfo[key] = '';
//         planetSpecificInfo[key] = planet[key];
//       }

//       console.log(planetSpecificInfo);
//     });
//   })
//   .catch(err => console.log(err));

//Bring main information
fetch(url)
  .then(response => response.json())
  .then(data => {
    let charactersInfo = data.results;
    const characterSpecificInfo = new Object();

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
      // Get Homeworld Information
      return fetch(characterSpecificInfo.homeworld)
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

          characterSpecificInfo.homeworld = planetInformation;

          console.log(characterSpecificInfo);
        });
    });
  })

  .catch(err => console.log(err));
//Bring main information
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     let charactersInfo = data.results;
//     let characterSpecificInfo = new Object();

//     let characterItems = charactersInfo.map(function(character) {
//       character = (({
//         name,
//         hair_color,
//         skin_color,
//         gender,
//         homeworld,
//         films,
//       }) => ({ name, hair_color, skin_color, gender, planetItems, films }))(
//         character
//       );
//       let keys = Object.keys(character);

//       for (let i = 0; i < keys.length; i++) {
//         let key = keys[i];
//         characterSpecificInfo[key] = '';
//         characterSpecificInfo[key] = character[key];
//       }

//       console.log(characterSpecificInfo);
//     });
//   })
//   .catch(err => console.log(err));
