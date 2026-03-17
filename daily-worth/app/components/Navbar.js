"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm relative">
        <h1
          className="text-xl font-bold text-slate-800 cursor-pointer"
          onClick={() => router.push("/")}
        >
          DailyWorth
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <button onClick={() => router.push("/")} className="hover:text-blue-600">
            Home
          </button>

          <button
            onClick={() => router.push("/about")}
            className="hover:text-blue-600"
          >
            About
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="hover:text-blue-600"
          >
            Dashboard
          </button>

          {user ? (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer"
              >
                {initials}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-32 bg-white border rounded-lg shadow-md">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="text-blue-600 font-semibold"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-slate-800"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Aside Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-slate-700 font-medium">
          <button
            onClick={() => {
              router.push("/");
              setMenuOpen(false);
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              router.push("/about");
              setMenuOpen(false);
            }}
          >
            About
          </button>

          <button
            onClick={() => {
              router.push("/dashboard");
              setMenuOpen(false);
            }}
          >
            Dashboard
          </button>

          {user ? (
            <>
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {initials}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-red-500 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                router.push("/auth");
                setMenuOpen(false);
              }}
              className="text-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Background overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;