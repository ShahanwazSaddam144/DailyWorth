"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  BarChart2,
  Clock,
  PieChart,
  TrendingUp,
  Zap,
  Target,
  Award,
} from "lucide-react";

export default function Hero() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    savingsRate: 0,
    thisMonthBudget: 0,
    financialScore: 0,
  });

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expense", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        const expenses = data.data;

        if (!expenses || expenses.length === 0) return;

        let totalExpenses = 0;
        let totalSaved = 0;
        let latestBudget = 0;

        expenses.forEach((item) => {
          totalExpenses += Number(item.dailySpent || 0);
          totalSaved += Number(item.saved || 0);
        });

        latestBudget = Number(
          expenses[expenses.length - 1]?.monthlyBudget || 0
        );

        const savingsRate =
          totalExpenses + totalSaved > 0
            ? (totalSaved / (totalExpenses + totalSaved)) * 100
            : 0;

        const financialScore = Math.min(
          100,
          Math.max(0, savingsRate * 1.5)
        );

        setStats({
          totalExpenses,
          savingsRate,
          thisMonthBudget: latestBudget,
          financialScore,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  if (!user) return null;

  const statCards = [
    {
      icon: <DollarSign size={24} className="text-green-400" />,
      label: "Monthly Budget",
      value: `$${stats.thisMonthBudget.toFixed(2)}`,
      color: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
    },
    {
      icon: <TrendingUp size={24} className="text-cyan-400" />,
      label: "Total Expenses",
      value: `$${stats.totalExpenses.toFixed(2)}`,
      color: "from-cyan-500/20 to-cyan-600/20",
      border: "border-cyan-500/30",
    },
    {
      icon: <Target size={24} className="text-purple-400" />,
      label: "Savings Rate",
      value: `${stats.savingsRate.toFixed(1)}%`,
      color: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
    },
    {
      icon: <Award size={24} className="text-yellow-400" />,
      label: "Financial Score",
      value: `${stats.financialScore}/100`,
      color: "from-yellow-500/20 to-yellow-600/20",
      border: "border-yellow-500/30",
    },
  ];

  const features = [
    {
      icon: <DollarSign className="text-green-400" size={28} />,
      title: "Smart Tracking",
      desc: "Real-time expense monitoring and categorization",
    },
    {
      icon: <PieChart className="text-blue-400" size={28} />,
      title: "Budget Planning",
      desc: "Create and manage budgets with smart suggestions",
    },
    {
      icon: <BarChart2 className="text-purple-400" size={28} />,
      title: "Analytics",
      desc: "Deep insights into spending patterns and trends",
    },
    {
      icon: <Zap className="text-orange-400" size={28} />,
      title: "Quick Insights",
      desc: "AI-powered tips for better financial decisions",
    },
  ];

  return (
    <section className="pt-8 pb-12 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto mb-12 animate-slideInDown">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {user.name}!
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          Master your finances with intelligent tracking, smart budgeting, and
          real-time insights powered by DailyWorth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-opacity-100 hover:shadow-lg animate-slideInUp card-hover`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                {card.icon}
              </div>
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-2">{card.label}</p>
            <p className="text-3xl font-bold line-clamp-1 text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 card-hover animate-slideInLeft"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-700/50 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8 text-center animate-slideInUp">
        <h2 className="text-2xl font-bold text-white mb-4">
          Start Your Financial Journey
        </h2>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          Set up your first budget and begin tracking expenses to achieve your
          financial goals.
        </p>
        <Link href="#addIncome">
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
          Go to Budget Planner →
        </button>
        </Link>
      </div>
    </section>
  );
}