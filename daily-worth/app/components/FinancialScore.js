"use client";

import React, { useEffect, useState } from "react";
import { Activity, TrendingUp } from "lucide-react";

const FinancialHealthScore = () => {
  const [form, setForm] = useState({
    monthlySalary: 0,
    monthlyBudget: 0,
    monthlySaving: 0,
    dailyBudget: 0,
  });

  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expense", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data?.data?.length) return;

        const latest = data.data[data.data.length - 1];

        setForm({
          monthlySalary: latest.monthlySalary || 0,
          monthlyBudget: latest.monthlyBudget || 0,
          monthlySaving: latest.monthlySaving || 0,
          dailyBudget: latest.dailyBudget || 0,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpense();
  }, []);

useEffect(() => {
  const salary = Number(form.monthlySalary);
  const budget = Number(form.monthlyBudget);
  const saving = Number(form.monthlySaving);
  const daily = Number(form.dailyBudget);

  if (salary === 0) {
    setScore(0);
    setStatus("");
    return;
  }

  let s = 0;

  if (saving >= salary * 0.2) s += 40;
  if (budget <= salary * 0.7) s += 30;
  if (daily <= budget / 30) s += 30;

  setScore(s);

  if (s < 40) setStatus("Poor");
  else if (s < 70) setStatus("Average");
  else setStatus("Excellent");
}, [form]);

  const getColor = () => {
    if (score < 40) return "from-red-400 to-red-600";
    if (score < 70) return "from-yellow-400 to-orange-500";
    return "from-green-400 to-emerald-600";
  };

  return (
    <section className="mt-20 px-6 lg:px-12 flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Financial Health Score
        </h1>
        <p className="text-gray-600">
          Analyze your financial stability based on your income and spending.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col gap-6 max-w-3xl">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Activity size={18} />
          Score Overview
        </div>

        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold text-gray-900">
            {score}
            <span className="text-lg text-gray-500"> / 100</span>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getColor()}`}
          >
            {status}
          </div>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${score}%` }}
            className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-1">
            <span className="font-semibold text-gray-800">Savings</span>
            <span>Target: 20% of income</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-1">
            <span className="font-semibold text-gray-800">Budget</span>
            <span>Target: ≤ 70% of income</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-1">
            <span className="font-semibold text-gray-800">Daily Spend</span>
            <span>Target: within daily limit</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp size={16} />
          Improve your score by optimizing spending and increasing savings.
        </div>
      </div>
    </section>
  );
};

export default FinancialHealthScore;