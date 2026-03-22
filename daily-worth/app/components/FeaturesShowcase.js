"use client";

import { useState } from "react";

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with beautiful charts and reports.",
      color: "from-blue-500 to-cyan-500",
      benefits: ["Real-time tracking", "Spending trends", "Category breakdown", "Monthly reports"]
    },
    {
      icon: "💡",
      title: "Financial Education",
      description: "Learn economics and money management through interactive lessons and guides.",
      color: "from-purple-500 to-pink-500",
      benefits: ["Expert lessons", "Economics basics", "Budgeting tips", "Investment guides"]
    },
    {
      icon: "🎯",
      title: "Goal Setting",
      description: "Set and track your financial goals with our intelligent goal management system.",
      color: "from-green-500 to-emerald-500",
      benefits: ["Custom goals", "Progress tracking", "Milestones", "Achievements"]
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected with enterprise-grade security.",
      color: "from-orange-500 to-red-500",
      benefits: ["End-to-end encryption", "Secure authentication", "Data privacy", "No ads"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for <span className="gradient-text">Financial Freedom</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Everything you need to take control of your finances and build wealth
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 border-2 ${
                  activeTab === idx
                    ? `border-cyan-500 bg-gradient-to-r ${feature.color} bg-opacity-10 shadow-lg shadow-cyan-500/20`
                    : "border-slate-700 bg-slate-800 hover:border-slate-600"
                } animate-slideInLeft`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-300">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Feature Details */}
          <div className="animate-slideInRight">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 backdrop-blur-xl">
              <div className="mb-6 animate-scaleIn">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${features[activeTab].color} flex items-center justify-center text-4xl`}>
                  {features[activeTab].icon}
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 animate-slideInLeft">
                {features[activeTab].title}
              </h3>

              <p className="text-slate-300 mb-8 leading-relaxed animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
                {features[activeTab].description}
              </p>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-200">Key Benefits:</p>
                {features[activeTab].benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-slate-300 animate-slideInLeft"
                    style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
                  >
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${features[activeTab].color}`}></span>
                    {benefit}
                  </div>
                ))}
              </div>

              <button className={`mt-8 w-full py-3 px-6 bg-gradient-to-r ${features[activeTab].color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          {[
            { number: "1000+", label: "Active Users" },
            { number: "50+", label: "Lessons" },
            { number: "$10M+", label: "Tracked" },
            { number: "24/7", label: "Support" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 card-hover animate-slideInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
