import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { NotFoundError } from "../errors/index.js";
import Job from "../models/Job.js";

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.company = { $regex: search, $options: "i" };
  }
  if (status !== "all") {
    queryObject.status = status;
  }
  if (jobType !== "all") {
    queryObject.jobType = jobType;
  }
  let result = Job.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("company");
  }
  if (sort === "z-a") {
    result = result.sort("-company");
  }

  const totalJobs = await result;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const numOfPages = Math.ceil(totalJobs.length / limit);
  result = result.skip(skip).limit(limit);

  const jobs = await result;
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: totalJobs.length, numOfPages });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body,
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  res.status(StatusCodes.OK).json({ defaultStats });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
