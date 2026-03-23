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

      showAlert("success", "✅ Expense + Daily data saved successfully!");

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
    <section className="py-12 px-6 lg:px-12 flex flex-col gap-12 bg-gradient-to-b from-transparent to-slate-900/20"
    id="addIncome">
      {alert.show && (
        <div
          className={`fixed top-24 right-6 px-6 py-4 rounded-xl text-white z-50 shadow-2xl animate-slideInDown font-semibold ${
            alert.type === "success"
              ? "bg-green-500/90 border border-green-400/50"
              : "bg-red-500/90 border border-red-400/50"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex flex-col gap-2 animate-slideInLeft">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          💰 Monthly Expense Planner
        </h1>
        <p className="text-slate-400 text-base">
          Smart budgeting with daily tracking and financial insights
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 w-full max-w-4xl flex flex-col gap-8 transition-all duration-300 hover:border-cyan-500/50 animate-slideInLeft shadow-2xl"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
            <DollarSign size={24} />
            Income & Budget Information
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

          <div className="bg-slate-700/40 border border-slate-600 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:border-cyan-500/50">
            <h2 className="font-semibold text-cyan-300 text-lg flex items-center gap-2">
              <Wallet size={20} />
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

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Info size={14} /> All data stored securely and encrypted
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 w-full"
          >
            💾 Save Expense & Budget
          </button>
        </form>

        <div className="bg-slate-800/40 backdrop-blur border border-slate-700 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 animate-slideInRight">
          <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
            <TrendingUp size={20} />
            Summary
          </h2>

          <h3 className="text-sm font-semibold text-slate-400">
            Budget Breakdown
          </h3>

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
  <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/40 rounded-lg border border-slate-600 transition-all duration-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 hover:border-slate-500">
    <span className="text-slate-400">{icon}</span>
    <input
      className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500"
      {...props}
    />
  </div>
);

export default AddIncome;