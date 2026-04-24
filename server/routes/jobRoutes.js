import express from 'express';
import {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').patch(updateJob).delete(deleteJob);

export default router;
