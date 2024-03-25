import { Op } from "sequelize";
import Assignments from "../../models/entity/assignment.js";
import Courses from "../../models/entity/course.js";
import User from "../../models/entity/users.js";
import Grades from "../../models/entity/grade.js";

// the controller of the assignment module which contain crud operations

export const profile = async (req, res) => {
  const errorsArr = [];
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const userAssignments = await Assignments.findAll({
      where: {
        user_id: user_id,
        due_date: { [Op.gte]: new Date() },
      },
      include: [
        {
          model: Courses,
        },
      ],
    });

    const assignment_count = await Assignments.count({
      where: {
        user_id: user_id,
      },
    });

    const grades_count = await Grades.count({
      where: {
        user_id: user_id,
      },
    });

    const courses_count = await Courses.count({
      where: {
        user_id: user_id,
      },
    });

    const isclass = "home";
    return res.render("profile.ejs", {
      userAssignments,
      isclass,
      userData,
      assignment_count,
      grades_count,
      courses_count,
    });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.render("login.ejs", { errorsArr });
  }
};

export const assignments = async (req, res) => {
  const errorsArr = [];
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const userAssignments = await Assignments.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: Courses,
        },
      ],
    });
    const isclass = "assignments";
    return res.render("assignments.ejs", {
      userAssignments,
      isclass,
      userData,
    });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.render("profile.ejs", { errorsArr });
  }
};

export const courses = async (req, res) => {
  const errorsArr = [];
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const userAssignments = await Courses.findAll({
      where: {
        user_id: user_id,
      },
    });
    const isclass = "courses";
    return res.render("courses.ejs", { userAssignments, isclass, userData });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.render("profile.ejs", { errorsArr });
  }
};

export function calculateGrade(mids, finals, assignments, quizzes) {
  const totalMarks =
    mids * 0.3 + finals * 0.4 + assignments * 0.15 + quizzes * 0.15;

  let letterGrade = "";
  if (totalMarks >= 90) {
    letterGrade = "A";
  } else if (totalMarks >= 85) {
    letterGrade = "A-";
  } else if (totalMarks >= 80) {
    letterGrade = "B+";
  } else if (totalMarks >= 75) {
    letterGrade = "B";
  } else if (totalMarks >= 70) {
    letterGrade = "B-";
  } else if (totalMarks >= 65) {
    letterGrade = "C+";
  } else if (totalMarks >= 60) {
    letterGrade = "C";
  } else if (totalMarks >= 55) {
    letterGrade = "C-";
  } else if (totalMarks >= 50) {
    letterGrade = "D+";
  } else if (totalMarks >= 45) {
    letterGrade = "D";
  } else if (totalMarks >= 40) {
    letterGrade = "D-";
  } else {
    letterGrade = "F";
  }

  return letterGrade;
}

export const grades = async (req, res) => {
  const errorsArr = [];
  const user_id = req.userId;
  try {
    const userData = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    const userAssignments = await Grades.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: Courses,
        },
      ],
    });
    console.log("----------------------");
    const gradesWithCharacters = userAssignments.map((grade) => ({
      ...grade.toJSON(),
      grade: calculateGrade(
        grade.mids,
        grade.finals,
        grade.assignments,
        grade.quizes
      ),
    }));
    console.log(gradesWithCharacters);
    const isclass = "grades";
    return res.render("grades.ejs", {
      userAssignments: gradesWithCharacters,
      isclass,
      userData,
    });
  } catch (error) {
    console.error(error);
    errorsArr.push("Something went wrong, please try again");
    return res.render("profile.ejs");
  }
};
