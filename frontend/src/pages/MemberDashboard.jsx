import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Dumbbell,
  Loader2,
  LogOut,
  QrCode,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";
import API from "../api/axios.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

export default function MemberDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("gym_token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        setErrorMessage("Please login first.");
        return;
      }

      try {
        const response = await API.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Could not load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("gym_token");
    localStorage.removeItem("gym_user");
    navigate("/login");
  };

  const membershipStatus = user?.membership?.status || "none";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-12 w-12 animate-spin text-lime-300" />
      </div>
    );
  }

  if (!token || errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <Card className="max-w-lg border-zinc-800 bg-zinc-950 p-8 text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-300" />

          <h1 className="mt-5 text-3xl font-black">Login Required</h1>

          <p className="mt-3 text-zinc-400">{errorMessage}</p>

          <a
            href="/login"
            className="mt-6 inline-block rounded-2xl bg-lime-400 px-6 py-3 font-bold text-black hover:bg-lime-300"
          >
            Go to Login
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-900 bg-zinc-950/80 px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-lime-300">
              Member Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-5xl">
              Welcome, {user?.name}
            </h1>

            <p className="mt-2 text-zinc-400">
              View membership, QR pass, profile and gym activity.
            </p>
          </div>

          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-zinc-800 bg-black text-white hover:bg-zinc-900"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-4">
          <Card className="border-zinc-800 bg-zinc-950 p-5">
            <div className="rounded-2xl bg-lime-400/10 p-3 text-lime-300 w-fit">
              <User className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm text-zinc-500">Member ID</p>
            <p className="mt-1 text-2xl font-black">{user?.memberId}</p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950 p-5">
            <div className="rounded-2xl bg-lime-400/10 p-3 text-lime-300 w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm text-zinc-500">Membership Status</p>
            <p className="mt-1 text-2xl font-black capitalize">
              {membershipStatus}
            </p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950 p-5">
            <div className="rounded-2xl bg-lime-400/10 p-3 text-lime-300 w-fit">
              <Dumbbell className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm text-zinc-500">Fitness Goal</p>
            <p className="mt-1 text-2xl font-black">
              {user?.fitnessGoal || "-"}
            </p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950 p-5">
            <div className="rounded-2xl bg-lime-400/10 p-3 text-lime-300 w-fit">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm text-zinc-500">Plan</p>
            <p className="mt-1 text-2xl font-black">
              {user?.membership?.plan ? "Active Plan" : "No Plan"}
            </p>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[360px_1fr]">
          <Card className="border-zinc-800 bg-zinc-950 p-7 text-center">
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl border border-zinc-800 bg-black">
              <QrCode className="h-32 w-32 text-lime-300" />
            </div>

            <h2 className="mt-6 text-2xl font-black">QR Gym Pass</h2>

            <p className="mt-2 text-sm text-zinc-500">
              {user?.qrCode || "QR pass will appear here"}
            </p>

            <p className="mt-4 rounded-2xl border border-lime-400/30 bg-lime-400/10 p-3 text-sm font-semibold text-lime-300">
              Show this QR at gym reception for attendance.
            </p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950 p-7">
            <h2 className="text-2xl font-black">Profile Details</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="text-sm text-zinc-500">Name</p>
                <p className="mt-1 font-bold">{user?.name}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="text-sm text-zinc-500">Email</p>
                <p className="mt-1 font-bold">{user?.email}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="text-sm text-zinc-500">Phone</p>
                <p className="mt-1 font-bold">{user?.phone}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="text-sm text-zinc-500">Role</p>
                <p className="mt-1 font-bold capitalize">{user?.role}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="text-sm text-zinc-500">Gender</p>
                <p className="mt-1 font-bold">{user?.gender || "-"}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="text-sm text-zinc-500">Age</p>
                <p className="mt-1 font-bold">{user?.age || "-"}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}