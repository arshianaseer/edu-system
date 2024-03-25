import express from "express";
import Courses from "../../models/entity/course.js";
import User from "../../models/entity/users.js";
// the controller of the cources module which contain crud operations
export const createCourse = async (req, res) => {
  const errorsArr = [];
  const isclass = "courses";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const { course_name, instructor_name, description, semester } = req.body;
    const course = await Courses.create({
      course_name,
      instructor_name,
      description,
      semester,
      user_id,
    });
    return res.redirect("/user/courses");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/courses");
  }
};

export const getCourse = async (req, res) => {
  const { course_id } = req.params;
  const errorsArr = [];
  const isclass = "courses";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const course = await Courses.findOne({
      where: {
        course_id: course_id,
      },
    });
    return res.render("editcourses.ejs", { course, isclass, userData });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/courses");
  }
};

export const editCourse = async (req, res) => {
  const errorsArr = [];
  const isclass = "courses";
  try {
    const { course_id } = req.params;
    const { course_name, instructor_name, description, semester } = req.body;
    // Find the course by ID
    let course = await Courses.findOne({
      where: {
        course_id: course_id,
      },
    });

    if (!course) {
      cpnsole.log("Course not found");
      return res.redirect("/user/courses");
    }

    const updatedcourse = await course.update({
      course_name,
      instructor_name,
      description,
      semester,
    });
    console.log(updatedcourse);
    return res.redirect("/user/courses");
  } catch (error) {
    console.error(error);
    cpnsole.log("Something went wrong please try again");
    return res.redirect("/user/courses");
  }
};

export const deleteCourse = async (req, res) => {
  const errorsArr = [];
  const isclass = "courses";
  try {
    const { course_id } = req.params;

    // Find the course by ID
    let course = await Courses.findByPk(course_id);

    if (!course) {
      errorsArr.push("Course not found");
      return res.redirect("/user/courses");
    }

    // Delete the course
    await course.destroy();

    return res.redirect("courses.ejs");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/courses");
  }
};
