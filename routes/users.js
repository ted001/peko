//Akhila
import express from "express";
import { databaseManager } from "../db/MyMongoDB.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import bcrypt from "bcrypt";
const saltRounds = 10;
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
        let match = await bcrypt.compare(password, user.password);
        if (match) {
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
  console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/getCurrentUser", (req, res) => {
  console.log("get user", req.session.passport);
  res.json({ user: req.session.passport?.user, msg: "something" });
});

router.get("/fetchUpdatedUser", async (req, res) => {
  let user = await databaseManager.getuser(
    "users",
    req.session.passport?.user.email
  );
  console.log("fetch updated user", user);
  res.json({ user });
});

router.post("/register", async (req, res) => {
  let data;
  //   console.log("in post", data);
  try {
    data = req.body;
    console.log("register", data);
    let checkuser = await databaseManager.finduser("users", data.email);
    if (checkuser) {
      res.status(200).send({ userexists: true });
    }
    data.password = await bcrypt.hash(data.password, saltRounds);
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
  //   console.log(req.session);
});

router.get("/failure", async (req, res) => {
  //   console.log(req);
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

router.post("/delete", async (req, res) => {
  try {
    let data = req.body;
    console.log("in delete users.js", data);
    let email = data.email;
    let checkuser = await databaseManager.finduser("users", email);

    if (checkuser) {
      let dbstate = await databaseManager.deleteuser("users", { email });
      if (dbstate) {
        req.logout(function (err) {
          if (err) {
            return next(err);
          }
        });
        res.status(200).send({ success: true });
      } else {
        res.status(404).send({ success: false });
      }
    }
  } catch (err) {
    console.log("err", err);
  }
});

router.post("/update", async (req, res) => {
  let data = req.body;
  try {
    console.log(data);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    let dbstate = await databaseManager.updateuser("users", data);

    if (dbstate) {
      res.status(200).send({ updated: true });
    } else {
      res.status(404).send({ updated: false });
    }
  } catch (err) {
    console.log("error", err);
  }
});

export default router;
