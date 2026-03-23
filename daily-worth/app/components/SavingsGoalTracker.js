"use client";

import { useState, useEffect } from "react";
import { Target, Plus, CheckCircle, TrendingUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function SavingsGoalTracker() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", emoji: "" });
  const [modal, setModal] = useState({ open: false, type: "", goalId: null });
  const [modalInput, setModalInput] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserAndGoals = async () => {
      try {
        const userRes = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        const userData = await userRes.json();
        if (userRes.ok && userData.user) {
          setUserEmail(userData.user.email);

          const stored = localStorage.getItem(`goals_${userData.user.email}`);
          if (stored) {
            setGoals(JSON.parse(stored));
          } else {
            const goalsRes = await fetch("http://localhost:5000/api/goals", {
              method: "GET",
              credentials: "include",
            });
            const goalsData = await goalsRes.json();
            if (goalsRes.ok && goalsData.data) {
              const userGoals = goalsData.data
                .filter((g) => g.userEmail === userData.user.email)
                .map((g) => ({
                  id: g._id,
                  name: g.name,
                  target: g.target,
                  current: g.current || 0,
                  emoji: g.emoji,
                  daysLeft: 180,
                }));
              setGoals(userGoals);
              localStorage.setItem(`goals_${userData.user.email}`, JSON.stringify(userGoals));
            }
          }
        }
      } catch (err) {}
    };
    fetchUserAndGoals();
  }, []);

  const addGoal = async () => {
    if (newGoal.name && newGoal.target) {
      try {
        const res = await fetch("http://localhost:5000/api/goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...newGoal, userEmail }),
        });
        const data = await res.json();
        if (res.ok) {
          const updatedGoals = [
            ...goals,
            {
              id: data.data._id,
              name: newGoal.name,
              target: Number(newGoal.target),
              current: 0,
              emoji: newGoal.emoji || "🎯",
              daysLeft: 180,
            },
          ];
          setGoals(updatedGoals);
          localStorage.setItem(`goals_${userEmail}`, JSON.stringify(updatedGoals));
          setNewGoal({ name: "", target: "", emoji: "" });
          setShowForm(false);
        }
      } catch {}
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/goals/${modal.goalId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        const updatedGoals = goals.filter((g) => g.id !== modal.goalId);
        setGoals(updatedGoals);
        localStorage.setItem(`goals_${userEmail}`, JSON.stringify(updatedGoals));
      }
    } catch {}
    setModal({ open: false, type: "", goalId: null });
  };

  const confirmAddFunds = async () => {
    const parsed = parseFloat(modalInput);
    if (!isNaN(parsed) && parsed > 0) {
      const updatedGoals = goals.map((g) =>
        g.id === modal.goalId ? { ...g, current: Math.min(g.current + parsed, g.target) } : g
      );
      setGoals(updatedGoals);
      localStorage.setItem(`goals_${userEmail}`, JSON.stringify(updatedGoals));

      try {
        await fetch(`http://localhost:5000/api/goals/${modal.goalId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ addFunds: parsed }),
        });
      } catch {}
    }
    setModal({ open: false, type: "", goalId: null });
    setModalInput("");
  };

  return (
    <section className="py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
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

        <div className="flex flex-wrap gap-6 flex-col sm:flex-row">
          <Swiper spaceBetween={20} slidesPerView={"auto"} className="w-full">
            {goals.map((goal, idx) => {
              const progress = (goal.current / goal.target) * 100;
              const isComplete = progress === 100;

              return (
                <SwiperSlide key={goal.id} style={{ width: "300px" }}>
                  <div
                    className="bg-slate-800/40 border border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 card-hover animate-slideInUp"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
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

                    <div className="flex gap-3">
                      <button
                        onClick={() => setModal({ open: true, type: "funds", goalId: goal.id })}
                        className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all text-sm font-semibold"
                      >
                        <TrendingUp size={16} className="inline mr-1" />
                        Add Funds
                      </button>
                      <button
                        onClick={() => setModal({ open: true, type: "delete", goalId: goal.id })}
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

        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto text-slate-500 mb-4" size={48} />
            <p className="text-slate-400 text-lg">No goals yet. Start by creating your first goal!</p>
          </div>
        )}

        {modal.open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-6 w-96 text-white animate-slideInDown">
              {modal.type === "delete" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Delete Goal</h3>
                  <p className="mb-6">Are you sure you want to delete this goal?</p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setModal({ open: false, type: "", goalId: null })}
                      className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              {modal.type === "funds" && (
                <>
                  <h3 className="text-xl font-bold mb-4">Add Funds</h3>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setModal({ open: false, type: "", goalId: null })}
                      className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAddFunds}
                      className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}