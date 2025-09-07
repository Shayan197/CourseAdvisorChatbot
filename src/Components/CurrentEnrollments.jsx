import axios from "axios";
import React, { useEffect, useState } from "react";

const CurrentEnrollments = ({ onEnrollCountCount }) => {
  const [enrollData, setEnrollData] = useState([]);

  useEffect(() => {
    // Dummy enrollment data
    const dummyEnrollments = [
      {
        Course_Title: "Data Structures",
        Course_Code: "CS201",
        Section: "A",
        SemesterNo: 3,
        Teacher: "Dr. Ali",
      },
      {
        Course_Title: "Operating Systems",
        Course_Code: "CS301",
        Section: "B",
        SemesterNo: 3,
        Teacher: "Prof. Sara",
      },
    ];

    setEnrollData(dummyEnrollments);
    if (onEnrollCountCount) {
      onEnrollCountCount(dummyEnrollments.length);
    }
  }, []);

  return (
    <div className="">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className='border border-gray-300 px-3 py-2"'>Course Title</th>
            <th className='border border-gray-300 px-3 py-2"'>Course Code</th>
            <th className='border border-gray-300 px-3 py-2"'>Section</th>
            <th className='border border-gray-300 px-3 py-2"'>SemesterNo</th>
            <th className='border border-gray-300 px-3 py-2"'>Teacher</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {enrollData.length > 0 ? (
            enrollData.map((item, i) => {
              return (
                <tr key={i}>
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
              );
            })
          ) : (
            <tr>
              <td colSpan="3">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentEnrollments;
