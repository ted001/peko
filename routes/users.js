//Akhila
import express from "express";
import { databaseManager } from "../db/MyMongoDB.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
const router = express.Router();

const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async function verify(email, password, cb) {
    console.log("verify", email);
    let data = { email, password };
    try {
      let checkuser = await databaseManager.finduser("users", email);
      if (checkuser) {
        let user = await databaseManager.authuser("users", data);
        if (user.password === password) {
          return cb(null, user);
        }
      }
      return cb(null, false);
    } catch (err) {
      console.log(err);
    }
    // Authentication successful
    return cb(null, user);
  }
);

passport.use(strategy);

passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize");
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/getCurrentUser", (req, res) => {
  console.log("get user", req.session.passport);
  res.json({ user: req.session.passport?.user, msg: "something" });
});

router.post("/register", async (req, res) => {
  let data;
  //   console.log("in post", data);
  try {
    data = req.body;
    console.log(data);
    let checkuser = await databaseManager.finduser("users", data.email);
    if (checkuser) {
      res.status(200).send({ userexists: true });
    }
    let dbstate = await databaseManager.insertuser("users", data);
    if (dbstate) {
      res.status(200).send({ success: true, userexists: false });
    } else {
      res.status(404).send({ success: false });
    }
  } catch (err) {
    console.log("err", err);
  }
});

// router.post("/login", async (req, res) => {
//   let data;

//   try {
//     data = req.body;
//     console.log("in post", data);
//     let checkuser = await databaseManager.finduser("users", data.email);
//     if (checkuser) {
//       let dbstate = await databaseManager.authuser("users", data);
//       if (dbstate) {
//         res.status(200).send({ success: true, userexists: true });
//       } else {
//         res.status(404).send({ success: false, userexists: true });
//       }
//     } else {
//       res.status(200).send({ userexists: false });
//     }
//   } catch (err) {
//     console.log("err", err);
//   }
// });

router.get("/success", async (req, res) => {
  res.status(200).send({ success: true, userexists: true });
  console.log(req.session);
});

router.get("/failure", async (req, res) => {
  console.log(req);
  let checkuser = await databaseManager.finduser("users", req.email);
  if (checkuser) {
    res.status(404).send({ success: false, userexists: true });
  } else {
    res.status(200).send({ userexists: false });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/success",
    failureRedirect: "/users/failure",
  })
);

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect("/");
    res.status(200).send({ logoutsuccess: true });
  });
  //   res.redirect("/login");
});

export default router;