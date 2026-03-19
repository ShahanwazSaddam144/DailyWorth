"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Wallet,
  Calendar,
  TrendingUp,
  Info,
} from "lucide-react";

const AddIncome = () => {
  const [form, setForm] = useState({
    monthlySalary: "",
    monthlyBudget: "",
    dailyBudget: "",
    dailySpent: "",
    remaining: 0,
    saved: 0,
  });

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [breakdown, setBreakdown] = useState([]);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  };

  const generateBreakdown = (budget) => {
    const data = [
      { name: "Food", percent: 30 },
      { name: "Electricity", percent: 20 },
      { name: "Transport", percent: 15 },
      { name: "Others", percent: 35 },
    ];

    return data.map((item) => ({
      ...item,
      amount: ((item.percent / 100) * budget).toFixed(2),
    }));
  };

  useEffect(() => {
    const stored = localStorage.getItem("budgetBreakdown");
    if (stored) setBreakdown(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const budget = Number(form.monthlyBudget);

    if (budget > 0) {
      const daily = (budget / 30).toFixed(2);

      const generated = generateBreakdown(budget);
      setBreakdown(generated);
      localStorage.setItem("budgetBreakdown", JSON.stringify(generated));

      setForm((prev) => ({
        ...prev,
        dailyBudget: daily,
      }));
    }
  }, [form.monthlyBudget]);

  useEffect(() => {
    const daily = Number(form.dailyBudget);
    const spent = Number(form.dailySpent);

    if (daily > 0 && spent >= 0) {
      const rem = daily - spent;

      setForm((prev) => ({
        ...prev,
        remaining: rem > 0 ? rem : 0,
        saved: rem > 0 ? rem : 0,
      }));
    }
  }, [form.dailySpent, form.dailyBudget]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salary = Number(form.monthlySalary);
    const budget = Number(form.monthlyBudget);

    if (budget > salary) {
      showAlert("error", "Budget cannot exceed salary");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert("error", data.message || "Something went wrong");
        return;
      }

      showAlert("success", "Expense + Daily data saved");

      setForm({
        monthlySalary: "",
        monthlyBudget: "",
        dailyBudget: "",
        dailySpent: "",
        remaining: 0,
        saved: 0,
      });
    } catch {
      showAlert("error", "Server error");
    }
  };

  return (
    <section className="mt-20 px-6 lg:px-12 flex flex-col gap-12">
      {alert.show && (
        <div
          className={`fixed top-24 right-6 px-6 py-3 rounded-xl text-white z-50 shadow-lg transition-all duration-300 ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Monthly Expense Planner
        </h1>
        <p className="text-gray-500 text-sm">
          Smart budgeting with daily tracking
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-4xl flex flex-col gap-8 transition-all duration-300 hover:shadow-3xl"
        >
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <TrendingUp size={18} /> Financial Details
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              icon={<DollarSign className="text-green-500" />}
              type="number"
              placeholder="Monthly Salary"
              value={form.monthlySalary}
              onChange={(e) =>
                setForm({ ...form, monthlySalary: e.target.value })
              }
            />

            <Input
              icon={<Wallet className="text-blue-500" />}
              type="number"
              placeholder="Monthly Budget"
              value={form.monthlyBudget}
              onChange={(e) =>
                setForm({ ...form, monthlyBudget: e.target.value })
              }
            />

            <Input
              icon={<Calendar className="text-purple-500" />}
              type="number"
              value={form.dailyBudget}
              placeholder="Daily Budget"
              readOnly
            />
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:shadow-md">
            <h2 className="font-semibold text-gray-800">
              Daily Expense Tracker
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <Input
                icon={<Wallet className="text-orange-500" />}
                type="number"
                placeholder="Today's Spending"
                value={form.dailySpent}
                onChange={(e) =>
                  setForm({ ...form, dailySpent: e.target.value })
                }
              />

              <Input
                icon={<Calendar className="text-indigo-500" />}
                type="number"
                value={form.remaining.toFixed(2)}
                placeholder="Remaining Budget"
                readOnly
              />

              <Input
                icon={<DollarSign className="text-emerald-500" />}
                type="number"
                value={form.saved.toFixed(2)}
                placeholder="Saved Today"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info size={14} /> All data stored securely
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
            Save Expense
          </button>
        </form>

        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800">
            Budget Breakdown
          </h2>

          <div className="flex flex-col gap-3">
            {breakdown.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.name} ({item.percent}%)
                </span>
                <span className="font-semibold">Rs {item.amount}</span>
              </div>
            ))}
          </div>

          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-2 flex">
            {breakdown.map((item, i) => (
              <div
                key={i}
                style={{ width: `${item.percent}%` }}
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-500"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 focus-within:shadow-md focus-within:border-blue-400">
    <span>{icon}</span>
    <input
      className="w-full bg-transparent outline-none text-sm"
      {...props}
    />
  </div>
);

export default AddIncome;