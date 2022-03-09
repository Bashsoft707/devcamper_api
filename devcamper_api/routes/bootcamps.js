const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const advancedResult = require("../middleware/advancedResult");

const Bootcamp = require("../models/Bootcamp");

// Include other resources
const courseRouter = require("./courses");

// Re-route into other resources
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResult(Bootcamp, "courses"), getBootcamps)
  .post(createBootcamps);

router.route("/:id/photo").put(bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
