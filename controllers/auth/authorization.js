const User = require("../../models/app/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone_number, country } = req.body;
    if (!email || !password || !first_name || !last_name || !phone_number || !country ) {
      return res.status(400).json({
        msg: "Enter all Fields",
        status: false,
      });
    }

    if(password.length < 6){
        return res.status(400).json({
            msg: "Password must be at least 6 characters",  
            status: false,
        });
    }

    if(phone_number.length < 11){
        return res.status(400).json({
            msg: "Phone Number must be at least 11 characters",
            status: false,
        });
    }

    const user = await User.findOne({ email }).select("-password");
    if (user) {
      return res.status(401).json({
        msg: "Email Already Exist",
        status: false,
      });
    }

    const salt = bcrypt.genSaltSync(12);
    const hashpassword = await bcrypt.hash(password, salt);
    const customers = await User.find({});
    const newCustomer = await User.create({
        id: customers.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country,
        email: req.body.email,
        password: hashpassword,
        phone_number: req.body.phone_number,
        is_verified: true,
      });
      await newCustomer.save();
      return res.status(200).json({
        msg: "User Created Successfully",
        status: true,
        data: newCustomer,
      });
    
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      msg: "Server Error Occured",
      status: false,
    });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Enter Email and Password",
        status: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid Email Credentials",
        status: false,
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        msg: "Invalid Password Credentials",
        status: false,
      });
    }

    if (!user.is_verified) {
      return res.status(400).json({
        msg: "Kindly Verify your Account",
        status: false,
      });
    }


    const payload = {
      user: {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: process.env.JWTLIFETIME,
    });

    return res.status(200).json({
      data: { ...user, token },
      msg: "Login Successful",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      msg: "Server Error",
      status: false,
    });
  }
};





module.exports = {
  signUp,
  signIn,
};
