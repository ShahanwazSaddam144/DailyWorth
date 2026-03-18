"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  Wallet,
  PiggyBank,
  Calendar,
  TrendingUp,
  Info,
} from "lucide-react";

const AddIncome = () => {
  const [form, setForm] = useState({
    monthlySalary: "",
    monthlyBudget: "",
    monthlySaving: "",
    dailyBudget: "",
  });

  const router = useRouter();

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [userEmail, setUserEmail] = useState(null);
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();
        if (!data?.email) return;

        setUserEmail(data.email);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const generateBreakdown = (budget) => {
    const data = [
      { name: "Food", percent: 30 },
      { name: "Electricity", percent: 20 },
      { name: "Transport", percent: 15 },
      { name: "Savings", percent: 20 },
      { name: "Others", percent: 15 },
    ];

    return data.map((item) => ({
      ...item,
      amount: ((item.percent / 100) * budget).toFixed(2),
    }));
  };

  useEffect(() => {
    const stored = localStorage.getItem("budgetBreakdown");
    if (stored) {
      setBreakdown(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const budget = Number(form.monthlyBudget);

    if (budget > 0) {
      const generated = generateBreakdown(budget);
      setBreakdown(generated);
      localStorage.setItem("budgetBreakdown", JSON.stringify(generated));

      const daily = (budget / 30).toFixed(2);
      setForm((prev) => ({
        ...prev,
        dailyBudget: daily,
      }));
    } else {
      setBreakdown([]);
      setForm((prev) => ({
        ...prev,
        dailyBudget: "",
      }));
    }
  }, [form.monthlyBudget]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salary = Number(form.monthlySalary);
    const budget = Number(form.monthlyBudget);
    const daily = Number(form.dailyBudget);

    if (budget > salary) {
      showAlert(
        "error",
        "Monthly budget cannot be greater than monthly salary."
      );
      return;
    }

    if (daily > salary || daily > budget) {
      showAlert(
        "error",
        "Daily budget cannot be greater than salary or monthly budget."
      );
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

      const generated = generateBreakdown(budget);
      setBreakdown(generated);
      localStorage.setItem("budgetBreakdown", JSON.stringify(generated));

      showAlert("success", "Expense saved successfully");

      setForm({
        monthlySalary: "",
        monthlyBudget: "",
        monthlySaving: "",
        dailyBudget: "",
      });
    } catch (err) {
      showAlert("error", "Server error. Please try again.");
    }
  };

  return (
    <section className="mt-20 px-6 lg:px-12 flex flex-col gap-12">
      {alert.show && (
        <div
          className={`fixed top-24 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50
          ${alert.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {alert.message}
        </div>
      )}

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Monthly Expense Planner
        </h1>
        <p className="text-gray-600">
          Track your salary, control your budget, and build savings.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl flex flex-col gap-8"
        >
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <TrendingUp size={18} />
            Financial Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
              <DollarSign className="text-green-400" />
              <input
                type="number"
                name="monthlySalary"
                placeholder="Monthly Salary"
                value={form.monthlySalary}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
              <Wallet className="text-blue-400" />
              <input
                type="number"
                name="monthlyBudget"
                placeholder="Monthly Budget"
                value={form.monthlyBudget}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
              <PiggyBank className="text-purple-400" />
              <input
                type="number"
                name="monthlySaving"
                placeholder="Monthly Saving"
                value={form.monthlySaving}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
              <Calendar className="text-teal-400" />
              <input
                type="number"
                name="dailyBudget"
                placeholder="Daily Budget"
                value={form.dailyBudget}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-500">
            <Info size={16} />
            Enter accurate values to get better insights in your dashboard.
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Save Expense
          </button>
        </form>

        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Budget Breakdown
          </h2>

          <div className="flex flex-col gap-3">
            {breakdown.length === 0 && (
              <p className="text-sm text-gray-500">
                Enter budget to see breakdown
              </p>
            )}

            {breakdown.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm text-gray-700"
              >
                <span>{item.name} ({item.percent}%)</span>
                <span className="font-semibold">Rs {item.amount}</span>
              </div>
            ))}
          </div>

          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
            {breakdown.map((item, i) => (
              <div
                key={i}
                style={{ width: `${item.percent}%` }}
                className="h-full inline-block bg-gradient-to-r from-blue-400 to-indigo-600"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddIncome;