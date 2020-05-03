const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    Publication: String,
    thumb_url: String,
},{timestamps: true});

module.exports = mongoose.model("Book", bookSchema);