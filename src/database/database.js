const mongoose = require('mongoose');


module.exports = mongoose.connect(process.env.MONGO,{useNewUrlParser: true, useUnifiedTopology: true});