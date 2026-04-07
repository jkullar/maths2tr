import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  User, Phone, Mail, Lock, LogOut, BookOpen, CheckCircle2,
  Circle, ChevronDown, ChevronRight, Edit3, Check, X, Loader2,
  ArrowLeft, Eye, EyeOff, TrendingUp,
} from "lucide-react";
import transcriptsData from "@/data/maths2/transcripts.json";
import type { TranscriptsData } from "@/types";
import { cn } from "@/lib/utils";

const data = transcriptsData as unknown as TranscriptsData;

interface ProgressItem {
  userId: string;
  courseId: string;
  videoCode: string;
  completedAt: string;
}

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error ?? "Request failed");
  return body;
}

// ─── Progress Section ─────────────────────────────────────────────────────────

function ProgressSection({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(["week1", "refresher"]));
  const [toggling, setToggling] = useState<Set<string>>(new Set());

  useEffect(() => {
    apiFetch("/api/progress?courseId=maths2")
      .then((d) => setProgress(d.progress))
      .catch(() => {})
      .finally(() => setLoadingProgress(false));
  }, [userId]);

  const completedCodes = new Set(progress.map((p) => p.videoCode));

  const toggleWeek = (key: string) =>
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const toggleVideo = useCallback(async (code: string) => {
    if (toggling.has(code)) return;
    setToggling((s) => new Set(s).add(code));
    const wasCompleted = completedCodes.has(code);
    try {
      if (wasCompleted) {
        await apiFetch("/api/progress", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: "maths2", videoCode: code }),
        });
        setProgress((p) => p.filter((x) => x.videoCode !== code));
      } else {
        await apiFetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: "maths2", videoCode: code }),
        });
        setProgress((p) => [
          ...p,
          { userId, courseId: "maths2", videoCode: code, completedAt: new Date().toISOString() },
        ]);
      }
    } catch {}
    setToggling((s) => { const n = new Set(s); n.delete(code); return n; });
  }, [completedCodes, toggling, userId]);

  const totalVideos = data.weeks.reduce((s, w) => s + w.videos.length, 0);
  const totalCompleted = progress.length;
  const pct = totalVideos > 0 ? Math.round((totalCompleted / totalVideos) * 100) : 0;

  if (loadingProgress) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall course card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-sm">Mathematics for Data Science II</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Linear Algebra & Multivariable Calculus</p>
          </div>
          <button
            onClick={() => navigate("/bs-data-science/maths2")}
            className="flex-shrink-0 text-xs text-primary hover:underline flex items-center gap-1"
          >
            <BookOpen className="w-3 h-3" />
            Open
          </button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-foreground flex-shrink-0">
            {totalCompleted}/{totalVideos}
          </span>
          <span className="text-xs text-muted-foreground flex-shrink-0">{pct}%</span>
        </div>
      </div>

      {/* Per-week breakdown */}
      <div className="space-y-2">
        {data.weeks.map((week) => {
          const weekCompleted = week.videos.filter((v) => completedCodes.has(v.code)).length;
          const weekPct = week.videos.length > 0 ? Math.round((weekCompleted / week.videos.length) * 100) : 0;
          const expanded = expandedWeeks.has(week.id);

          return (
            <div key={week.id} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleWeek(week.id)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors text-left"
              >
                {expanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground truncate">{week.label}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0 font-mono">
                      {weekCompleted}/{week.videos.length}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        weekPct === 100 ? "bg-green-500" : "bg-primary/70"
                      )}
                      style={{ width: `${weekPct}%` }}
                    />
                  </div>
                </div>
              </button>

              {expanded && (
                <div className="border-t border-border divide-y divide-border/50">
                  {week.videos.map((video) => {
                    const done = completedCodes.has(video.code);
                    const inFlight = toggling.has(video.code);
                    return (
                      <div key={video.code} className="flex items-center gap-3 px-4 py-2.5 bg-card/50">
                        <button
                          onClick={() => toggleVideo(video.code)}
                          disabled={inFlight}
                          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                          title={done ? "Mark as not done" : "Mark as done"}
                        >
                          {inFlight ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : done ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>
                        <span className={cn(
                          "text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0",
                          done && "opacity-60"
                        )}>
                          {video.code}
                        </span>
                        <span className={cn(
                          "text-xs text-foreground flex-1 truncate",
                          done && "line-through text-muted-foreground"
                        )}>
                          {video.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────

function ProfileSection() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [pwMode, setPwMode] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileError(null);
    setProfileSuccess(false);
    try {
      const d = await apiFetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: email || null }),
      });
      updateUser(d.user);
      setProfileSuccess(true);
      setEditMode(false);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e: FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters"); return; }
    setPwSaving(true);
    setPwError(null);
    setPwSuccess(false);
    try {
      await apiFetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      setPwSuccess(true);
      setPwMode(false);
      setCurrentPw(""); setNewPw("");
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err: any) {
      setPwError(err.message);
    } finally {
      setPwSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground text-sm">Personal Info</h3>
          {!editMode ? (
            <button
              onClick={() => { setEditMode(true); setProfileError(null); }}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          ) : (
            <button
              onClick={() => { setEditMode(false); setName(user.name); setPhone(user.phone); setEmail(user.email ?? ""); }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          )}
        </div>

        {!editMode ? (
          <div className="space-y-3">
            <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Name" value={user.name} />
            <InfoRow icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={user.phone} />
            <InfoRow
              icon={<Mail className="w-3.5 h-3.5" />}
              label="Email"
              value={user.email ?? "—"}
              muted={!user.email}
            />
            {profileSuccess && (
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Profile updated
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleProfileSave} className="space-y-3">
            <Field label="Name" icon={<User className="w-3.5 h-3.5" />}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
            </Field>
            <Field label="Phone" icon={<Phone className="w-3.5 h-3.5" />}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
            </Field>
            <Field label="Email (optional)" icon={<Mail className="w-3.5 h-3.5" />}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
            </Field>
            {profileError && (
              <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2">{profileError}</p>
            )}
            <button
              type="submit"
              disabled={saving}
              className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              {saving ? "Saving…" : "Save changes"}
            </button>
          </form>
        )}
      </div>

      {/* Password card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            Password
          </h3>
          {!pwMode ? (
            <button
              onClick={() => { setPwMode(true); setPwError(null); }}
              className="text-xs text-primary hover:underline"
            >
              Change
            </button>
          ) : (
            <button onClick={() => { setPwMode(false); setCurrentPw(""); setNewPw(""); }} className="text-xs text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          )}
        </div>

        {!pwMode ? (
          <>
            <p className="text-sm text-muted-foreground">••••••••</p>
            {pwSuccess && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Password updated
              </p>
            )}
          </>
        ) : (
          <form onSubmit={handlePasswordSave} className="space-y-3">
            <Field label="Current password">
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  required
                  className="w-full h-9 px-3 pr-9 rounded-lg border border-border bg-muted/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
                <button type="button" onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </Field>
            <Field label="New password (min. 8 chars)">
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  minLength={8}
                  className="w-full h-9 px-3 pr-9 rounded-lg border border-border bg-muted/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
                <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </Field>
            {pwError && <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2">{pwError}</p>}
            <button
              type="submit"
              disabled={pwSaving}
              className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              {pwSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              {pwSaving ? "Updating…" : "Update password"}
            </button>
          </form>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-destructive/40 text-destructive text-xs font-medium hover:bg-destructive/10 transition-colors"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign out
      </button>
    </div>
  );
}

function InfoRow({ icon, label, value, muted }: { icon: React.ReactNode; label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs text-muted-foreground w-10 flex-shrink-0">{label}</span>
      <span className={cn("text-sm font-medium", muted ? "text-muted-foreground" : "text-foreground")}>{value}</span>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"progress" | "profile">("progress");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <img src="/dytadex-logo.png" alt="DytaDex" className="h-7" />
          <span className="text-sm font-semibold text-foreground hidden sm:block">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block">{user.name.split(" ")[0]}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Hello, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track your learning progress and manage your account.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 gap-1">
          <button
            onClick={() => setTab("progress")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === "progress"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Progress
          </button>
          <button
            onClick={() => setTab("profile")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
        </div>

        {tab === "progress" && <ProgressSection userId={user.id} />}
        {tab === "profile" && <ProfileSection />}
      </div>
    </div>
  );
}
