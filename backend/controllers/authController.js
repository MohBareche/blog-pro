import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {
  User,
  validateLoginUser,
  validateRegisterUser,
} from "../models/User.js";

/** --------------------------------------------
 * @desc      Register New User - Sign Up
 * @route     /api/auth/register
 * @method    POST
 * @access    public
 * --------------------------------------------*/
const registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // @TODO - sending email (verify account)

  res
    .status(201)
    .json({ message: "you registered successfully, please log in" });
});

/** --------------------------------------------
 * @desc      Login User - Sign In
 * @route     /api/auth/login
 * @method    POST
 * @access    public
 * --------------------------------------------*/
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "invalid email or password" });

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch)
    return res.status(400).json({ message: "invalid email or password" });

  // @TODO - sending email (verify account if not verified)

  // generate token
  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});

export { registerUserCtrl, loginUserCtrl };