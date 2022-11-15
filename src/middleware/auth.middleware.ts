import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

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

const opts = {
  secretOrKey: process.env.JWT_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("run jwt", process.env.JWT_KEY);
    User.findOne({ email: jwt_payload.email }).exec((err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "User was not found" });
      return done(null, user);
    });
    // User.findOne();
  })
);

export const LocalAuth = () => {
  return passport.authenticate("local", { session: false });
};

export const JwtAuth = () => {
  return passport.authenticate("jwt", { session: false });
};
