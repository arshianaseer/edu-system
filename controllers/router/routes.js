import express from "express";
import session from "express-session";
import { LoginValidations, validateUser } from "../../validations/users.js";
import { createUser, loginUser } from "../async/users.js";
import authenticateToken, {
  checkLogin,
} from "../../validations/VerifyToken.js";
import { assignments, courses, grades, profile } from "../async/dashboard.js";
import { AssignmentsValidations } from "../../validations/assignments.js";
import {
  createAssignment,
  deleteAssignment,
  editAssignment,
  getAssignment,
} from "../async/assignments.js";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getCourse,
} from "../async/courses.js";
import {
  createGrade,
  deleteGrade,
  editGrade,
  getGrades,
} from "../async/grades.js";
import Courses from "../../models/entity/course.js";
import { CoursesValidations } from "../../validations/courses.js";
import { GradesValidations } from "../../validations/grades.js";
import User from "../../models/entity/users.js";

const route_sync = express.Router();

// Initialize session middleware
route_sync.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// login
route_sync.post("/user/login", checkLogin, LoginValidations, loginUser);
route_sync.get("/user/login", checkLogin, (req, res) => {
  res.render("login.ejs");
});

// logout
route_sync.get("/logout", checkLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("login.ejs");
  });
});

// register
route_sync.post("/user/register", checkLogin, validateUser, createUser);
route_sync.get("/user/register", checkLogin, (req, res) => {
  res.render("register.ejs");
});

// getAll
route_sync.get("/user/profile", authenticateToken, profile);
route_sync.get("/user/assignments", authenticateToken, assignments);
route_sync.get("/user/courses", authenticateToken, courses);
route_sync.get("/user/grades", authenticateToken, grades);

//form
route_sync.get(
  "/user/assignments-form",
  authenticateToken,
  async (req, res) => {
    try {
      const user_id = req.userId;
      const userData = await User.findOne({
        where: {
          user_id: user_id,
        },
      });
      const courses = await Courses.findAll({ where: { user_id: req.userId } });
      const isclass = "assignments";
      res.render("addassignments.ejs", { courses, isclass, userData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
route_sync.get("/user/courses-form", authenticateToken, async (req, res) => {
  try {
    const user_id = req.userId;
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const isclass = "courses";
    res.render("addcourses.ejs", { isclass, userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
route_sync.get("/user/grades-form", authenticateToken, async (req, res) => {
  try {
    const user_id = req.userId;
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const courses = await Courses.findAll({ where: { user_id: req.userId } });
    const isclass = "grades";
    res.render("addgrades.ejs", { courses, isclass, userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// post
route_sync.post(
  "/user/assignments",
  authenticateToken,
  AssignmentsValidations,
  createAssignment
);

route_sync.post(
  "/user/courses",
  authenticateToken,
  CoursesValidations,
  createCourse
);
route_sync.post(
  "/user/grades",
  authenticateToken,
  GradesValidations,
  createGrade
);

//get By Id
route_sync.get(
  "/user/assignments/:assignmentId",
  authenticateToken,
  getAssignment
);
route_sync.get("/user/courses/:course_id", authenticateToken, getCourse);
route_sync.get("/user/grades/:id", authenticateToken, getGrades);

//update
route_sync.post(
  "/user/:assignmentId",
  authenticateToken,
  AssignmentsValidations,
  editAssignment
);

route_sync.post(
  "/user/courses/:course_id",
  authenticateToken,
  CoursesValidations,
  editCourse
);
route_sync.post(
  "/user/grades/:id",
  authenticateToken,
  GradesValidations,
  editGrade
);

//get By Id
route_sync.get(
  "/user/assignments-delete/:assignmentId",
  authenticateToken,
  deleteAssignment
);
route_sync.get(
  "/user/courses-delete/:course_id",
  authenticateToken,
  deleteCourse
);
route_sync.get("/user/grades-delete/:id", authenticateToken, deleteGrade);

export default route_sync;
