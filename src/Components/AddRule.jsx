import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddRule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateData = location.state;

  const [keyName, setKeyName] = useState(updateData?.Key_Name || "");
  const [type, setType] = useState(updateData?.Type || "");
  const [value, setValue] = useState(updateData?.Value || "");
  const [isUpdateMode, setIsUpdateMode] = useState(!!updateData);

  useEffect(() => {
    if (updateData) {
      setIsUpdateMode(true);
    }
  }, [updateData]);

  // AddRule.js (update handleSubmit)
  const handleSubmit = () => {
    const newRule = {
      Key_Name: keyName,
      Type: type,
      Value: value,
      Is_Disabled: false,
    };

    if (isUpdateMode) {
      // sirf update ke liye navigate me bhej do
      navigate("/admindashboard", {
        state: { action: "update", rule: newRule },
      });
    } else {
      // naye add ke liye bhej do
      navigate("/admindashboard", { state: { action: "add", rule: newRule } });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 border-2 w-2/3 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Add Rule</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Key Name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="border px-2 py-1 w-full"
            disabled={isUpdateMode}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="btn-primary rounded mr-2 ">
            {isUpdateMode ? "Update Rule" : "Add Rule"}
          </button>
          <button
            onClick={() => navigate("/admindashboard")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRule;
