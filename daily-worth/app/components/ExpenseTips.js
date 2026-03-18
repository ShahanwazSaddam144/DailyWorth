"use client";

import React, { useState } from "react";
import { Lightbulb, TrendingUp, ShieldCheck, MessageCircle, X } from "lucide-react";

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

  return (
    <section className="mt-20 mb-10 px-6 lg:px-12 flex flex-col gap-10 relative">
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

      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <MessageCircle />
      </button>

      {/* Chat Popup */}
      <div
        className={`fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 flex flex-col gap-4 transform transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Smart Advisor</h3>
          <X
            className="cursor-pointer text-gray-500 hover:text-red-500"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleOption("save")}
            className="text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition text-sm"
          >
            💰 How to save money?
          </button>

          <button
            onClick={() => handleOption("budget")}
            className="text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition text-sm"
          >
            📊 How to manage budget?
          </button>

          <button
            onClick={() => handleOption("expenses")}
            className="text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition text-sm"
          >
            ⚡ How to reduce expenses?
          </button>
        </div>

        {/* Responses */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 max-h-40 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-blue-50 px-3 py-2 rounded-lg animate-fadeIn"
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