"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../components/AuthGuard";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return null;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-950 text-white py-24 px-4 lg:px-12">
        <div className="max-w-4xl mx-auto bg-slate-900/70 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-lg">
          <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-slate-300 mb-8">Manage your account information and view your profile details.</p>

          {user ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/60">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Name</p>
                <p className="text-xl font-semibold text-white">{user.name}</p>
              </div>
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/60">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Email</p>
                <p className="text-xl font-semibold text-white">{user.email}</p>
              </div>
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/60">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Joined</p>
                <p className="text-xl font-semibold text-white">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/60">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Status</p>
                <p className="text-xl font-semibold text-cyan-300">Active</p>
              </div>
            </div>
          ) : (
            <p className="text-slate-300">Unable to fetch profile details at this time.</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/settings")}
              className="px-6 py-2 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition"
            >
              Go to Settings
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 rounded-lg border border-slate-600 hover:border-cyan-500 transition text-white"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
