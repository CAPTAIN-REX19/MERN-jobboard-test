import Job from '../models/Job.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/index.js';
import { StatusCodes } from '../errors/statusCodes.js';

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search, page, limit } = req.query;

  const queryObject = { createdBy: req.user.userId };

  // Filtering
  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  // Build query
  let result = Job.find(queryObject);

  // Sorting
  switch (sort) {
    case 'oldest':
      result = result.sort('createdAt');
      break;
    case 'a-z':
      result = result.sort('position');
      break;
    case 'z-a':
      result = result.sort('-position');
      break;
    default:
      // latest
      result = result.sort('-createdAt');
  }

  // Pagination
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  result = result.skip(skip).limit(limitNum);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limitNum);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const createJob = async (req, res) => {
  const { company, position, jobLocation, status, jobType } = req.body;

  if (!company || !position || !jobLocation) {
    throw new BadRequestError('Please provide all values');
  }

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;

  if (!company || !position || !jobLocation) {
    throw new BadRequestError('Please provide all values');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  if (job.createdBy.toString() !== req.user.userId) {
    throw new UnauthorizedError('Not authorized to update this job');
  }

  const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  if (job.createdBy.toString() !== req.user.userId) {
    throw new UnauthorizedError('Not authorized to delete this job');
  }

  await job.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'Job removed successfully' });
};

export { getAllJobs, createJob, updateJob, deleteJob };
