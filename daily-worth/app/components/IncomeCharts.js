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

      <header className="flex flex-col gap-2 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900">
          Financial Insights
        </h1>
        <p className="text-gray-600">
          Track your financial growth and spending patterns.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          {
            icon: <DollarSign className="text-green-400" size={28} />,
            title: "Average Salary",
            value: `$${stats.avgSalary}`,
            color: "hover:scale-105 transform transition duration-300",
          },
          {
            icon: <TrendingUp className="text-blue-400" size={28} />,
            title: "Highest Salary",
            value: `$${stats.highestSalary}`,
            color: "hover:scale-105 transform transition duration-300",
          },
          {
            icon: <Calendar className="text-orange-400" size={28} />,
            title: "Max Daily Budget",
            value: `$${stats.maxDailyBudget}`,
            color: "hover:scale-105 transform transition duration-300",
          },
          {
            icon: <PiggyBank className="text-purple-400" size={28} />,
            title: "Total Savings",
            value: `$${stats.totalSaving}`,
            color: "hover:scale-105 transform transition duration-300",
          },
          {
            icon: <Wallet className="text-teal-400" size={28} />,
            title: "Average Budget",
            value: `$${stats.avgBudget}`,
            color: "hover:scale-105 transform transition duration-300",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-xl p-6 flex gap-4 items-center shadow-lg animate-fadeIn ${stat.color}`}
          >
            {stat.icon}
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
            <BarChart3 size={18} />
            Monthly Salary Trend
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }}
              />
              <Bar
                dataKey="salary"
                fill="url(#salaryGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
            <BarChart3 size={18} />
            Daily Budget Trend
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }}
              />
              <Bar
                dataKey="daily"
                fill="url(#dailyGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
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