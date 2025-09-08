import React, { useEffect, useState } from "react";
import { dummyEnrollments } from "../Assets/data";

const CurrentEnrollments = ({ onEnrollCountCount }) => {
  const [enrollData, setEnrollData] = useState([]);

  useEffect(() => {
    setEnrollData(dummyEnrollments);
    if (onEnrollCountCount) {
      onEnrollCountCount(dummyEnrollments.length);
    }
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-left sm:text-center">
            <th className="border border-gray-300 px-3 py-2">Course Title</th>
            <th className="border border-gray-300 px-3 py-2">Course Code</th>
            <th className="border border-gray-300 px-3 py-2">Section</th>
            <th className="border border-gray-300 px-3 py-2">Semester No</th>
            <th className="border border-gray-300 px-3 py-2">Teacher</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {enrollData.length > 0 ? (
            enrollData.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">
                  {item.Course_Title}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {item.Course_Code}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {item.Section}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {item.SemesterNo}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {item.Teacher}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-red-500 py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentEnrollments;
