import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { FBUser } from "types/user.types";

// Local auth, email and password
const UserConfig = { usernameField: "email" };
passport.use(
  new LocalStrategy(UserConfig, (username, password, done) => {
    User.findOne({ email: username }).exec((err, user) => {
      if (err) return done(err);

      if (!user || !user.password) {
        return done(null, false, { message: "Email is incorrect" });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);
        if (!result) {
          return done(null, false, { message: "Password is incorrect" });
        }
        return done(null, user);
      });
    });
  })
);

// JWT Bearer Token auth
const opts = {
  secretOrKey: process.env.JWT_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

type jwtPayload = { email: string; password: string; iat: number };
passport.use(
  new JwtStrategy(opts, function (jwt_payload: jwtPayload, done) {
    User.findOne({ email: jwt_payload.email }).exec((err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "User was not found" });
      return done(null, user);
    });
  })
);

// Facebook auth
const FBOptions = {
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: "http://localhost:8000/auth/facebook/callback",
  profileFields: ["id", "name", "picture", "email", "gender", "birthday"],
};

passport.use(
  new FacebookStrategy(
    FBOptions,
    (accessToken, refreshToken, profile: Profile, cb) => {
      const userData = profile._json;
      User.findOne({ facebookID: userData.id }).exec((err, user) => {
        console.log("user", user);
        if (err) return cb(err);
        if (user) return cb(null, user);
        else {
          const { first_name, last_name, id, picture, email }: FBUser =
            userData;

          const newUser = new User({
            firstName: first_name,
            lastName: last_name,
            facebookID: id,
            picture: picture.data.url,
            email,
          });
          console.log("createduser", newUser);

          newUser.save().then((newUser) => {
            cb(null, newUser);
          });
        }
      });
    }
  )
);

const LocalAuth = () => {
  return passport.authenticate("local", { session: false });
};

const JwtAuth = () => {
  return passport.authenticate("jwt", { session: false });
};

const FBAuth = () => {
  return passport.authenticate("facebook", {
    session: false,
    scope: ["email"],
  });
};

const FBCallbackAuth = () => {
  return passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/sign-in",
  });
};

export default { LocalAuth, JwtAuth, FBAuth, FBCallbackAuth };
