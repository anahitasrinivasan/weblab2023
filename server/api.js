/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Entry = require("./models/entry");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/journals", auth.ensureLoggedIn, (req, res) => {
  Entry.find({ creator_id: req.user._id }).then((entries) => {
    res.send(entries);
  });
});

router.post("/journal", auth.ensureLoggedIn, (req, res) => {
  const newEntry = new Entry({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    mood: req.body.mood,
    sleep: req.body.sleep,
    water: req.body.water,
  });

  newEntry.save().then((entry) => res.send(entry));
});

router.get("/friendInfo", (req, res) => {
  // User.find({ _id: req.query._id }).then((friend) => {
  //   const friendInfo = {
  //     userRequested: friend[0].userRequested,
  //     requestedByUser: friend[0].requestedByUser,
  //     friends: friend[0].friends,
  //   };
  //   res.send(friendInfo);
  // });
  User.find({ _id: req.query._id }).then((friend) => {
    res.send(friend[0]);
  });
});

router.get("/users", (req, res) => {
  // res.send(req.query);
  User.find({ name: req.query.search }).then((users) => res.send(users));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;