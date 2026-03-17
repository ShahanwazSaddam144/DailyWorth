"use client";

import React, { useState } from "react";
import { DollarSign, Wallet, PiggyBank, Calendar } from "lucide-react";

const AddIncome = () => {
  const [form, setForm] = useState({
    monthlySalary: "",
    monthlyBudget: "",
    monthlySaving: "",
    dailyBudget: "",
  });

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });

    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert("error", data.message || "Something went wrong");
        return;
      }

      showAlert("success", "Expense saved successfully");

      setForm({
        monthlySalary: "",
        monthlyBudget: "",
        monthlySaving: "",
        dailyBudget: "",
      });
    } catch (err) {
      showAlert("error", "Server error. Please try again.");
    }
  };

  return (
    <section className="mt-24 px-8 flex flex-col items-center">
      {/* Custom Alert */}
      {alert.show && (
        <div
          className={`fixed top-24 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50
          ${
            alert.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {alert.message}
        </div>
      )}

      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add Your Monthly Expense
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your salary, savings and monthly spending plan.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl flex flex-col gap-6 border"
      >
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 w-full">
            <DollarSign className="text-green-600" />
            <input
              type="number"
              name="monthlySalary"
              placeholder="Monthly Salary"
              value={form.monthlySalary}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 w-full">
            <Wallet className="text-blue-600" />
            <input
              type="number"
              name="monthlyBudget"
              placeholder="Monthly Budget"
              value={form.monthlyBudget}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 w-full">
            <PiggyBank className="text-purple-600" />
            <input
              type="number"
              name="monthlySaving"
              placeholder="Monthly Saving"
              value={form.monthlySaving}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 w-full">
            <Calendar className="text-orange-600" />
            <input
              type="number"
              name="dailyBudget"
              placeholder="Daily Budget"
              value={form.dailyBudget}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Save Expense
        </button>
      </form>
    </section>
  );
};

export default AddIncome;