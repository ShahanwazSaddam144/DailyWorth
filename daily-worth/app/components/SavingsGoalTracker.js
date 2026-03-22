"use client";

import { useState } from "react";
import { Target, Plus, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function SavingsGoalTracker() {
  const [goals, setGoals] = useState([
    { id: 1, name: "Emergency Fund", target: 5000, current: 2500, emoji: "🛡️", daysLeft: 180 },
    { id: 2, name: "Vacation", target: 3000, current: 1200, emoji: "✈️", daysLeft: 120 },
    { id: 3, name: "New Laptop", target: 1500, current: 800, emoji: "💻", daysLeft: 90 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", emoji: "" });

  const addGoal = () => {
    if (newGoal.name && newGoal.target) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          name: newGoal.name,
          target: Number(newGoal.target),
          current: 0,
          emoji: newGoal.emoji || "🎯",
          daysLeft: 180
        }
      ]);
      setNewGoal({ name: "", target: "", emoji: "" });
      setShowForm(false);
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <section className="py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 animate-slideInDown">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <Target className="text-purple-400" size={32} />
              Savings Goals
            </h2>
            <p className="text-slate-300">Track and achieve your financial goals</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <Plus size={20} />
            Add Goal
          </button>
        </div>

        {/* Add Goal Form */}
        {showForm && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 mb-8 animate-slideInDown">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Goal name"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="px-4 py-3 rounded-lg bg-slate-700/40 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
              <input
                type="number"
                placeholder="Target amount"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="px-4 py-3 rounded-lg bg-slate-700/40 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
              <input
                type="text"
                maxLength="2"
                placeholder="Emoji"
                value={newGoal.emoji}
                onChange={(e) => setNewGoal({ ...newGoal, emoji: e.target.value })}
                className="px-4 py-3 rounded-lg bg-slate-700/40 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
              <button
                onClick={addGoal}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Goals Grid */}
        <div className="flex flex-wrap gap-6 flex-col sm:flex-row">
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            className="w-full"
          >
            {goals.map((goal, idx) => {
              const progress = (goal.current / goal.target) * 100;
              const isComplete = progress === 100;

              return (
                <SwiperSlide key={goal.id} style={{ width: "300px" }}>
                  <div
                    className="bg-slate-800/40 border border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 card-hover animate-slideInUp"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{goal.emoji}</div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{goal.name}</h3>
                          <p className="text-slate-400 text-sm">{goal.daysLeft} days left</p>
                        </div>
                      </div>
                      {isComplete && <CheckCircle className="text-green-400" size={24} />}
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300 text-sm">Progress</span>
                        <span className="text-purple-400 font-semibold">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            isComplete
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-purple-500 to-pink-600"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-slate-400 text-sm">Current</p>
                        <p className="text-white font-bold text-xl">${goal.current}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">Target</p>
                        <p className="text-purple-300 font-semibold">${goal.target}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all text-sm font-semibold">
                        <TrendingUp size={16} className="inline mr-1" />
                        Add Funds
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="flex-1 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto text-slate-500 mb-4" size={48} />
            <p className="text-slate-400 text-lg">No goals yet. Start by creating your first goal!</p>
          </div>
        )}
      </div>
    </section>
  );
}