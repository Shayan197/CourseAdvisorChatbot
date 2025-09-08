import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../Assets/assets";
import { defaultRules } from "../Assets/data";

const AdminDashboard = () => {
  // AdminDashboard.js (sirf relevant part changes)

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
      {/* Header */}
      <div className="flex justify-between items-center text-2xl p-5">
        {/* Left Side (Admin Panel Text) */}
        <p className="font-semibold">Admin Panel</p>

        {/* Right Side (User Icon + Dropdown) */}
        <div className="relative">
          <img
            src={assets.profile_icon}
            alt="User"
            className="w-10 h-10 cursor-pointer rounded-full border border-gray-300"
            onClick={() => setDropdown((prev) => !prev)}
          />
          {dropdown && (
            <div className="absolute right-0 mt-2 bg-[#f0f4f9] text-base px-4 py-2 shadow-lg rounded z-10 w-32">
              <p
                className="hover:bg-[#dfe4ea] cursor-pointer px-2 py-1 text-red-500 rounded"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/admindashboard/addrule")}
          className="btn-primary rounded w-full md:w-72"
        >
          Add Rule
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto">
          Refresh
        </button>
        <input
          type="text"
          placeholder="Search by Key_Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-full md:w-64"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border mt-10 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2">Key_Name</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Actions</th>
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
                  <td className="text-center px-2 py-2">{rule.Key_Name}</td>
                  <td className="text-center px-2 py-2">{rule.Type}</td>
                  <td className="text-center px-2 py-2">{rule.Value}</td>
                  <td className="text-center px-2 py-2">
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        onClick={() => handleUpdate(rule)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => toggleDisable(index, rule.Key_Name)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        {rule.Is_Disabled ? "Enable" : "Disable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
