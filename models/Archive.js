const mongoose = require('mongoose');

let archiveSchema = new mongoose.Schema({
    header:{rnc:{type:String,required:true}}
});

let Archive = mongoose.model("Archive",archiveSchema);
module.exports = {Archive};