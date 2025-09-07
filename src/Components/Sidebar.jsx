import React, { useContext, useEffect, useState } from "react";
import { assets } from "../Assets/assets";
import { Context } from "../context/Context";
import "../App.css";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, setRecentPrompt, newChat, prevPrompt, setPrevPrompt } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  useEffect(() => {
    const role = localStorage.getItem("Role");

    if (role === "Student") {
      setPrevPrompt((prev) => [
        ...prev,
        "What is my current semester?",
        "Show my registered courses",
        "Who is my advisor?",
        "Upcoming exam schedule?",
      ]);
    } else if (role === "Admin") {
      setPrevPrompt((prev) => [
        ...prev,
        "View all students list",
        "Generate reports",
        "Update course catalog",
      ]);
    } else if (role === "Advisor") {
      setPrevPrompt((prev) => [
        ...prev,
        "Advisee list",
        "Pending approvals",
        "Check course recommendations",
      ]);
    } else {
      setPrevPrompt((prev) => [...prev, "No history available"]);
    }
  }, [setPrevPrompt]);

  return (
    <div className="min-h-screen inline-flex flex-col justify-between bg-[#f0f4f9] px-4 py-6">
      <div className="top">
        <img
          className="menu w-6 block ml-3 cursor-pointer"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended((prev) => !prev)}
        />
        <div
          onClick={() => newChat()}
          className="new-chat mt-10 inline-flex items-center gap-3 px-4 py-3 bg-[#e6eaf1] rounded-full text-xs text-gray-600 cursor-pointer"
        >
          <img className="w-5" src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="flex flex-col">
            <p className="mt-8 mb-4">Recent</p>
            <div className="flex flex-col gap-2 overflow-y-auto h-[70vh] custom-scrollbar">
              {prevPrompt?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="sidebar_icon_design pr-2 ani"
                >
                  <img className="w-5" src={assets.message_icon} alt="" />
                  <p>{item?.slice(0, 15)}...</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
