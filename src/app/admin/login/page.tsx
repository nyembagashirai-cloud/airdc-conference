"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, AlertTriangle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [locked, setLocked]     = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    setLoading(true);
    setError("");

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      // NextAuth encodes our custom messages in result.code (beta behaviour)
      // Fall back to parsing the error string
      const code = (result as { code?: string }).code ?? result.error ?? "";

      if (code.startsWith("LOCKED:")) {
        setLocked(true);
        setError(code.replace("LOCKED:", ""));
      } else if (code.startsWith("FAIL:")) {
        const rem = parseInt(code.replace("FAIL:", ""), 10);
        setRemaining(isNaN(rem) ? null : rem);
        setError(
          isNaN(rem)
            ? "Invalid credentials."
            : `Invalid credentials. ${rem} attempt${rem === 1 ? "" : "s"} remaining before lockout.`
        );
      } else {
        setError("Invalid credentials.");
      }
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-premium w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-primary">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">AIRDC 2026 Conference Portal</p>
        </div>

        {locked ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
            <AlertTriangle size={28} className="text-red-500 mx-auto mb-2" />
            <p className="text-red-700 font-semibold text-sm">Account Temporarily Locked</p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${remaining !== null && remaining <= 1 ? "bg-orange-50 border border-orange-200 text-orange-700" : "bg-red-50 border border-red-200 text-red-600"}`}>
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-mid transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-muted-foreground mt-6">Authorised personnel only</p>
      </div>
    </div>
  );
}
