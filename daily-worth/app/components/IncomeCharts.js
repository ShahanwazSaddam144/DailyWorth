"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  Wallet,
  PiggyBank,
  Calendar,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

const IncomeCharts = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    avgSalary: 0,
    highestSalary: 0,
    maxDailyBudget: 0,
    totalSaving: 0,
    avgBudget: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expense", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!result.success) return;

      const expenses = result.data;
      setData(expenses);

      if (expenses.length > 0) {
        const salaries = expenses.map((e) => Number(e.monthlySalary) || 0);
        const budgets = expenses.map((e) => Number(e.monthlyBudget) || 0);
        const savings = expenses.map((e) => Number(e.saved) || 0);
        const daily = expenses.map((e) => Number(e.dailyBudget) || 0);

        const avgSalary =
          salaries.reduce((a, b) => a + b, 0) / salaries.length || 0;
        const highestSalary = Math.max(...salaries);
        const maxDailyBudget = Math.max(...daily);
        const totalSaving = savings.reduce((a, b) => a + b, 0) || 0;
        const avgBudget =
          budgets.reduce((a, b) => a + b, 0) / budgets.length || 0;

        setStats({
          avgSalary: avgSalary.toFixed(2),
          highestSalary,
          maxDailyBudget,
          totalSaving,
          avgBudget: avgBudget.toFixed(2),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = data.map((item, index) => ({
    name: `Month ${index + 1}`,
    salary: Number(item.monthlySalary) || 0,
    budget: Number(item.monthlyBudget) || 0,
    saving: Number(item.saved) || 0,
    daily: Number(item.dailyBudget) || 0,
  }));

  return (
    <section className="mt-20 px-6 lg:px-12 flex flex-col gap-12">

      <header className="flex flex-col gap-2 animate-slideInDown">
        <h1 className="text-3xl font-bold text-white">
          Financial Insights
        </h1>
        <p className="text-slate-300">
          Track your financial growth and spending patterns.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          {
            icon: <DollarSign className="text-green-400" size={28} />,
            title: "Average Salary",
            value: `$${stats.avgSalary}`,
            color: "from-green-500/20 to-green-600/20 border-green-500/30",
          },
          {
            icon: <TrendingUp className="text-blue-400" size={28} />,
            title: "Highest Salary",
            value: `$${stats.highestSalary}`,
            color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
          },
          {
            icon: <Calendar className="text-orange-400" size={28} />,
            title: "Max Daily Budget",
            value: `$${stats.maxDailyBudget}`,
            color: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
          },
          {
            icon: <PiggyBank className="text-purple-400" size={28} />,
            title: "Total Savings",
            value: `$${stats.totalSaving}`,
            color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
          },
          {
            icon: <Wallet className="text-cyan-400" size={28} />,
            title: "Average Budget",
            value: `$${stats.avgBudget}`,
            color: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} border rounded-xl p-6 flex gap-4 items-center hover:border-opacity-100 transition-all duration-300 card-hover animate-slideInUp`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {stat.icon}
            <div>
              <p className="text-sm text-slate-400">{stat.title}</p>
              <p className="text-xl font-semibold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-slideInUp">

        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center gap-2 mb-4 font-semibold text-white">
            <BarChart3 size={18} />
            Monthly Salary Trend
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #475569", color: "#f1f5f9" }}
              />
              <Bar
                dataKey="salary"
                fill="url(#salaryGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center gap-2 mb-4 font-semibold text-white">
            <BarChart3 size={18} />
            Daily Budget Trend
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #475569", color: "#f1f5f9" }}
              />
              <Bar
                dataKey="daily"
                fill="url(#dailyGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default IncomeCharts;