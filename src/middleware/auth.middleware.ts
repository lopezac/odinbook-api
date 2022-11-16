import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

// Local auth, email and password
const UserConfig = { usernameField: "email" };
passport.use(
  new LocalStrategy(UserConfig, (username, password, done) => {
    User.findOne({ email: username }).exec((err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "User was not found" });
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
// interface Profile extends passport.Profile {}
passport.use(
  new FacebookStrategy(
    FBOptions,
    (accessToken, refreshToken, profile: Profile, cb) => {
      const userData = profile._json;
      User.findOne({ facebookId: userData.id }).exec((err, user) => {
        if (err) return cb(err);
        if (user) return cb(null, user);
      });
      console.log("profile", profile);
      // const { first_name, last_name, id, picture, birthday, gender, email } =
      //   profile;
      // console.log("data", profile._json, profile);
      // const user = new User({
      //   firstName: first_name,
      //   lastName: last_name,
      //   facebookId: id,
      //   picture,
      //   birthday,
      //   gender,
      //   email,
      // });
      // user.save().then((user) => {
      //   cb(null, user);
      // });
      cb(null, profile._json);
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
  return passport.authenticate("facebook", { session: false });
};

const FBCallbackAuth = () => {
  return passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/sign-in",
  });
};

const RedirectHome = (req: Request, res: Response) => {
  return res.redirect("/posts");
};

export default { LocalAuth, JwtAuth, FBAuth, FBCallbackAuth, RedirectHome };
