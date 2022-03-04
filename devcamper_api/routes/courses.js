const express = require("express");
const { route } = require("express/lib/application");

const router = express.Router({ mergeParams: true });

const { getCourses } = require("../controllers/courses");

router.route("/").get(getCourses);

module.exports = router;