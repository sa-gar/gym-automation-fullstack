import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Loader2, XCircle } from "lucide-react";
import API from "../api/axios.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  gender: "",
  age: "",
  fitnessGoal: "weight_loss",
  emergencyContactName: "",
  emergencyContactPhone: "",
  medicalConditions: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErrorMessage("Name, email, phone, and password are required.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        age: formData.age ? Number(formData.age) : null,
      };

      const response = await API.post("/auth/register", payload);

      const { token, user } = response.data;

      localStorage.setItem("gym_token", token);
      localStorage.setItem("gym_user", JSON.stringify(user));

      navigate("/member-dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <Card className="border-zinc-800 bg-zinc-950 p-7">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-black">
              <Dumbbell className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-black">Member Registration</h1>

            <p className="mt-2 text-sm text-zinc-500">
              Create your member account and get your gym ID.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
              <XCircle className="mt-0.5 h-5 w-5" />
              <p className="text-sm font-semibold">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="9876543210"
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
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="24"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Fitness Goal
                </label>
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) => updateField("fitnessGoal", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="general_fitness">General Fitness</option>
                  <option value="strength">Strength</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    updateField("emergencyContactName", e.target.value)
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="Contact person"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    updateField("emergencyContactPhone", e.target.value)
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                  placeholder="9999999999"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-300">
                Medical Conditions
              </label>
              <textarea
                value={formData.medicalConditions}
                onChange={(e) =>
                  updateField("medicalConditions", e.target.value)
                }
                rows="3"
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none transition focus:border-lime-400"
                placeholder="Write none if no medical condition"
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
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already registered?{" "}
            <a href="/login" className="font-bold text-lime-300">
              Login here
            </a>
          </p>

          <p className="mt-3 text-center text-sm text-zinc-500">
            <a href="/" className="font-bold text-zinc-300">
              Back to website
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}