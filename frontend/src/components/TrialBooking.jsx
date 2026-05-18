import { useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2, XCircle } from "lucide-react";
import API from "../api/axios.js";
import Button from "./ui/Button.jsx";
import Card from "./ui/Card.jsx";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  fitnessGoal: "weight_loss",
  trialDate: "",
  preferredTime: "",
  message: "",
};

export default function TrialBooking() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!formData.name || !formData.phone || !formData.trialDate) {
      setErrorMessage("Name, phone number, and trial date are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/leads/free-trial", formData);

      setSuccessMessage(
        response.data.message ||
          "Free trial booked successfully. Our team will contact you soon."
      );

      setFormData(initialForm);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="free-trial" className="bg-zinc-950 px-4 py-20 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-bold text-lime-300">
            <CalendarCheck className="h-4 w-4" />
            Free Trial Booking
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Book a free trial automatically
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Visitor fills this form, lead is created in backend, trial date is
            saved, follow-up date is created, and later we can connect WhatsApp
            confirmation automatically.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-black p-5">
              <p className="text-3xl font-black text-lime-300">01</p>
              <p className="mt-2 font-bold">Lead Captured</p>
              <p className="mt-2 text-sm text-zinc-500">
                Name, phone, email, goal and trial date saved.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black p-5">
              <p className="text-3xl font-black text-lime-300">02</p>
              <p className="mt-2 font-bold">Follow-up Ready</p>
              <p className="mt-2 text-sm text-zinc-500">
                Admin can track trial_booked leads from dashboard.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-zinc-800 bg-black p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-black">Book Your Free Trial</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Fill the form and your trial request will be saved.
            </p>
          </div>

          {successMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-lime-400/30 bg-lime-400/10 p-4 text-lime-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5" />
              <p className="text-sm font-semibold">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
              <XCircle className="mt-0.5 h-5 w-5" />
              <p className="text-sm font-semibold">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-300">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-300">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="9876543210"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-300">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="example@gmail.com"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-300">
                Fitness Goal
              </label>
              <select
                value={formData.fitnessGoal}
                onChange={(e) => updateField("fitnessGoal", e.target.value)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="general_fitness">General Fitness</option>
                <option value="strength">Strength</option>
                <option value="flexibility">Flexibility</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Trial Date *
                </label>
                <input
                  type="date"
                  value={formData.trialDate}
                  onChange={(e) => updateField("trialDate", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-300">
                  Preferred Time
                </label>
                <input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => updateField("preferredTime", e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-300">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Tell us about your goal"
                rows="4"
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-lime-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center bg-lime-400 text-black hover:bg-lime-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Booking Trial...
                </>
              ) : (
                "Book Free Trial"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}