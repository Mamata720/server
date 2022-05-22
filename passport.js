
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "87628802578-an1ulf6kjoe52g5kv3tghk4pi0hl4621.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";




passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile,done)=> {
    // console.log(profile)
    done(null,profile)
  }
  )
);





passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});









































                                                              


