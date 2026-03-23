"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, LogOut, ShieldCheck } from "lucide-react";
import AuthGuard from "../components/AuthGuard";
import ConfirmationModal from "../components/ConfirmationModal";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null });
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

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/delete", {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openConfirm = (action) => setConfirmModal({ isOpen: true, action });
  const closeConfirm = () => setConfirmModal({ isOpen: false, action: null });

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-950 text-white py-24 px-4 lg:px-12">
        <div className="max-w-3xl mx-auto bg-slate-900/70 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-4xl font-bold mb-4">Settings</h1>
          <p className="text-slate-300 mb-8">Manage your account security and actions.</p>

          {user ? (
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                <p className="text-slate-400 text-sm">Name</p>
                <p className="text-white font-semibold">{user.name}</p>
              </div>
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white font-semibold">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-slate-300 mb-8">No user data available.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => openConfirm("logout")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition"
            >
              <LogOut size={20} />
              Logout
            </button>

            <button
              onClick={() => openConfirm("delete")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-400 transition"
            >
              <Trash2 size={20} />
              Delete Account
            </button>
          </div>

          <div className="mt-6 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
            <h2 className="text-lg font-semibold text-white mb-2">Security</h2>
            <p className="text-slate-300 mb-2">Block suspicious login attempts and keep your account safe.</p>
            <button
              className="w-fit inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 transition"
            >
              <ShieldCheck size={18} />
              Enable 2FA (coming soon)
            </button>
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="mt-6 px-4 py-3 rounded-lg border border-slate-700 hover:border-cyan-500 text-white transition"
          >
            Back to Profile
          </button>
        </div>
      </main>

      <ConfirmationModal
        isOpen={confirmModal.isOpen && confirmModal.action === "logout"}
        title="Logout?"
        message="You will be logged out from your session. Continue?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={() => {
          handleLogout();
          closeConfirm();
        }}
        onCancel={closeConfirm}
        isDangerous={false}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen && confirmModal.action === "delete"}
        title="Delete Account?"
        message="This action is permanent. All your data will be deleted." 
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          handleDelete();
          closeConfirm();
        }}
        onCancel={closeConfirm}
        isDangerous={true}
      />
    </AuthGuard>
  );
}
