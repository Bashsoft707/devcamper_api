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

const Courses = require("../models/Course");
const advancedResult = require("../middleware/advancedResult");

router
  .route("/")
  .get(
    advancedResult(Courses, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(addCourse);

router
  .route("/:id")
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
