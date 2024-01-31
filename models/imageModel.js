const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    publicId :{
        type: String,
        required: false,
    }
    ,
    url :{
        type: String,
        required: true,
    },
    caption:{
        type: String,
    }
})
  

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image; 