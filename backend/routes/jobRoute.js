const express = require("express");
const { getJobs, postJobs, deleteJob } = require("../controller/jobController");

const router = express.Router();

router.get('/get', getJobs); // This route handles GET requests to /api/jobs and calls the getJobs controller function
router.post('/post', postJobs); // This route handles POST requests to /api/jobs/post and calls the postJobs controller function
router.delete('/:id', deleteJob); // This route handles DELETE requests to /api/jobs/:id and calls the deleteJob controller function


module.exports = router;
