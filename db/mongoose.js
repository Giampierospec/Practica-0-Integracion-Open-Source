const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var  url  = process.env.MONGODB_URI;
mongoose.connect(url,{useNewUrlParser: true});
