const mongoose = require("mongoose");

const CardinalsSchema = new mongoose.Schema({
    name: {    
        type: String,
        required:true,
        trim: true
    },
    email: {    
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password: {    
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1710092553~exp=1710093153~hmac=288884b738fed3fce34dff08030caf5a54720cf82d411a74db135b2c844d7320',
    },
},{timestamps:true})

module.exports = mongoose.model("Cardinals", CardinalsSchema);

