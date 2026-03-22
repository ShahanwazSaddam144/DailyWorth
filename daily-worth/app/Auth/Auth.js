"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔐 Check if user already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          router.replace("/dashboard");
        }
      } catch {}

      setCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  if (checkingAuth) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = isSignup
      ? "http://localhost:5000/api/auth/signin"
      : "http://localhost:5000/api/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          isSignup
            ? formData
            : { email: formData.email, password: formData.password }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        setMessageType("error");
      } else {
        if (!isSignup) {
          setMessage("Login successful! Redirecting...");
          setMessageType("success");
          setTimeout(() => router.push("/dashboard"), 500);
        } else {
          setMessage("Account created successfully! Please login.");
          setMessageType("success");
          setTimeout(() => setIsSignup(false), 500);
        }
      }
    } catch {
      setMessage("Server not reachable");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: "📊", title: "Track Finances", desc: "Monitor income & expenses in real-time" },
    { icon: "💡", title: "Learn Economics", desc: "Understand financial concepts easily" },
    { icon: "🎯", title: "Financial Goals", desc: "Set and achieve your money goals" },
    { icon: "💰", title: "Smart Tips", desc: "Get personalized financial advice" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Features & Info */}
          <div className={`hidden lg:block transform transition-all duration-700 ${isSignup ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-90'}`}>
            <div className="space-y-8">
              <div className="animate-slideInLeft">
                <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  DailyWorth
                </h1>
                <p className="text-xl text-slate-300">Master Financial Literacy Today</p>
              </div>

              <p className="text-slate-300 leading-relaxed animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
                Take control of your finances with our innovative platform designed to teach economic awareness and financial independence through real-world applications.
              </p>

              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 hover:border-cyan-500 transition-all duration-300 animate-slideInLeft hover:shadow-lg hover:shadow-cyan-500/20"
                    style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700 animate-slideInLeft" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">1000+</p>
                  <p className="text-xs text-slate-400">Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">50+</p>
                  <p className="text-xs text-slate-400">Lessons</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">24/7</p>
                  <p className="text-xs text-slate-400">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md animate-slideInRight"
            >
              <div className="bg-slate-900 bg-opacity-80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isSignup ? "Join Us Today" : "Welcome Back"}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {isSignup 
                      ? "Start your financial literacy journey" 
                      : "Continue your learning journey"
                    }
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  {isSignup && (
                    <div className="animate-scaleIn">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required={isSignup}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-30 transition-all duration-300"
                      />
                    </div>
                  )}

                  <div className={isSignup ? "animate-scaleIn" : ""}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-30 transition-all duration-300"
                      style={{ animationDelay: isSignup ? "0.1s" : "0s" }}
                    />
                  </div>

                  <div className={isSignup ? "animate-scaleIn" : ""} style={{ animationDelay: isSignup ? "0.2s" : "0.1s" }}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pr-12 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-30 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message */}
                {message && (
                  <div className={`mb-6 p-4 rounded-lg animate-slideInDown ${
                    messageType === "error" 
                      ? "bg-red-500 bg-opacity-20 border border-red-500 text-red-300" 
                      : "bg-green-500 bg-opacity-20 border border-green-500 text-green-300"
                  }`}>
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 mb-4 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Processing...
                      </>
                    ) : (
                      isSignup ? "Create Account" : "Login"
                    )}
                  </span>
                </button>

                {/* Toggle Auth Mode */}
                <div className="text-center space-y-2">
                  <p className="text-slate-400 text-sm">
                    {isSignup ? "Already have an account?" : "New to DailyWorth?"}{" "}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setMessage("");
                      setFormData({ name: "", email: "", password: "" });
                    }}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200 text-sm"
                  >
                    {isSignup ? "Login here" : "Sign up here"}
                  </button>
                </div>
              </div>

              {/* Footer Info */}
              <p className="text-center text-xs text-slate-500 mt-6">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;