const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Mongodb is connected"))
    .catch(err => console.error(err));

