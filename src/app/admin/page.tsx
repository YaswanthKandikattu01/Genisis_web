"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
    Search,
    Download,
    Send,
    LogOut,
    RefreshCw,
    Lock,
    Shield,
} from "lucide-react";

interface Participant {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    payment_status: string;
    transaction_id: string | null;
    candidate_status: string;
    created_at: string;
}

const STATUS_OPTIONS = [
    "Registered",
    "Assessment Cleared",
    "Interview Round 1",
    "Interview Round 2",
    "HR Round",
    "Selected",
    "Rejected",
];

const STATUS_COLORS: Record<string, string> = {
    Registered: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Assessment Cleared": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Interview Round 1": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Interview Round 2": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "HR Round": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Selected: "bg-green-500/10 text-green-400 border-green-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [adminToken, setAdminToken] = useState("");
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loginError, setLoginError] = useState("");

    const fetchParticipants = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (statusFilter !== "all") params.append("status", statusFilter);
            if (search) params.append("search", search);

            const res = await fetch(`/api/admin/participants?${params.toString()}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            const data = await res.json();

            if (data.error) {
                if (res.status === 401) {
                    setIsLoggedIn(false);
                    setAdminToken("");
                }
                return;
            }

            setParticipants(data.participants || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [adminToken, search, statusFilter]);

    useEffect(() => {
        if (isLoggedIn && adminToken) fetchParticipants();
    }, [isLoggedIn, adminToken, statusFilter, fetchParticipants]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (res.ok && data.token) {
                setAdminToken(data.token);
                setIsLoggedIn(true);
                setLoginError("");
            } else {
                setLoginError(data.error || "Invalid password");
            }
        } catch (error) {
            console.error(error);
            setLoginError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        await fetch("/api/admin/update-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({ id, status }),
        });
        fetchParticipants();
    };

    const handleSendAssessment = async () => {
        const emails = participants
            .filter((p) => p.payment_status === "success" && p.candidate_status === "Registered")
            .map((p) => p.email);

        if (emails.length === 0) {
            alert("No eligible participants found.");
            return;
        }

        if (!confirm(`Send assessment to ${emails.length} participants?`)) return;

        const res = await fetch("/api/admin/send-assessment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({ emails }),
        });
        const data = await res.json();
        alert(data.message);
    };

    const exportCSV = () => {
        const headers = ["Name", "Email", "Phone", "Payment", "Status", "Transaction ID", "Date"];
        const rows = participants.map((p) => [
            p.full_name,
            p.email,
            p.phone,
            p.payment_status,
            p.candidate_status,
            p.transaction_id || "",
            new Date(p.created_at).toLocaleDateString(),
        ]);
        const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `genesis_hackathon_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Login Screen
    if (!isLoggedIn) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-[2rem] p-10 md:p-14 w-full max-w-md text-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                        <Shield size={28} className="text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-sm text-neutral-500 mb-8">
                        Enter the admin password to access the dashboard.
                    </p>
                    <div className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            className="input-field text-center"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                        {loginError && (
                            <p className="text-xs text-red-400">{loginError}</p>
                        )}
                        <button onClick={handleLogin} disabled={loading} className="btn-white w-full flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading ? (
                                <span>Verifying...</span>
                            ) : (
                                <>
                                    <Lock size={16} /> Unlock Dashboard
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Dashboard
    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
                    <p className="text-sm text-neutral-500">{total} total registrations</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <button onClick={handleSendAssessment} className="btn-primary text-sm py-2.5 flex items-center gap-2">
                        <Send size={14} /> Send Assessments
                    </button>
                    <button onClick={exportCSV} className="btn-secondary text-sm py-2.5 flex items-center gap-2">
                        <Download size={14} /> Export CSV
                    </button>
                    <button
                        onClick={() => { setIsLoggedIn(false); setAdminToken(""); }}
                        className="glass px-4 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="glass rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchParticipants()}
                    />
                </div>
                <select
                    className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm outline-none text-neutral-300"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <button
                    onClick={fetchParticipants}
                    className="glass px-4 py-3 rounded-xl hover:bg-white/[0.08] transition-colors"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* Table */}
            <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06] text-left">
                                <th className="p-4 font-semibold text-neutral-400 text-xs uppercase tracking-wider">Name</th>
                                <th className="p-4 font-semibold text-neutral-400 text-xs uppercase tracking-wider">Email</th>
                                <th className="p-4 font-semibold text-neutral-400 text-xs uppercase tracking-wider">Phone</th>
                                <th className="p-4 font-semibold text-neutral-400 text-xs uppercase tracking-wider">Payment</th>
                                <th className="p-4 font-semibold text-neutral-400 text-xs uppercase tracking-wider">Status</th>
                                <th className="p-4 font-semibold text-neutral-400 text-xs uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-neutral-500">
                                        {loading ? "Loading..." : "No participants found."}
                                    </td>
                                </tr>
                            ) : (
                                participants.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="p-4 font-medium">{p.full_name}</td>
                                        <td className="p-4 text-neutral-400">{p.email}</td>
                                        <td className="p-4 text-neutral-400">{p.phone}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.payment_status === "success"
                                                ? "bg-green-500/10 text-green-400"
                                                : p.payment_status === "failed"
                                                    ? "bg-red-500/10 text-red-400"
                                                    : "bg-yellow-500/10 text-yellow-400"
                                                }`}>
                                                {p.payment_status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border outline-none cursor-pointer ${STATUS_COLORS[p.candidate_status] || "bg-white/5"
                                                    }`}
                                                value={p.candidate_status}
                                                onChange={(e) => handleStatusUpdate(p.id, e.target.value)}
                                            >
                                                {STATUS_OPTIONS.map((s) => (
                                                    <option key={s} value={s} className="bg-neutral-900 text-white">{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4 text-neutral-500 text-xs">
                                            {new Date(p.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
