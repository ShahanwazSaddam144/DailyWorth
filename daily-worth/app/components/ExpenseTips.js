"use client";

import React, { useState } from "react";
import { Lightbulb, TrendingUp, ShieldCheck, MessageCircle, X } from "lucide-react";

const tips = [
  {
    title: "50 / 30 / 20 Rule",
    desc: "50% needs, 30% wants, 20% savings",
    icon: <TrendingUp size={20} />,
    color: "cyan",
  },
  {
    title: "Zero-Based Budget",
    desc: "Assign every rupee a job before month starts",
    icon: <ShieldCheck size={20} />,
    color: "purple",
  },
  {
    title: "Daily Spending Cap",
    desc: "Divide monthly budget into daily limit",
    icon: <Lightbulb size={20} />,
    color: "orange",
  },
  {
    title: "Emergency Fund",
    desc: "Save at least 3–6 months of expenses",
    icon: <ShieldCheck size={20} />,
    color: "green",
  },
];

const ExpenseTips = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleOption = (type) => {
    let response = [];

    if (type === "save") {
      response = [
        "Reduce wants spending below 30%",
        "Increase savings to at least 20%",
        "Track daily expenses strictly",
      ];
    }

    if (type === "budget") {
      response = [
        "Use 50/30/20 rule",
        "Split budget weekly",
        "Avoid overspending early in month",
      ];
    }

    if (type === "expenses") {
      response = [
        "Cut unnecessary subscriptions",
        "Cook at home more",
        "Avoid impulse purchases",
      ];
    }

    setMessages(response);
  };

  const getColorClasses = (color) => {
    const colors = {
      cyan: "border-cyan-500/30 bg-cyan-500/10",
      purple: "border-purple-500/30 bg-purple-500/10",
      orange: "border-orange-500/30 bg-orange-500/10",
      green: "border-green-500/30 bg-green-500/10",
    };
    return colors[color] || colors.cyan;
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
        {tips.map((tip, i) => (
          <div
            key={i}
            className={`group relative border-2 ${getColorClasses(tip.color)} rounded-xl p-6 hover:border-opacity-100 transition-all duration-300 overflow-hidden card-hover animate-slideInUp`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-cyan-400 group-hover:scale-110 transition">
                {tip.icon}
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
        ))}
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition"
      >
        <MessageCircle />
      </button>

      {/* Chat Popup */}
      <div
        className={`fixed bottom-20 right-6 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-5 flex flex-col gap-4 transform transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white">Smart Advisor</h3>
          <X
            className="cursor-pointer text-slate-400 hover:text-red-500 transition"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleOption("save")}
            className="text-left px-3 py-2 rounded-lg bg-slate-700/40 hover:bg-cyan-500/20 transition text-sm text-slate-300 hover:text-cyan-300"
          >
            💰 How to save money?
          </button>

          <button
            onClick={() => handleOption("budget")}
            className="text-left px-3 py-2 rounded-lg bg-slate-700/40 hover:bg-cyan-500/20 transition text-sm text-slate-300 hover:text-cyan-300"
          >
            📊 How to manage budget?
          </button>

          <button
            onClick={() => handleOption("expenses")}
            className="text-left px-3 py-2 rounded-lg bg-slate-700/40 hover:bg-cyan-500/20 transition text-sm text-slate-300 hover:text-cyan-300"
          >
            ⚡ How to reduce expenses?
          </button>
        </div>

        {/* Responses */}
        <div className="flex flex-col gap-2 text-sm text-slate-300 max-h-40 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 rounded-lg animate-slideInUp"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpenseTips;