"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          My App
        </h1>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => router.push("/")}>Home</button>
          <button onClick={() => router.push("/about")}>About</button>
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>

          {user ? (
            <>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                {initials}
              </div>

              <button
                onClick={handleLogout}
                className="text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="text-blue-400"
            >
              Login
            </button>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-b border-slate-800">
          <button onClick={() => router.push("/")}>Home</button>
          <button onClick={() => router.push("/about")}>About</button>
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>

          {user ? (
            <>
              <div className="m-auto">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  {initials}
                </div>
              </div>

              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="text-blue-400"
            >
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;