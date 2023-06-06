const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChecklistSchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  complete: {
    type: Boolean,
    default: false
  },
  timestamp:{
    type: String,
    default: Date.now()
  },
})

const Checklist = mongoose.model("Checklist", ChecklistSchema)

module.exports = Checklist