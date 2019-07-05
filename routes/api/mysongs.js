const { Song, User } = require("../../db/models");
var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const to = require("await-to-js").default;
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  // Get user's tracks (notice it only returns 20 unless we add offset and limit parameters)
  // let songs = [];
  // let total = 100;
  // let limit = 50;
  // let offset = 0;
  // for (let j = 0; j < total; j + limit) {
  //   let url =
  //     "https://api.spotify.com/v1/me/tracks?offset=" +
  //     offset +
  //     "&limit=" +
  //     limit;
  //   await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + req.user.accessToken
  //     },
  //     json: true
  //   })
  //     .then(res => res.json())
  //     .then(apiResponse => {
  //       limit = apiResponse.limit;
  //       total = apiResponse.total;
  //       offset = offset + limit;
  //       for (let i = 0; i < limit; i++) {
  //         Song.findOrCreate({
  //           where: {
  //             name: apiResponse.items[i].track.name,
  //             song_spotify_id: apiResponse.items[i].track.id,
  //             album: apiResponse.items[i].track.album.name,
  //             popularity: apiResponse.items[i].track.popularity,
  //             track_number: apiResponse.items[i].track.track_number,
  //             uri: apiResponse.items[i].track.uri
  //           }
  //         }).then(song => {
  //           songs.push(song);
  //         });
  //       }
  //     })
  //     .catch(function(error) {
  //       return {
  //         type: "ERROR ON FETCH",
  //         api_response: { success: false }
  //       };
  //     });
  // }
  // res.status(200).json(songs);

  let songs = [];
  fetch(
    "https://api.spotify.com/v1/me/tracks?offset=" +
      req.query.offset +
      "&limit=50",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + req.user.accessToken
      },
      json: true
    }
  )
    .then(results => results.json())
    .then(apiResponse => {
      let limit = apiResponse.limit;
      let promises = [];

      for (let i = 0; i < limit; i++) {
        const myPromise = new Promise((resolve, reject) => {
          Song.findOrCreate({
            where: {
              name: apiResponse.items[i].track.name,
              song_spotify_id: apiResponse.items[i].track.id,
              album: apiResponse.items[i].track.album.name,
              popularity: apiResponse.items[i].track.popularity,
              track_number: apiResponse.items[i].track.track_number,
              uri: apiResponse.items[i].track.uri
            }
          }).then(song => {
            songs.push(song);
            resolve(true);
          });
        });

        promises.push(myPromise);
      }

      Promise.all(promises).then(() => {
        res.status(200).json(songs);
      });
    })
    .catch(function(error) {
      return {
        type: "ERROR ON FETCH",
        api_response: { success: false }
      };
    });
});
module.exports = router;
