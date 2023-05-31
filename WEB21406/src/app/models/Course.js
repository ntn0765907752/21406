const mongoose = require("mongoose");
//const slug = require("mongoose-slug-generator");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    videoId: { type: String, maxLength: 600 },
    level: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", Course);
