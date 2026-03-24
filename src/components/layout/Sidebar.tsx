import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart2,
  FileText,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CalendarDays, label: "Planning", active: true },
  { icon: BarChart2, label: "Analytics" },
  { icon: FileText, label: "Reports" },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-mark">C</div>
      </div>

      {/* Main Nav */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`sidebar__nav-item ${
                item.active ? "active" : ""
              }`}
              title={item.label}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="sidebar__bottom">
        {/* Settings */}
        <button className="sidebar__nav-item" title="Settings">
          <Settings size={18} />
        </button>

        {/* Profile Avatar (IMPORTANT) */}
        <button className="sidebar__profile" title="Profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
          />
        </button>
      </div>
    </aside>
  );
};