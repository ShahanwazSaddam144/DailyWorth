"use client";

import React from "react";
import { Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";

const tips = [
  {
    title: "50 / 30 / 20 Rule",
    desc: "50% needs, 30% wants, 20% savings",
    icon: <TrendingUp size={20} />,
  },
  {
    title: "Zero-Based Budget",
    desc: "Assign every rupee a job before month starts",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Daily Spending Cap",
    desc: "Divide monthly budget into daily limit",
    icon: <Lightbulb size={20} />,
  },
  {
    title: "Emergency Fund",
    desc: "Save at least 3–6 months of expenses",
    icon: <ShieldCheck size={20} />,
  },
];

const ExpenseTips = () => {
  return (
    <section className="mt-20 mb-10 px-6 lg:px-12 flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Smart Budget Tips
        </h1>
        <p className="text-gray-600">
          Optimize your monthly income with proven budgeting strategies.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-blue-500 group-hover:scale-110 transition">
                {tip.icon}
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {tip.title}
              </h2>

              <p className="text-sm text-gray-600">
                {tip.desc}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpenseTips;