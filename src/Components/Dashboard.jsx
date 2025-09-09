import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { assets } from "../Assets/assets";
import { useSidebar } from "../context/SidebarContext";

const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen, isMobile } = useSidebar();

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Backdrop for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Top Bar */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-6 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />
            <p className="font-semibold">Chatbot</p>
          </div>
        )}
        {/* Outlet (Courses / other pages) */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
