import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../Assets/assets";
import { studentsDataForSupercisor } from "../Assets/data";

const Supervisor = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const [students] = useState(studentsDataForSupercisor);

  const empFullName = `${localStorage.getItem("Emp_firstname") || ""} ${
    localStorage.getItem("Emp_middle") || ""
  } ${localStorage.getItem("Emp_lastname") || ""}`.trim();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // common function for both enter key + button click
  const handleSearchNavigate = () => {
    const matchedStudent = students.find(
      (student) => student.Reg_No.toLowerCase() === search.toLowerCase()
    );
    if (matchedStudent) {
      localStorage.setItem("regNo", matchedStudent.Reg_No);
      localStorage.setItem(
        "currentsemesterno",
        matchedStudent.currentsemesterno
      );
      navigate("/dashboard");
    } else {
      alert("Student not found!");
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Advisor Panel</h1>
        <div className="relative inline-block text-left">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-10 cursor-pointer"
            onClick={() => setDropdown((prev) => !prev)}
          />
          {dropdown && (
            <div className="absolute right-0 bg-[#f0f4f9] text-base px-4 py-1 shadow rounded">
              <p
                className="hover:bg-[#dfe4ea] px-2 py-1 cursor-pointer text-red-400"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Welcome & Search */}
      <div className="mt-4 text-xl font-semibold text-gray-700 text-center">
        Welcome {empFullName}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search by Reg No"
          className="w-full md:w-1/3 p-2 border-2 rounded-lg shadow-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchNavigate()}
        />
        <button
          onClick={handleSearchNavigate}
          className="btn-primary w-40 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Data Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="py-2 px-4">Reg No</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Final Course</th>
              <th className="py-2 px-4">Section</th>
              <th className="py-2 px-4">Current Semester</th>
              <th className="py-2 px-4">Semester No</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) =>
                student.Reg_No.toLowerCase().includes(search.toLowerCase())
              )
              .map((student, index) => (
                <tr
                  key={index}
                  className="text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{student.Reg_No}</td>
                  <td className="py-2 px-4">
                    {[
                      student.St_firstname,
                      student.St_middlename,
                      student.St_lastname,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  </td>
                  <td className="py-2 px-4">{student.Final_course}</td>
                  <td className="py-2 px-4">{student.Section}</td>
                  <td className="py-2 px-4">{student.currentsemesterno}</td>
                  <td className="py-2 px-4">{student.Semester_no}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supervisor;
