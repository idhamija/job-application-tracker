import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";

const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Email address not registered");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { email, name, location } = req.body;
  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
