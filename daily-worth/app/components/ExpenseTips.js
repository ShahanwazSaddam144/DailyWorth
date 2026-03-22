"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
  X,
} from "lucide-react";

const tips = [
  {
    title: "50 / 30 / 20 Rule",
    desc: "50% needs, 30% wants, 20% savings",
    icon: TrendingUp,
    color: "cyan",
  },
  {
    title: "Zero-Based Budget",
    desc: "Assign every rupee a job before month starts",
    icon: ShieldCheck,
    color: "purple",
  },
  {
    title: "Daily Spending Cap",
    desc: "Divide monthly budget into daily limit",
    icon: Lightbulb,
    color: "orange",
  },
  {
    title: "Emergency Fund",
    desc: "Save at least 3–6 months of expenses",
    icon: ShieldCheck,
    color: "green",
  },
];

const ExpenseTips = () => {
  const [open, setOpen] = useState(false);

  const getColorClasses = (color) => {
    const colors = {
      cyan: "border-cyan-500/30 bg-cyan-500/10",
      purple: "border-purple-500/30 bg-purple-500/10",
      orange: "border-orange-500/30 bg-orange-500/10",
      green: "border-green-500/30 bg-green-500/10",
    };
    return colors[color] || colors.cyan;
  };

  const getIconColor = (color) => {
    const colors = {
      cyan: "text-cyan-400",
      purple: "text-purple-400",
      orange: "text-orange-400",
      green: "text-green-400",
    };
    return colors[color] || "text-cyan-400";
  };

  return (
    <section className="mt-20 mb-10 px-6 lg:px-12 flex flex-col gap-10 relative">
      <header className="flex flex-col gap-2 animate-slideInDown">
        <h1 className="text-3xl font-bold text-white">
          Smart Budget Tips
        </h1>
        <p className="text-slate-300">
          Optimize your monthly income with proven budgeting strategies.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className={`group relative border-2 ${getColorClasses(
                tip.color
              )} rounded-xl p-6 hover:border-opacity-100 transition-all duration-300 overflow-hidden card-hover animate-slideInUp`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-cyan-400 group-hover:scale-110 transition">
                  <Icon size={20} />
                </div>

                <h2 className="text-lg font-semibold text-white">
                  {tip.title}
                </h2>

                <p className="text-sm text-slate-300">
                  {tip.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-500" />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition"
      >
        <MessageCircle />
      </button>

      <div
        className={`fixed bottom-20 right-6 z-50 w-96 max-h-96 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-5 flex flex-col gap-4 transform transition-all duration-300 overflow-y-auto ${
          open
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Lightbulb className="text-yellow-400" size={20} />
            Money-Saving Tips
          </h3>
          <X
            className="cursor-pointer text-slate-400 hover:text-red-500 transition"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div
              key={i}
              className={`bg-slate-700/40 border border-slate-600 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300 animate-slideInUp`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <tip.icon size={20} className={getIconColor(tip.color)} />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1">{tip.title}</h4>
                  <p className="text-slate-300 text-xs">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpenseTips;