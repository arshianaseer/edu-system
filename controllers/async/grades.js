import express from "express";
import Grades from "../../models/entity/grade.js";
import User from "../../models/entity/users.js";
import Courses from "../../models/entity/course.js";

export const createGrade = async (req, res) => {
  const errorsArr = [];
  const isclass = "grades";
  const user_id = req.userId;

  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const { mids, finals, assignments, quizes, others, course_id } = req.body;
    const grade = await Grades.create({
      user_id,
      mids,
      finals,
      assignments,
      quizes,
      others,
      course_id,
    });
    return res.redirect("/user/grades");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/grades");
  }
};

export const getGrades = async (req, res) => {
  const { id } = req.params;
  const errorsArr = [];
  const isclass = "grades";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const grades = await Grades.findOne({
      where: {
        id: id,
      },
      include: [{ model: Courses }],
    });
    const courses = await Courses.findAll({ where: { user_id: req.userId } });
    return res.render("editgrades.ejs", { grades, courses, isclass, userData });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/grades");
  }
};

export const editGrade = async (req, res) => {
  const errorsArr = [];
  const isclass = "grades";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const { id } = req.params;
    const { course_id, mids, finals, assignments, quizes, others } = req.body;

    const grades = await Grades.findOne({
      where: {
        id: id,
      },
    });

    const updateGrade = await grades.update({
      course_id,
      mids,
      finals,
      assignments,
      quizes,
      others,
    });

    if (!grades) {
      errorsArr.push("Something went wrong please try again");
      return res.redirect("/user/grades");
    }

    return res.redirect("/user/grades");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/grades");
  }
};

export const deleteGrade = async (req, res) => {
  const errorsArr = [];
  const isclass = "grades";
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const gradeId = req.params.id;

    // Find the grade by ID
    let grade = await Grades.findByPk(gradeId);

    if (!grade) {
      errorsArr.push("Grade not found");
      return res.redirect("/user/grades");
    }

    // Delete the grade
    await grade.destroy();

    errorsArr.push("Grade deleted successfully");
    return res.redirect("/user/grades");
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong please try again");
    return res.redirect("/user/grades");
  }
};
