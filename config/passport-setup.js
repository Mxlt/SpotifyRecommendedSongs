const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("./keys");
const User = require("../db/models").User;

passport.serializeUser((user, done) => {
  // Here, done passes the user's id to serialize, else if there is an error, it passes null
  done(null, user.id_user);
});

passport.deserializeUser((id, done) => {
  // Here, I am getting the ID and searching in database for the user
  User.findOne({ where: { id_user: id } }).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotify.clientID,
      clientSecret: keys.spotify.clientSecret,
      callbackURL: "/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({
        where: {
          user_spotify_id: profile.id,
          username: profile.username,
          email: profile._json.email,
          country: profile.country,
          birthdate: profile._json.birthdate
        }
      }).then(([user, created]) => {
        User.update(
          {
            accessToken: accessToken,
            expires_in: expires_in,
            refreshToken: refreshToken
          },
          {
            where: {
              user_spotify_id: user.user_spotify_id
            }
          }
        );

        done(null, user);
      });
    }
  )
);
