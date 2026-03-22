"use client";

import { useState, useEffect } from "react";
import { Lightbulb, TrendingDown, AlertCircle, Award, BookOpen } from "lucide-react";

export default function SmartTipsInsights() {
  const [activeTab, setActiveTab] = useState("tips");
  const [savedTips, setSavedTips] = useState([]);

  const tips = [
    {
      id: 1,
      title: "Automate Your Savings",
      description: "Set up automatic transfers on payday to save before you spend",
      icon: "🤖",
      difficulty: "Easy",
      savingsPotential: "$500/month"
    },
    {
      id: 2,
      title: "Track Small Expenses",
      description: "Monitor small purchases - they add up to significant amounts",
      icon: "👀",
      difficulty: "Easy",
      savingsPotential: "$200/month"
    },
    {
      id: 3,
      title: "Use the 24-Hour Rule",
      description: "Wait 24 hours before making non-essential purchases",
      icon: "⏰",
      difficulty: "Medium",
      savingsPotential: "$300/month"
    },
    {
      id: 4,
      title: "Budget by Category",
      description: "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
      icon: "📊",
      difficulty: "Medium",
      savingsPotential: "$400/month"
    },
    {
      id: 5,
      title: "Build an Emergency Fund",
      description: "Save 3-6 months of expenses to handle unexpected costs",
      icon: "🛡️",
      difficulty: "Hard",
      savingsPotential: "Peace of mind"
    },
    {
      id: 6,
      title: "Cut Subscription Waste",
      description: "Audit and cancel unused subscriptions and services",
      icon: "✂️",
      difficulty: "Easy",
      savingsPotential: "$100/month"
    }
  ];

  const insights = [
    {
      title: "Your spending has increased by 15%",
      description: "Review your recent transactions to identify unnecessary expenses",
      type: "warning",
      icon: <TrendingDown className="text-orange-400" size={24} />
    },
    {
      title: "Congratulations! You're on track",
      description: "You're maintaining your budget perfectly. Keep it up!",
      type: "success",
      icon: <Award className="text-green-400" size={24} />
    },
    {
      title: "Learn about compound interest",
      description: "Even small investments grow significantly over time",
      type: "info",
      icon: <BookOpen className="text-blue-400" size={24} />
    }
  ];

  const toggleSaveTip = (id) => {
    setSavedTips(
      savedTips.includes(id)
        ? savedTips.filter(t => t !== id)
        : [...savedTips, id]
    );
  };

  return (
    <section className="py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slideInDown">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Lightbulb className="text-yellow-400" size={32} />
            Smart Tips & Insights
          </h2>
          <p className="text-slate-300">Personalized financial advice to help you save more</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("tips")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "tips"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            💡 Money-Saving Tips
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "insights"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            📈 Your Insights
          </button>
        </div>

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {tips.map((tip, idx) => (
              <div
                key={tip.id}
                className="bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 card-hover animate-slideInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon & Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{tip.icon}</div>
                  <button
                    onClick={() => toggleSaveTip(tip.id)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                      savedTips.includes(tip.id)
                        ? "bg-blue-500/30 text-blue-300 border border-blue-500/50"
                        : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-blue-500/50"
                    }`}
                  >
                    {savedTips.includes(tip.id) ? "✓ Saved" : "Save"}
                  </button>
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{tip.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <p className="text-xs text-slate-500">Difficulty</p>
                    <p className={`font-semibold text-sm ${
                      tip.difficulty === "Easy" ? "text-green-400" :
                      tip.difficulty === "Medium" ? "text-yellow-400" :
                      "text-orange-400"
                    }`}>{tip.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Potential savings</p>
                    <p className="text-green-400 font-semibold">{tip.savingsPotential}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="space-y-4 animate-fadeIn">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border transition-all duration-300 animate-slideInUp card-hover ${
                  insight.type === "warning"
                    ? "bg-orange-500/10 border-orange-500/30"
                    : insight.type === "success"
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-blue-500/10 border-blue-500/30"
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {insight.icon}
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{insight.title}</h3>
                    <p className="text-slate-300">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
