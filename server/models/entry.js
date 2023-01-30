const mongoose = require("mongoose");

//define an entry schema for the database
const EntrySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  mood: Number,
  sleep: Number,
  water: Number,
  datePosted: Date,
});

// compile model from schema
module.exports = mongoose.model("entry", EntrySchema);
