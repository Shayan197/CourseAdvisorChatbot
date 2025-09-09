import React, { useContext, useEffect, useState } from "react";
import { assets } from "../Assets/assets";
import { Context } from "../context/Context";
import "../App.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [extended, setExtended] = useState(false);
  const { onSent, setRecentPrompt, newChat, prevPrompt, setPrevPrompt } =
    useContext(Context);

  const isMobile = window.innerWidth < 768; // Mobile breakpoint

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
    if (isMobile) setSidebarOpen(false); // mobile pe auto close
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

  // Mobile pe sidebarOpen se width handle, desktop pe extended
  const sidebarWidth = isMobile
    ? sidebarOpen
      ? "w-64 absolute left-0 top-0"
      : "hidden"
    : extended
    ? "w-64"
    : "w-16";

  return (
    <div
      className={`h-screen flex flex-col bg-[#f0f4f9] transition-all duration-300 z-50 ${sidebarWidth} md:flex`}
    >
      {/* Top Section */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="p-4">
          {/* Menu Icon */}
          <img
            className="w-6 cursor-pointer mb-6"
            src={assets.menu_icon}
            alt="menu"
            onClick={
              () =>
                isMobile
                  ? setSidebarOpen(!sidebarOpen) // mobile toggle
                  : setExtended(!extended) // desktop toggle
            }
          />

          {/* New Chat */}
          <div
            onClick={() => newChat()}
            className="flex items-center gap-3 px-3 py-2 bg-[#e6eaf1] rounded-full text-sm text-gray-600 cursor-pointer hover:bg-[#d6dbe4] transition"
          >
            <img className="w-5" src={assets.plus_icon} alt="" />
            {(extended || (isMobile && sidebarOpen)) && <p>New Chat</p>}
          </div>

          {/* Recent */}
          {(extended || (isMobile && sidebarOpen)) && (
            <div className="mt-6 flex flex-col gap-2 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
              <p className="text-gray-600 text-sm font-medium mb-2">Recent</p>
              {prevPrompt?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition"
                >
                  <img className="w-5" src={assets.message_icon} alt="" />
                  <p className="truncate w-full">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-3">
          {/* Desktop */}
          {!isMobile && (
            <>
              <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-md transition">
                <img className="w-5" src={assets.question_icon} alt="" />
                {extended && <p>Help</p>}
              </div>
              <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-md transition">
                <img className="w-5" src={assets.history_icon} alt="" />
                {extended && <p>Activity</p>}
              </div>
              <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-md transition">
                <img className="w-5" src={assets.setting_icon} alt="" />
                {extended && <p>Settings</p>}
              </div>
            </>
          )}

          {/* Mobile */}
          {isMobile && sidebarOpen && (
            <>
              <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-md transition">
                <img className="w-5" src={assets.question_icon} alt="" />
                <p>Help</p>
              </div>
              <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-md transition">
                <img className="w-5" src={assets.history_icon} alt="" />
                <p>Activity</p>
              </div>
              <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-md transition">
                <img className="w-5" src={assets.setting_icon} alt="" />
                <p>Settings</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
