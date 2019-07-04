const { Song } = require("../../db/models");
var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

// Return complete user connections information
router.get("/", (req, res) => {
  Song.findAll({
    where: {
      song_spotify_id: req.query.id
    }
  }).then(data => {
    if (data.danceability == null) {
      fetch("https://api.spotify.com/v1/audio-features/" + req.query.id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + req.user.accessToken
        },
        json: true
      })
        .then(results => results.json())
        .then(data => {
          Song.update(
            {
              danceability: data.danceability,
              energy: data.energy,
              loudness: data.loudness,
              valence: data.valence,
              instrumentalness: data.instrumentalness,
              valence: data.valence,
              time_signature: data.time_signature,
              acousticness: data.acousticness
            },
            {
              where: {
                song_spotify_id: req.query.id
              }
            }
          );
          // console.log(data);
          fetch(
            "https://api.spotify.com/v1/recommendations?seed_tracks=" +
              req.query.id +
              "&min_energy=" +
              (data.energy - 0.1) +
              "&max_energy=" +
              (data.energy + 0.1),
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + req.user.accessToken
              },
              json: true
            }
          )
            .then(results => results.json())
            .then(recommendedSong => {
              res.status(200).json(recommendedSong);
            });
        })
        .catch(err => console.err(err));
    }
  });
});

module.exports = router;
