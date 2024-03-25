import express from "express";
import Assignments from "../../models/entity/assignment.js";
import User from "../../models/entity/users.js";
import Courses from "../../models/entity/course.js";

// the controller of the assignment module which contain crud operations
export const createAssignment = async (req, res) => {
  const errorsArr = [];
  const isclass = "assignments";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });

    const { name, due_date, description, course_id } = req.body;
    const assignment = await Assignments.create({
      name,
      due_date,
      description,
      course_id,
      user_id,
    });
    return res.redirect("/user/assignments");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.render("addassignments.ejs", { errorsArr, isclass, userData });
  }
};

export const getAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const errorsArr = [];
  const isclass = "assignments";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const assignment = await Assignments.findOne({
      where: {
        id: assignmentId,
      },
      include: [{ model: Courses }],
    });
    if (!assignment) {
      errorsArr.push("Assignment not found");

      return res.redirect("/user/assignments");
    }
    const courses = await Courses.findAll({ where: { user_id: req.userId } });
    return res.render("editassignments.ejs", {
      assignment,
      courses,
      isclass,
      userData,
    });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.redirect("/user/assignments");
  }
};

export const editAssignment = async (req, res) => {
  const errorsArr = [];
  const isclass = "assignments";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const { assignmentId } = req.params;
    const { course_id, name, due_date, description } = req.body;

    // Find the assignment by ID
    let assignment = await Assignments.findOne({
      where: {
        id: assignmentId,
      },
    });

    const updateassignment = await assignment.update({
      course_id,
      name,
      due_date,
      description,
    });

    if (!assignment) {
      errorsArr.push("Assignment not found");
      return res.redirect("/user/assignments");
    }

    return res.redirect("/user/assignments");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.redirect("/user/assignments");
  }
};

export const deleteAssignment = async (req, res) => {
  const errorsArr = [];
  const isclass = "assignments";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const { assignmentId } = req.params;

    // Find the assignment by ID
    let assignment = await Assignments.findByPk(assignmentId);

    if (!assignment) {
      errorsArr.push("Assignment not found");
      return res.redirect("/user/assignments");
    }

    // Delete the assignment
    await assignment.destroy();
    errorsArr.push("Deleted successfully");
    return res.redirect("/user/assignments");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.redirect("/user/assignments");
  }
};
