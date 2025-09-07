import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../Assets/assets";

const AdminDashboard = () => {
  // AdminDashboard.js (sirf relevant part changes)
  const defaultRules = [
    {
      Key_Name: "getCgpa",
      Type: 1,
      Value: "Select cgpa from Students where reg_no = ?",
      Is_Disabled: false,
    },
    {
      Key_Name: "getAllFailCources",
      Type: 1,
      Value: "Select failCources from Students where reg_no = ?",
      Is_Disabled: false,
    },
    {
      Key_Name: "timeForCompletationDegree",
      Type: 2,
      Value: "12 Semesters",
      Is_Disabled: false,
    },
    {
      Key_Name: "AttendanceRule",
      Type: 2,
      Value: "Minimum 75% attendance is required to sit in exams.",
      Is_Disabled: false,
    },
    {
      Key_Name: "CGPAWarning",
      Type: 2,
      Value: "Students with CGPA below 2.0 will be on probation.",
      Is_Disabled: false,
    },
    {
      Key_Name: "MaxProbations",
      Type: 2,
      Value: "Maximum of 3 probations are allowed during degree.",
      Is_Disabled: false,
    },
    {
      Key_Name: "LabRule",
      Type: 2,
      Value: "Passing lab component is mandatory to pass the course.",
      Is_Disabled: false,
    },
    {
      Key_Name: "RetakePolicy",
      Type: 2,
      Value: "Course can only be retaken if grade is F.",
      Is_Disabled: false,
    },
    {
      Key_Name: "ExamDuration",
      Type: 2,
      Value: "Final exams are of 3 hours duration.",
      Is_Disabled: false,
    },
    {
      Key_Name: "AssignmentPolicy",
      Type: 2,
      Value: "Late assignments will not be accepted.",
      Is_Disabled: false,
    },
    {
      Key_Name: "AddDrop",
      Type: 2,
      Value: "Add/Drop of courses is only allowed in the first 2 weeks.",
      Is_Disabled: false,
    },
  ];
  const [rules, setRules] = useState(defaultRules);
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state?.action === "add") {
      setRules((prev) => [...prev, location.state.rule]);
    }
    if (location.state?.action === "update") {
      setRules((prev) =>
        prev.map((r) =>
          r.Key_Name === location.state.rule.Key_Name ? location.state.rule : r
        )
      );
    }
  }, [location.state]);

  const toggleDisable = (index) => {
    setRules((prev) => {
      const updated = [...prev];
      updated[index].Is_Disabled = !updated[index].Is_Disabled;
      return updated;
    });
  };

  const handleUpdate = (rule) => {
    navigate("/admindashboard/addrule", { state: rule });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center text-2xl p-5 ">
        <p className="font-semibold">Admin Panel</p>
        <div className="relative">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-10 cursor-pointer"
            onClick={() => setDropdown((prev) => !prev)}
          />
          {dropdown && (
            <div className="absolute right-0 bg-[#f0f4f9] text-base px-4 py-1 shadow rounded z-10">
              <p
                className="hover:bg-[#dfe4ea] cursor-pointer px-2 py-1 text-red-400"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/admindashboard/addrule")}
          className="btn-primary rounded"
        >
          Add Rule
        </button>
        <button
          //   onClick={fetchRules}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
        <input
          type="text"
          placeholder="Search by Key_Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <table className="w-full border mt-10">
        <thead>
          <tr>
            <th>Key_Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules
            .filter((rule) => rule.Key_Name.includes(search))
            .map((rule, index) => (
              <tr
                key={rule.Key_Name}
                style={{
                  backgroundColor: rule.Is_Disabled ? "#e0e0e0" : "white",
                  color: rule.Is_Disabled ? "gray" : "black",
                  opacity: rule.Is_Disabled ? 0.6 : 1,
                }}
              >
                <td className="text-center">{rule.Key_Name}</td>
                <td className="text-center">{rule.Type}</td>
                <td className="text-center">{rule.Value}</td>
                <td className="text-center" style={{ pointerEvents: "auto" }}>
                  <button
                    onClick={() => handleUpdate(rule)}
                    className="bg-yellow-500 text-white px-2 py-1 m-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => toggleDisable(index, rule.Key_Name)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    {rule.Is_Disabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
