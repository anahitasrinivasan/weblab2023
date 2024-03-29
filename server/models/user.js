const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  userRequested: Array,
  requestedByUser: Array,
  friends: Array,
  idNum: Number,
  settings: Array,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
