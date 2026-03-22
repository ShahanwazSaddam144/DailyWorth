"use client";

import React, { useEffect, useState } from "react";
import { Activity, TrendingUp } from "lucide-react";

const FinancialHealthScore = () => {
  const [form, setForm] = useState({
    monthlySalary: 0,
    monthlyBudget: 0,
    dailyBudget: 0,
    dailySpent: 0,
    remaining: 0,
    saved: 0,
  });

  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expense", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data?.data?.length) return;

        const latest = data.data[data.data.length - 1]; // get last saved expense

        setForm({
          monthlySalary: Number(latest.monthlySalary) || 0,
          monthlyBudget: Number(latest.monthlyBudget) || 0,
          dailyBudget: Number(latest.dailyBudget) || 0,
          dailySpent: Number(latest.dailySpent) || 0,
          remaining: Number(latest.remaining) || 0,
          saved: Number(latest.saved) || 0,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpense();
  }, []);

  useEffect(() => {
    const salary = Number(form.monthlySalary) || 0;
    const budget = Number(form.monthlyBudget) || 0;
    const saved = Number(form.saved) || 0;
    const remaining = Number(form.remaining) || 0;
    const dailyBudget = Number(form.dailyBudget) || 0;

    if (salary === 0) {
      setScore(0);
      setStatus("");
      return;
    }

    let s = 0;

    if (saved >= salary * 0.2) s += 40;
    if (budget <= salary * 0.7) s += 30;
    if (remaining >= 0 && dailyBudget > 0) s += 30;

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
      <header className="flex flex-col gap-2 animate-slideInDown">
        <h1 className="text-3xl font-bold text-white">
          Financial Health Score
        </h1>
        <p className="text-slate-300">
          Analyze your financial stability based on your income and spending.
        </p>
      </header>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-8 flex flex-col gap-6 max-w-3xl hover:border-cyan-500/50 transition-all card-hover animate-slideInUp">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Activity size={18} />
          Score Overview
        </div>

        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
            {score}
            <span className="text-lg text-slate-400 ml-2"> / 100</span>
          </div>

          <div
            className={`px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getColor()} shadow-lg`}
          >
            {status}
          </div>
        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            style={{ width: `${score}%` }}
            className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <div className="bg-slate-700/40 border border-slate-600 p-4 rounded-lg flex flex-col gap-1 hover:border-cyan-500/50 transition-all">
            <span className="font-semibold text-white">Savings</span>
            <span className="text-slate-400">Target: 20% of income</span>
          </div>

          <div className="bg-slate-700/40 border border-slate-600 p-4 rounded-lg flex flex-col gap-1 hover:border-cyan-500/50 transition-all">
            <span className="font-semibold text-white">Budget</span>
            <span className="text-slate-400">Target: ≤ 70% of income</span>
          </div>

          <div className="bg-slate-700/40 border border-slate-600 p-4 rounded-lg flex flex-col gap-1 hover:border-cyan-500/50 transition-all">
            <span className="font-semibold text-white">Daily Spend</span>
            <span className="text-slate-400">Target: within daily limit</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <TrendingUp size={16} />
          Improve your score by optimizing spending and increasing savings.
        </div>
      </div>
    </section>
  );
};

export default FinancialHealthScore;