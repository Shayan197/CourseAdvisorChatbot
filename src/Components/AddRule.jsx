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

  const handleSubmit = () => {
    const newRule = {
      Key_Name: keyName,
      Type: type,
      Value: value,
      Is_Disabled: false,
    };

    if (isUpdateMode) {
      navigate("/admindashboard", {
        state: { action: "update", rule: newRule },
      });
    } else {
      navigate("/admindashboard", { state: { action: "add", rule: newRule } });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="p-6 sm:p-8 border-2 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 rounded-xl bg-white shadow-lg">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 text-center">
          {isUpdateMode ? "Update Rule" : "Add Rule"}
        </h2>

        {/* Key Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Key Name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            disabled={isUpdateMode}
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Value */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handleSubmit}
            className="btn-primary rounded px-5 py-2"
          >
            {isUpdateMode ? "Update Rule" : "Add Rule"}
          </button>
          <button
            onClick={() => navigate("/admindashboard")}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRule;
