"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubscribe = async () => {
    if (!email) {
      return showToast("Email is required", "error");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showToast(data.message || "Something went wrong", "error");
      }

      showToast(data.message || "Subscribed successfully", "success");
      setEmail("");
    } catch (err) {
      showToast("Server error", "error");
    } finally {
      setLoading(false);
    }
  };

  const links = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Dashboard", href: "#dashboard" },
      { name: "Learning Hub", href: "#learning" },
      { name: "Pricing", href: "#pricing" }
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" }
    ],
    Community: [
      { name: "Forum", href: "/forum" },
      { name: "Newsletter", href: "#newsletter" },
      { name: "Events", href: "/events" },
      { name: "Resources", href: "/resources" }
    ]
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[999] animate-slideInRight">
          <div
            className={`px-5 py-3 rounded-lg shadow-lg backdrop-blur-md border text-sm font-medium flex items-center gap-2
              ${
                toast.type === "success"
                  ? "bg-slate-900/90 text-cyan-400 border-cyan-500"
                  : "bg-slate-900/90 text-red-400 border-red-500"
              }`}
          >
            {toast.type === "success" ? "✔" : "✖"}
            {toast.message}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-cyan-100 mb-6">
            Get weekly tips on financial literacy and platform updates
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-gray-900 placeholder-cyan-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="px-6 py-3 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-cyan-50 transition-colors duration-300"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-6 text-lg">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              
              {/* Brand */}
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  DailyWorth
                </h2>
                <p className="text-slate-400 text-sm max-w-xs">
                  Empowering financial literacy and economic awareness, one user at a time.
                </p>
              </div>

              {/* Social */}
              <div className="flex gap-6">
                {[
                  { icon: "f", label: "Facebook" },
                  { icon: "𝕏", label: "Twitter" },
                  { icon: "in", label: "LinkedIn" },
                  { icon: "⚙️", label: "GitHub" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    title={social.label}
                    className="w-10 h-10 rounded-lg bg-slate-800 text-slate-300 hover:bg-cyan-600 hover:text-white transition-all duration-300 flex items-center justify-center font-semibold"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between text-slate-400 text-sm">
              <p className="mb-4 md:mb-0">
                &copy; {currentYear} DailyWorth. All rights reserved.
              </p>
              <p className="text-slate-500">
                Built with ❤️ for Financial Literacy Awareness
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center font-bold text-xl">
          💬
        </button>
      </div>
    </footer>
  );
}