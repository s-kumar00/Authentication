const cardinalModel = require("../Models/cardinalModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateOTP } = require("../OtpGenerate/sendOTP");
const OTP = require("../Models/otpModel");
const sendMail = require("../OtpGenerate/sendMail");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await cardinalModel.findOne({ email });
    if (data) {
      res
        .status(201)
        .json({ message: "Email id is already registered", alert: false });
    } else {
      const hashPassword = await bcrypt.hashSync(password, 10);
      const newCardinals = new cardinalModel({
        name,
        email,
        password: hashPassword,
      });
      await newCardinals.save();
      res.status(201).json({ message: "Successfully sign up", alert: true });
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await cardinalModel.findOne({ email });
    if (!validUser) {
      res.status(201).json({ message: "User Not Found", alert: false });
    }
    const validPassword = await bcrypt.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      res.status(201).json({ message: "Invalid Password", alert: false });
    }

    const token = await jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 10 * 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(201)
      .json({ user: rest, message: "Login Success", alert: true });
  } catch (error) {
    next(error);
  }
};

exports.signOut = async (req, res) => {
  res.clearCookie("access_token").status(200).json("SignOut success!");
};

exports.emailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await cardinalModel.findOne({ email });
    if (!data) {
      res.status(201).json({ message: "User Not Found", alert: false });
    }
    const createOTP = await generateOTP(email);
    //send mail to generate otp
    const mailOptions = {
      from: process.env.USER,
      to: `${email}`,
      subject: "Password Recovery Email",
      html: `<p>Otp to change the password </p><p style="color:tomato; font-size:20px; letter-spacing:2px;"><b>${createOTP}</b></p>`,
    };
    await sendMail(mailOptions);
    const hashOTP = await bcrypt.hashSync(createOTP, 10);
    const newOTP = await new OTP({
      email,
      otp: hashOTP,
      createAt: Date.now(),
      expireAt: new Date(Date.now() + 1 * 3600 * 1000),
    });
    await newOTP.save();
    res.status(201).json({
      message: "Otp send to email Successfully",
      alert: true,
    });
  } catch (err) {
    next(err);
  }
}


exports.otpVerification = async (req, res, next) => {
  try {
    const { email, otpValue } = req.body;
    if (!(email && otpValue)) {
      res.status(201).json({ message: "Plz inter Otp", alert: false });
    }

    const otp = await OTP.findOne({ email });
    if (!otp) {
      res.status(201).json({ message: "Invalid OTP", alert: false });
    }
    
    const { expireAt } = otp;
    if (Date.now() > expireAt) {
      await OTP.deleteOne({ email });
      res.status(201).json({ message: "OTP expired", alert: false });
    }

    const isMatch = await bcrypt.compare(otpValue, otp.otp);

    if (!isMatch) {
      res.status(201).json({ message: "Invalid OTP", alert: false });
    }
    await OTP.deleteOne({ email });
    res.status(201).json({ message: "OTP verified successfully", alert: true });
  } catch (error) {
    next(error);
  }
}

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await cardinalModel.findOne({ email });
    const hashPassword = await bcrypt.hashSync(password, 10);
    user.password = hashPassword;
    user.save();
    res.status(201).json({ message: "password changed successfully", alert: true });
  } catch (error) {
    next(error)
  }
}


exports.google = async (req, res, next) => {
  try {
    const user = await cardinalModel.findOne({ email: req.body.email });
    if (user) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(201)
        .json({ user: rest, message: "Login Success", alert: true });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hashSync(generatedPassword, 10);
      const newUser = new cardinalModel({
        name:
          req.body.displayName.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photoURL,
      });
      await newUser.save();
      const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(201)
        .json({ user: rest, message: "Login Success", alert: true });
    }
  } catch (error) {
    next(error);
  }
};
