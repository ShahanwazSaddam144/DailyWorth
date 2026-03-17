"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 transition-all duration-300 z-50 ${
        scrolled
          ? "backdrop-blur-md border-b border-gray-700 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <h1
        className="flex items-center gap-2 text-2xl font-extrabold cursor-pointer tracking-wide text-gray-900 hover:text-gray-950 transition"
        onClick={() => router.push("/dashboard")}
      >
        <TrendingUp className="text-blue-500" size={24} />
        DailyWorth
      </h1>

      {/* Right side */}
      {user ? (
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold cursor-pointer hover:scale-105 transition-transform shadow-md"
          >
            {initials}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push("/auth")}
          className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-md"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;