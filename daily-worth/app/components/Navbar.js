"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, User, Settings, ChevronDown } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, action: null });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300 z-50 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-lg shadow-cyan-500/5"
            : "bg-transparent"
        }`}
      >
        <h1
          className="flex items-center gap-2 text-2xl font-extrabold cursor-pointer tracking-wide text-white hover:text-cyan-400 transition-colors"
          onClick={() => router.push("/dashboard")}
        >
          <TrendingUp className="text-cyan-500" size={24} />
          <span className="hidden sm:inline">DailyWorth</span>
        </h1>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white hover:border-cyan-500/60 transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-semibold text-sm">
                {initials}
              </div>
              <span className="hidden md:inline text-sm font-medium">{user.name}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden animate-slideInDown z-50">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-slate-700 p-4">
                  <p className="text-slate-300 text-sm">Logged in as</p>
                  <p className="text-white font-semibold text-lg">{user.name}</p>
                  <p className="text-slate-400 text-xs mt-1">{user.email}</p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/profile");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-all duration-200 rounded-lg"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/settings");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-all duration-200 rounded-lg"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="border-t border-slate-700 px-4 py-3 bg-slate-900/50 text-center text-xs text-slate-500">
                  DailyWorth v1.0
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        )}
      </nav>

      <ConfirmationModal
        isOpen={false}
        title=""
        message=""
        confirmText=""
        cancelText=""
        onConfirm={() => {}}
        onCancel={closeConfirmModal}
        isDangerous={false}
      />

      <ConfirmationModal
        isOpen={false}
        title=""
        message=""
        confirmText=""
        cancelText=""
        onConfirm={() => {}}
        onCancel={closeConfirmModal}
        isDangerous={true}
      />
    </>
  );
};

export default Navbar;