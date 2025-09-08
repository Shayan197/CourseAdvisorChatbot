import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { assets } from "../Assets/assets";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar with Menu (Mobile only) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <img
            src={assets.menu_icon}
            alt="menu"
            className="w-6 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
          <p className="font-semibold">Chatbot</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
