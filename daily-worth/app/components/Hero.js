"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { DollarSign, BarChart2, Clock, PieChart } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-b from-gray-50 to-white text-gray-900 pt-24">
        <div className="mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 lg:px-24 mb-10 min-h-screen">
          {/* Left content */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              Hey, <span className="text-green-600">{user.name}</span>
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl">
              Take control of your monthly spending and start saving smarter
              today. DailyWorth helps you track expenses, set budgets, and grow
              your savings effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform">
                Start Saving
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div className="flex items-center gap-3">
                <DollarSign className="text-green-500" size={28} />
                <div>
                  <h3 className="font-semibold">Track Expenses</h3>
                  <p className="text-gray-500 text-sm">
                    See where your money goes every month.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PieChart className="text-blue-500" size={28} />
                <div>
                  <h3 className="font-semibold">Set Budgets</h3>
                  <p className="text-gray-500 text-sm">
                    Define limits for categories and save smarter.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart2 className="text-purple-500" size={28} />
                <div>
                  <h3 className="font-semibold">Visual Insights</h3>
                  <p className="text-gray-500 text-sm">
                    Interactive charts to understand your spending habits.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-orange-500" size={28} />
                <div>
                  <h3 className="font-semibold">Monthly Reports</h3>
                  <p className="text-gray-500 text-sm">
                    Get timely summaries to adjust your budget easily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right icon illustration */}
          <div className="w-full md:w-1/2 flex justify-center mb-12 md:mb-0 relative">
            {/* Main circle background */}
            <div className="w-72 h-72 bg-gradient-to-tr from-blue-100 to-indigo-200 rounded-full flex items-center justify-center relative">
              {/* DollarSign icon */}
              <DollarSign className="absolute top-8 left-16 text-green-500 w-12 h-12 animate-bounce" />
              {/* PieChart icon */}
              <PieChart className="absolute top-20 right-12 text-blue-500 w-14 h-14 animate-pulse" />
              {/* BarChart2 icon */}
              <BarChart2 className="absolute bottom-12 left-24 text-purple-500 w-12 h-12 animate-bounce" />
              {/* Clock icon */}
              <Clock className="absolute bottom-16 right-20 text-orange-500 w-10 h-10 animate-spin-slow" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
