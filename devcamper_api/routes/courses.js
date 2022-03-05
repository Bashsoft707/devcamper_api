const express = require("express");
const { route } = require("express/lib/application");

const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

router.route("/").get(getCourses).post(addCourse);

router.route("/:id").get(getSingleCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
