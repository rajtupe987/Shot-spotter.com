const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  role: { type: String, enum: ['client', 'photographer','admin'], default: 'client' },
  meetings: { type:Array,required:true, default: [] },
  approved: { type: Boolean, default: false },
  camera: {
    type: String,
    default: null
  },
  expertise: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  price:{
    type:Number,
    default:null
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };