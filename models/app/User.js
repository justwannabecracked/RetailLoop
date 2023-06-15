const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    role: {
      type: String,
      enum: ["regular", "admin", "super_admin"],
      default: "regular",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    first_name: {
      type: String,
      required: [true, "Enter your First Name"],
    },
    last_name: {
        type: String,
        required: [true, "Enter your Last Name"],
    },
    country: {
        type: String,
        required: [true, "Enter your Country"],
    },
    phone_number: {
        type: String,
        required: [true, "Enter your Phone Number"],
    },
    password: {
      type: String,
      required: [true, "Enter your Password"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Enter your Email Address"],
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Enter a Valid Email Address",
      ],
      unique: true,
    },
    is_verified: {
      type: Boolean,
    },
    business_name: {  
        type: String,
    },
    business_industry: {
        type: String,
    },
    current_role: {
        type: String,
    },
    rc_number: {
        type: Number,
    },
    cac_number: { 
        type: Number,
    },
    reset_token: {    
        type: String,
    },
    business_registrated: {
        type: Boolean,
    },
    members_id: { 
        type: Number,
    },
    business_website: {
        type:   String,
    },
    contact_name: {
        type: String,
    },
    business_tin: {
        type: String,
    },
    brandPhoto: {
        type: String,
    },
    personalPhoto: {
        type: String
      },

  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (userpassword) {
  const isMatched = await bcrypt.compare(userpassword, this.password);
  return isMatched;
};

module.exports = mongoose.model("Users", UserSchema);
