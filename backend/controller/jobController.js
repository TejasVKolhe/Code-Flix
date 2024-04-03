const asyncHandler = require("express-async-handler");
const Jobs = require("../model/jobsSchema");

// Fetch jobs
// GET /api/jobs
// Public

const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Jobs.find({}).sort({ date: -1 }); // Fetch all jobs from the database and sort them by date in descending order
    res.json(jobs); // Send the fetched jobs as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create jobs
// POST /api/jobs/post
// Private

const postJobs = asyncHandler(async (req, res) => {
  const { position, company, salary, batch, location, apply, image } = req.body;

  try {
    const job = await Jobs.create({
      position,
      company,
      salary,
      batch,
      location,
      apply,
      image,
    });

    res.status(201).json({
      msg: "New Job Posted",
      job: job // Optionally, you can also send the created job data in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to post job' });
  }
});


// Delete job
// DELETE /api/jobs/:id
// Private/Admin

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Jobs.findById(req.params.id);
  if (job) {
    await job.remove();
    res.send({ message: "Job Removed" });
  } else {
    res.status(404).json({ message: "Job not found!" });
  }
});

module.exports = { getJobs, postJobs, deleteJob };
