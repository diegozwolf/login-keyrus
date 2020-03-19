import 'bootstrap';

import '../scss/index.scss';

var keyrus = (function() {
  var initialize = function() {
    $('#send').click(function(event) {
      $('.alert').hide();
      var email = $('#Email').val();
      var password = $('#Password').val();
      if (email && password) {
        $('.alert-success').fadeIn();
      } else {
        $('.alert-danger').fadeIn();
      }

      executeApi();
      event.preventDefault();
    });

    $('.close-icon').on('click', function() {
      $('.alert').hide();
    });
  };

  var executeApi = function() {
    fetch('https://swapi.co/api/people/')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const newResult = json.results.map(async obj => {
          //Extract Films
          var filmPromises = obj.films.map(async filmObj => {
            return await fetch(filmObj)
              .then(function(response) {
                return response.json();
              })
              .then(function(json) {
                return {
                  title: json.title,
                  episode_id: json.episode_id,
                  opening_crawl: json.opening_crawl,
                  director: json.director,
                };
              });
          });
          var films = [];
          filmPromises.forEach(element => {
            element.then(function(objPromise) {
              films.push(objPromise);
            });
          });

          //Extract information
          return {
            name: obj.name,
            hair_color: obj.hair_color,
            skin_color: obj.skin_color,
            gender: obj.gender,
            //Extract homeworld information
            homeworld: await fetch(obj.homeworld)
              .then(function(response) {
                return response.json();
              })
              .then(function(json) {
                return {
                  name: json.name,
                  terrain: json.terrain,
                  gravity: json.gravity,
                  climate: json.climate,
                  population: json.population,
                };
              }),
            films: films,
          };
        });

        //Print for every result
        newResult.forEach(element => {
          element.then(function(objPromise) {
            console.log(objPromise);
          });
        });
      });
  };

  return { initialize: initialize, executeApi: executeApi };
})();

$(document).ready(function() {
  keyrus.initialize();
});
