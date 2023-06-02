const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const mongooseSlugGenerator = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    _id:{ type: Number,},
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    videoId: { type: String, maxLength: 600 },
    level: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255, slug: "name", unique: true },
  },
  { 
    _id: false,
    timestamps: true,
  }
);
//Custom query helper
CourseSchema.query.sortable = function(req){
  if (req.query.hasOwnProperty('_sort')){
    const isValidtype = ['asc','desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : 'desc',
    });
  }
  return this;



}


//add plugins
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete,{
  deletedAt: true,
  overrideMethods:'all'});
module.exports = mongoose.model("Course", CourseSchema);
