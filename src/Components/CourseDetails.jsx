import React, { useEffect, useState } from "react";
import { assets } from "../Assets/assets";
import CurrentEnrollments from "./CurrentEnrollments";

const CourseDetails = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollCount, setEnrollCount] = useState(0);

  const handleEnrollCount = (count) => {
    setEnrollCount(count);
  };

  useEffect(() => {
    // Dummy data instead of API
    const dummyCourses = [
      {
        Course_no: "CS101",
        ATTEMPT_NO: 1,
        SEMESTER_NO: 1,
        SECTION: "A",
        Assi_score: 15,
        Prac_score: 20,
        Midterm_score: 30,
        Final_score: 40,
        Q_points: 3.0,
        Grade: "A",
      },
      {
        Course_no: "CS102",
        ATTEMPT_NO: 1,
        SEMESTER_NO: 2,
        SECTION: "B",
        Assi_score: 12,
        Prac_score: 15,
        Midterm_score: 25,
        Final_score: 30,
        Q_points: 2.0,
        Grade: "F",
      },
      {
        Course_no: "CS101",
        ATTEMPT_NO: 1,
        SEMESTER_NO: 3,
        SECTION: "A",
        Assi_score: 15,
        Prac_score: 20,
        Midterm_score: 30,
        Final_score: 40,
        Q_points: 3.0,
        Grade: "A",
      },
      {
        Course_no: "CS102",
        ATTEMPT_NO: 1,
        SEMESTER_NO: 4,
        SECTION: "B",
        Assi_score: 12,
        Prac_score: 15,
        Midterm_score: 25,
        Final_score: 30,
        Q_points: 2.0,
        Grade: "F",
      },
      {
        Course_no: "CS101",
        ATTEMPT_NO: 1,
        SEMESTER_NO: 5,
        SECTION: "A",
        Assi_score: 15,
        Prac_score: 20,
        Midterm_score: 30,
        Final_score: 40,
        Q_points: 3.0,
        Grade: "A",
      },
      {
        Course_no: "CS102",
        ATTEMPT_NO: 1,
        SEMESTER_NO: 6,
        SECTION: "B",
        Assi_score: 12,
        Prac_score: 15,
        Midterm_score: 25,
        Final_score: 30,
        Q_points: 2.0,
        Grade: "F",
      },
    ];

    setCourseData(dummyCourses);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 min-h-screen relative">
      {/* Cards Section */}
      <div className="flex justify-around items-center text-lg p-7 text-customGray/90 gap-6">
        <div className="h-36 w-64 bg-customBlue/70 rounded-2xl px-4 py-6 flex-1">
          <div className="flex-1 flex justify-between mb-6">
            <p>Passed Courses</p>
            <img src={assets.paper_icon} alt="paper-icon" className="size-6" />
          </div>
          <p className="ml-4 text-3xl">
            {
              courseData.filter((course) =>
                ["A", "B", "C", "D"].includes(
                  course.Grade?.trim().toUpperCase()
                )
              ).length
            }
          </p>
        </div>
        <div className="h-36 w-64 bg-[#FF8000]/70 rounded-2xl px-4 py-6 flex-1">
          <div className="flex-1 flex justify-between mb-6">
            <p>Current Enrollments</p>
            <img src={assets.paper_icon} alt="paper-icon" className="size-6" />
          </div>
          <p className="ml-4 text-3xl">{enrollCount}</p>
        </div>
        <div className="h-36 w-64 bg-[#FF0000]/70 rounded-2xl px-4 py-6 flex-1">
          <div className="flex-1 flex justify-between mb-6">
            <p>Failed Courses</p>
            <img src={assets.paper_icon} alt="paper-icon" className="size-6" />
          </div>
          <p className="ml-4 text-3xl">
            {
              courseData.filter(
                (course) => course.Grade?.trim().toUpperCase() === "F"
              ).length
            }
          </p>
        </div>
      </div>
      {/* Table Section */}
      <div className="px-7">
        <h1 className="text-2xl mb-2 font-semibold">
          Current Enrolled Cources
        </h1>
        <CurrentEnrollments onEnrollCountCount={handleEnrollCount} />
        <h1 className="text-2xl mb-2 font-semibold mt-2">
          All Cources Details
        </h1>
        {loading ? (
          <p className="text-center text-lg">Loading data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2">
                    Course No
                  </th>
                  <th className="border border-gray-300 px-3 py-2">Attempt</th>
                  <th className="border border-gray-300 px-3 py-2">Semester</th>
                  <th className="border border-gray-300 px-3 py-2">Section</th>
                  <th className="border border-gray-300 px-3 py-2">
                    Assignment Score
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    Practical Score
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    Midterm Score
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    Final Score
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    Quality Points
                  </th>
                  <th className="border border-gray-300 px-3 py-2">Grade</th>
                  <th className="border border-gray-300 px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {courseData.length > 0 ? (
                  courseData.map((course, index) => {
                    const grade = course.Grade?.trim().toUpperCase(); // Trim spaces and convert to uppercase
                    const isPass = ["A", "B", "C", "D"].includes(grade);

                    return (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-300 px-3 py-2">
                          {course.Course_no}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.ATTEMPT_NO}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.SEMESTER_NO}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.SECTION}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.Assi_score}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.Prac_score}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.Midterm_score}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.Final_score}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {course.Q_points}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {grade}
                        </td>
                        <td
                          className="border border-gray-300 px-4 py-2 font-semibold"
                          style={{ color: isPass ? "#077EFF" : "#FF0000" }}
                        >
                          {isPass ? "Pass" : "Fail"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-red-500 py-4">
                      There is an error occured
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
