import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Loader2, XCircle } from "lucide-react";
import API from "../api/axios.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);

      const { token, user } = response.data;

      localStorage.setItem("gym_token", token);
      localStorage.setItem("gym_user", JSON.stringify(user));

      if (user.role === "admin" || user.role === "staff") {
        navigate("/admin-dashboard");
      } else {
        navigate("/member-dashboard");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950 p-7">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-black">
            <Dumbbell className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-black">Login</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Access your gym dashboard.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            <XCircle className="mt-0.5 h-5 w-5" />
            <p className="text-sm font-semibold">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-300">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="member@gmail.com"
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-300">
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center bg-lime-400 text-black hover:bg-lime-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New member?{" "}
          <a href="/register" className="font-bold text-lime-300">
            Register here
          </a>
        </p>

        <p className="mt-3 text-center text-sm text-zinc-500">
          <a href="/" className="font-bold text-zinc-300">
            Back to website
          </a>
        </p>
      </Card>
    </div>
  );
}