const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const mongooseSlugGenerator = require("mongoose-slug-generator");


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

//add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{
  deletedAt: true,
  overrideMethods:'all'});
module.exports = mongoose.model("Course", Course);
