const cardinalModel = require("../Models/cardinalModel");
const bcrypt = require("bcryptjs");
exports.test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    await cardinalModel.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ message: "Account deleted successfully", alert: true });
  } catch (error) {
    res.status(401).json({ message: error, alert: false });
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await cardinalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const userObject = user.toObject();
    delete userObject.password;
    res
      .status(201)
      .json({ user:userObject, message: "Account updated successfully", alert: true });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const {oldPassword, newPassword} = req.body;
    const user = await cardinalModel.findById(req.params.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
      return res.status(201).json({ message: "Old password is incorrect", alert: false });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await cardinalModel.findByIdAndUpdate(req.params.id, { password: hashPassword });
    res
      .status(201)
      .json({ message: "Password updated successfully", alert: true });
  } catch (error) {
    next(error);
  }
};
